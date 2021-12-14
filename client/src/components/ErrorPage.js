import React from 'react';
import { Link } from '@reach/router';

const ErrorPage = () => {
    return (
        <div className='wrapper'>
            <h1 style={{textAlign: 'center'}}>Sorry, You are not autorized to Add New Recipe!</h1>
            <div style={{margin: '80px auto', width: '200px', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                <Link to='/' style={{color: 'blue'}}>Sign In</Link>
                <Link to='/register' style={{color: 'blue'}}>Sign Up</Link>
            </div>
        </div>
    )
}

export default ErrorPage;