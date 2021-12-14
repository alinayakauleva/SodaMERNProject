import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import NewRecipeForm from './components/NewRecipeForm';
import Main from './view/Main';
import RecipeUpdate from './components/RecipeUpdate';
import RecipeDetails from './components/RecipeDetails';
import Register from './components/Register';
import Login from './components/Login';
import UserPage from './components/UserPage';
import ErrorPage from './components/ErrorPage';

function App() {

  const byteToBase64 = (byteArray) => {
    if(byteArray.data !== null){
        let base64String = Buffer.from(byteArray.data.data, "base64").toString();

        return base64String;
    }
  }

  return (
    <div>
      <Router>
        <Register path='/register' />
        <Login path='/' />
        <Main path='/main' byteToBase64={byteToBase64} />
        <NewRecipeForm path='/new' />
        <UserPage path='/user/profile/:id' byteToBase64={byteToBase64} />
        <RecipeUpdate path='/:id/edit' byteToBase64={byteToBase64} />
        <RecipeDetails path='/main/:id' byteToBase64={byteToBase64} />
        <ErrorPage path='/errorpage' />
      </Router>
    </div>
  );
}

export default App;
