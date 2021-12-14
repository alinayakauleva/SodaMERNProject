import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import uploadImgLike from '../img/like.png';
import uploadImgTime from '../img/time.png';
import uploadImgLevel from '../img/level.png';
import uploadImgStar from '../img/star.png';

const Favorites = () => {
    const [recipes, setRecipes] = useState([]);

    let userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/recipes/favorites/${userId}`)
            .then((res) => {
                console.log(res);
                setRecipes(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='wrapper'>
            <h2>My Favorite Recipes</h2>
            {
            recipes.map((recipe, index) => (
                <div key={index} className='oneRecipe'>
                    <div className='recipeColomns'>
                        <div className='recipePhoto'>
                            <img src={recipe.image} alt={recipe.image} />
                        </div>
                        <div>
                            <div>
                                <h3 style={{margin: '10px 0px 20px 0px'}}>{recipe.name}</h3>
                            </div>
                            <p>{recipe.description}</p>
                        </div>
                    </div>
                    <div className='recipeDetails'>
                        <ul>
                            <li>
                                <img src={uploadImgLike} alt={'uploadImgLike'} />
                                <p>{recipe.likes} like(s)</p>
                            </li>
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
                            ?<li>
                                <img src={uploadImgStar} alt={'uploadImgStar'} />
                                <p>{recipe.ingredients.length} ingredient(s)</p>
                            </li>
                            : null}
                        </ul>
                        <div className='recipeInfo'>
                            <Link to={'/main/' + recipe._id}>read more</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Favorites;