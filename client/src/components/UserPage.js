import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import Header from '../view/Header';
import uploadImgLike from '../img/like.png';
import uploadImgTime from '../img/time.png';
import uploadImgLevel from '../img/level.png';
import uploadImgStar from '../img/star.png';
import Favorites from './Favorites';

const UserPage = (props) => {
    const [userRecipes, setUserRecipes] = useState([]);
    const [user, setUser] = useState();
    const {id, byteToBase64} = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/recipes/${id}`)
            .then((res) => {
                setUserRecipes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then((res) => {
                setUser(res.data.username);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Header />
            <div className='wrapper'>
                <h2>All recipes by user: <br/> {user} </h2>
                {
                userRecipes.map((recipe, index) => (
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
                ))}
            </div>
            <Favorites />
        </div>
    )
}

export default UserPage;