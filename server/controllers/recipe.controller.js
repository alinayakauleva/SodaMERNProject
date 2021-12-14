const Recipe = require('../models/recipe.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = {

    findAllRecipes: (req, res) => {
        console.log(req.cookies);
        Recipe.find({})
            .populate('createdBy', 'username _id')
            .then(allRecipes => res.json(allRecipes))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    },

    findAllRecipesByUser: (req, res)=>{
        Recipe.find({ createdBy: req.params.userId})
        .then((allUserRecipes) => res.json(allUserRecipes))
        .catch((err) => res.status(400).json(err));
    },

    findOneRecipe: (req, res) => {
        Recipe.findOne({_id:req.params.id})
            .then(recipe => res.json(recipe))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    },

    updateRecipe: (req, res) => {
        Recipe.findOneAndUpdate({_id:req.params.id}, req.body, {new: true, runValidators: true})
            .then(updateRecipe => res.json(updateRecipe))
            .catch(err => res.status(400).json(err));
    },

    createNewRecipe: (req, res) => {
        const newRecipeObj = new Recipe(req.body);

        const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete: true
        })

        newRecipeObj.createdBy = decodedJWT.payload.id;

        newRecipeObj.save()
            .then(newRecipe => res.json(newRecipe))
            .catch(err => res.status(400).json(err));
    },

    deleteRecipe: (req, res) => {
        Recipe.deleteOne({_id: req.params.id})
            .then(deleteRecipe => res.json(deleteRecipe))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    },
    
    findRecipesByName: (req, res) => {
        Recipe.find({name: req.params.name})
            .populate('createdBy', 'username _id')
            .then(recipes => res.json(recipes))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    },

    findFavoritesByUser: (req, res) => {
        User.findById({_id: req.params.id}, 'favorites')
        .then(user => l(user.favorites, res));

        function l(favs, res)
        {
            Recipe.find({
                '_id': { $in: favs}
            }, function(err, docs){
                res.json(docs);
            });
        }
    }
}