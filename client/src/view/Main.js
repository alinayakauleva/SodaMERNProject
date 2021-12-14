import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AllRecipes from '../components/AllRecipes';
import Header from '../view/Header';
import { Link } from '@reach/router';
import uploadImgLike from '../img/like.png';
import uploadImgTime from '../img/time.png';
import uploadImgLevel from '../img/level.png';
import uploadImgStar from '../img/star.png';

const Main = (props) => {
    const {byteToBase64} = props;

    const [recipes, setRecipes] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [searchWord, setSearchWord] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/recipes')
            .then(res => {
                setRecipes(res.data);
                setLoaded(true);
                console.log(res.data);
            })
    }, []);

    const search = (e) => {
        e.preventDefault();

        axios.get('http://localhost:8000/api/recipes/find/' + searchWord)
            .then(res => {
                setSearchResult(res.data);
                console.log(res.data);
            })
            
    }

    return (
        <div>
            <Header />
            <div className='wrapper'>
                <div className='search'>
                    <input type='text' placeholder='Search' onChange={(e) => setSearchWord(e.target.value)} />
                    <button onClick={search}>Go</button>
                </div>
                {
                    searchResult.length !== 0
                    ? <h2>Search Results</h2>
                    : null
                }
                {
                searchResult.length !== 0
                ? searchResult.map((recipe, index) => {
                    return (
                        <div key={index} className='oneRecipe'>
                            <div className='recipeInfo'>
                                Author:
                                <Link to={`/user/profile/${recipe.createdBy?._id}`} style={{marginLeft: '5px'}}>
                                    {recipe.createdBy?.username}
                                </Link>
                            </div>
                            <div className='recipeColomns'>
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
                })
            : null}
                <div>
                    <h2>All Recipes</h2>
                    {loaded && <AllRecipes recipes={recipes} byteToBase64={byteToBase64} />}
                </div>
            </div>
        </div>
    )
}

export default Main;