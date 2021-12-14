import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import Header from '../view/Header';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const login = (e) => {
        e.preventDefault();
        
        axios.post(
                "http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('userLoggedIn', res.data.userLoggedIn);
                navigate("/main", { state: { idForNav: res.data.userId } });
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });

        setEmail();
    };

    return (
        <div>
            <Header />
            <div className='wrapper'>
            <form onSubmit={login}>
                <fieldset className='logregWrapper'>
                    <legend><h2>Sign In</h2></legend>
                    <div>
                        <label>Email</label><br/>
                        <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password</label><br/>
                        <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <p className='errorMessageLog' style={{margin: '10px 0px 0px 10px'}}>{
                    errorMessage 
                    ? <p>*{errorMessage}</p> 
                    : null}</p>
                    <div style={{textAlign: 'right'}}>
                        <button>Sign In</button>
                    </div>
                    <div className='haveanAcc'>
                        <p>Do not have an account yet?</p>
                        <Link to='/register'>Sign Up</Link>
                    </div>
                </fieldset>
            </form>
        </div>
        </div>
    )
}

export default Login;