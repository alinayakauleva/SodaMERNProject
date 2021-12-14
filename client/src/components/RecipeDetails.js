import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import Header from '../view/Header';
import uploadImgLike from '../img/like.png';
import uploadImgTime from '../img/time.png';
import uploadImgLevel from '../img/level.png';
import uploadImgStar from '../img/star.png';

const RecipeDetails = (props) => {
    const {id} = props;

    const [recipe, setRecipe] = useState({});
    const [disabled, setDisabled] = useState([]);
    const [favorites, setFavorites] = useState([]);

    let userId = localStorage.getItem('userId');
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${id}`)
            .then((res) => {
                setRecipe(res.data);
            })
            .catch((err) => console.log(err));

        axios.get(`http://localhost:8000/api/users/${userId}`)
            .then((res) => {
                setFavorites(res.data.favorites);
            })
    }, []);

    useEffect(() => {
        axios.put('http://localhost:8000/api/users/' + userId, {
            favorites
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, [favorites]);

    const deleteRecipe = (recipeId) => {
        axios.delete(`http://localhost:8000/api/recipes/${recipeId}`)
            .then((res) => {
                console.log(res.data);
                navigate('/main');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const likeFunction = (recipe) => {
        
        recipe.likes++;

        setDisabled([...disabled, recipe._id]);
        axios.put('http://localhost:8000/api/recipes/' + recipe._id, recipe)
            .then(res => {
                console.log(res.data.likes);
            });

        setFavorites([...favorites, recipe._id]);
    }

    return (
        <div>
            <Header />
            <div className='wrapper'>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <button className='likeButton' disabled={disabled.indexOf(recipe._id) !== -1} onClick={() => {likeFunction(recipe)}}>
                        <img style={{width: '20px', margin: '5px'}} src={uploadImgLike} alt={'uploadImgLike'} />
                        <p>{recipe.likes} like(s)</p>
                    </button>
                    <div style={{display: 'flex', alignItems: 'baseline', fontSize: '14px'}}>
                        <div>
                            <Link to={'/' + recipe._id + '/edit'} style={{color: 'blue', margin: '0px 20px'}}>
                                edit recipe
                            </Link>
                        </div>
                        <button onClick={() => deleteRecipe(recipe._id)} className='deleteButton'>Delete</button>
                    </div>
                </div>
                <h2 style={{marginTop: '40px'}}>{recipe.name}</h2>
                <div className='recipeColomns'>
                    <div className='recipePhoto'>
                        <img src={recipe.image} alt={recipe.image} />
                    </div>
                    <div>
                        <h4>Description</h4>
                        <p>{recipe.description}</p>
                    </div>
                </div>
                <div className='recipeDetails'>
                    <ul>
                        {recipe.cookingTime 
                        ? <li>
                            <img src={uploadImgTime} alt={'uploadImgTime'} />
                            <p>{recipe.cookingTime}</p>
                        </li>
                        : null}
                        <li>
                            <img src={uploadImgLevel} alt={'uploadImgLevel'} />
                            <p>{recipe.difficultyLevel}</p>
                        </li>
                        {recipe.ingredients
                        ? <li>
                            <img src={uploadImgStar} alt={'uploadImgStar'} />
                            <p>{recipe.ingredients.length} ingredient(s)</p>
                        </li>
                        : null}
                    </ul>
                </div>
                <hr className='divLine' />
                <div>
                    <h3>Ingredients</h3>
                    <div>
                        {recipe.ingredients
                        ? recipe.ingredients.map((ingredient, index) => {
                            return (
                                <div key={index} className='ingredientsInfo'>
                                        <p>{index+1}.</p>
                                        <p>{ingredient.ingr}</p>
                                        <p>{ingredient.amount}</p>
                                </div>
                            )
                        })
                        :null}
                    </div>
                </div>
                <hr className='divLine' />
                <div>
                    <h3>Instructions</h3>
                    {recipe.steps 
                    ? recipe.steps.map((step, index) => {
                        return (
                            <div key={index} className='stepsList'>
                                <div>
                                    <h4>Step {index+1}</h4>
                                    <p style={{marginBottom: '20px'}}>{step.step}</p>
                                </div>
                            </div>
                        )
                    })
                    : null}
                </div>
            </div>
        </div>
    )
}

export default RecipeDetails;