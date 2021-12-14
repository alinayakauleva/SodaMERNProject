import React from 'react';
import { Link } from '@reach/router';
import uploadImgLike from '../img/like.png';
import uploadImgTime from '../img/time.png';
import uploadImgLevel from '../img/level.png';
import uploadImgStar from '../img/star.png';

const AllRecipes = (props) => {
    const {recipes, byteToBase64} = props;

    return (
        <div>
            {recipes.map((recipe, index) => {
                return (
                    <div key={index} className='oneRecipe'>
                        <div className='recipeInfo'>
                            Author:
                            <Link to={`/user/profile/${recipe.createdBy?._id}`} style={{marginLeft: '5px'}}>
                                {recipe.createdBy?.username}
                            </Link>
                        </div>
                        <div className='recipeColomns'>
                            {/* <div className='recipePhoto'>
                                <img src={byteToBase64(recipe.image)} alt={recipe.image} />
                            </div> */}
                            <div className='recipePhoto'>
                                <img src={recipe.image} alt={recipe.image} />
                            </div>
                            <div>
                                <div>
                                    <h3 style={{margin: '0px 0px 20px 0px'}}>{recipe.name}</h3>
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
                                <li>
                                    <img src={uploadImgStar} alt={'uploadImgStar'} />
                                    <p>{recipe.ingredients.length} ingredient(s)</p>
                                </li>
                            </ul>
                            <div className='recipeInfo'>
                                <Link to={'/main/' + recipe._id}>read more</Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AllRecipes;