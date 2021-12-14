import React, { useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import Header from '../view/Header';

const Register = (props) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [confirmReg, setConfirmReg] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const signUp = (e) => {
        e.preventDefault();

        axios.post(
                "http://localhost:8000/api/users/register",
                user, 
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res.data);
                setUser({
                    userName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                setConfirmReg(
                    "You have successfully registered!",
                );
                setErrors({});
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div>
            <Header />
            <div className='wrapper'>
                {
                    confirmReg 
                    ? <div className='regMessage'>
                        <h4> {confirmReg}</h4>
                        <Link to='/' style={{color: 'blue', fontSize: '17px'}}>Sign In</Link>
                    </div>
                    : null
                }
                {
                    !confirmReg
                    ? <form onSubmit={signUp}>
                        <fieldset className='logregWrapper'>
                            <legend><h2>Sign Up</h2></legend>
                            <div>
                                <label>Name/Login</label><br/>
                                <input type='text' name='username' value={user.username} onChange={(e) => handleChange(e)} />
                            </div>
                            {errors.username 
                            ? <div className='errorMessageLog'>
                                *{errors.username.message}
                            </div>
                            : null}
                            <div>
                                <label>Email</label><br/>
                                <input type='text' name='email' value={user.email} onChange={(e) => handleChange(e)} />
                            </div>
                            {errors.email 
                            ? <div className='errorMessageLog'>
                                *{errors.email.message}
                            </div>
                            : null}
                            <div>
                                <label>Password</label><br/>
                                <input type='password' name='password' value={user.password} onChange={(e) => handleChange(e)} />
                            </div>
                            {errors.password 
                            ? <div className='errorMessageLog'>
                                *{errors.password.message}
                            </div>
                            : null}
                            <div>
                                <label>Confirm Password</label><br/>
                                <input type='password' name='confirmPassword' value={user.confirmPassword} onChange={(e) => handleChange(e)} />
                            </div>
                            {errors.confirmPassword 
                            ? <div className='errorMessageLog'>
                                *{errors.confirmPassword.message}
                            </div>
                            : null}
                            <div style={{textAlign: 'right'}}>
                                <button>Sign Up</button>
                            </div>
                            <div className='haveanAcc'>
                                <p>Already have an account?</p>
                                <Link to='/'>Sign In</Link>
                            </div>
                        </fieldset>
                    </form>
                    :null
                }
            </div>
        </div>
    );
}

export default Register;