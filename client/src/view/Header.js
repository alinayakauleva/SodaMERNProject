import React, { useEffect, useState } from 'react';
import uploadImgAll from '../img/all.png';
import uploadImgFav from '../img/favorites.png';
import uploadImgAdd from '../img/add.png';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

const Header = (props) => {
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    const logout = (e) => {
        e.preventDefault();
        axios.post(
                'http://localhost:8000/api/users/logout',{},
                {
                    withCredentials: true
                }
            )
            .then((res) => {
                console.log(res.data);
                localStorage.removeItem("userId");
                localStorage.removeItem("userLoggedIn");

                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        setUserName(localStorage.getItem('userLoggedIn'));
        setUserId(localStorage.getItem('userId'));
    }, [])

    return (
        <div className='header'>
            <Link to={'/main'} className='menuLinks' style={{textDecoration: 'none'}}>
                <h1>SODA</h1>
            </Link>
            <ul className='menu'>
                <li>
                    <img className='icons' src={uploadImgAll} alt={'uploadImgAll'} />
                    <Link to={'/main'} className='menuLinks'>All Recipes</Link>
                </li>
                <li>
                    <img className='icons' src={uploadImgFav} alt={'uploadImgFav'} />
                    <Link to={'/user/profile/' + userId} className='menuLinks'>My Recipes</Link>
                </li>
                <li>
                    <img className='icons' src={uploadImgAdd} alt={'uploadImgAdd'} style={{width: '20px', marginRight: '4px'}} />
                    <Link to={'/new'} className='menuLinks'>Add New Recipe</Link>
                </li>
            </ul>
            {
                userName
                ? <div className='welcomeMessage'>
                    <p style={{fontWeight: 'bold'}}>Hello, {userName}!</p>
                    <button onClick={logout}>log out</button>
                </div>
                : <div className='welcomeMessage'>
                    <p style={{fontWeight: 'bold'}}>Welcome!</p>
                    <Link to='/'><button>sign in</button></Link>
                </div>
            }
        </div>
    )
}

export default Header;