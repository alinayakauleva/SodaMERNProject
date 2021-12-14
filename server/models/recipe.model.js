const mongoose = require('mongoose');

var notEmpty = array => {
    if(array.length === 0){
        return false
    } else {
        return true
    };
}

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name of recipe is required'],
        minLength: [3, 'Name of recipe must contain at least 3 characters']
    },
    cookingTime: {
        type: String,
    },
    image:
    {
        type: String,
    },
    difficultyLevel: {
        type: String,
        required: [true, 'You must indicate the difficulty level'],
    },
    description: {
        type: String,
    },
    ingredients: {
        type: Array,
        required: [true],
        validate: [notEmpty, 'You must added at least one ingredient'] 
    },  
    steps: {
        type: Array,
        required: [true],
        validate: [notEmpty, 'You must added at least one step'] 
    },
    likes: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {timestamps: true});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;