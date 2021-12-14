import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import uploadImgAddStr from '../img/addstr.png';
import uploadImgDelete from '../img/delete.png';
import Header from '../view/Header';

const NewRecipeForm = () => {
    const[name, setName] = useState('');
    const[cookingTime, setCookingTime] = useState('');
    const[difficultyLevel, setDifficultyLevel] = useState('');
    const[image, setImage] = useState();
    const[description, setDescription] = useState('');
    
    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const [step, setStep] = useState('');
    const [steps, setSteps] = useState([]);

    const [errors, setErrors] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/recipes', {
            name,
            cookingTime,
            difficultyLevel,
            image,
            description,
            ingredients,
            steps
        }, {withCredentials: true}
        )
            .then(res => {
                console.log(res);
                navigate('/main');
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401){
                    navigate('/errorpage')
                } else {
                    setErrors(err.response.data.errors);
                }
            });
    }

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        if(file.size > 2097152){
            window.alert("Please upload a file smaller than 2 MB");
            e.target.value = null;
            return false;
        }
        else{
            reader.onloadend = () => {
                setImage(reader.result);
            }
        }
        
        reader.readAsDataURL(file)
        console.log(file)
    }

    const addIngredient = (e) => {
        e.preventDefault();

        setIngredients([...ingredients, {ingr: ingredient, amount: amount}]);
        
        setIngredient('');
        setAmount('');
    }

    const addStep = (e) => {
        e.preventDefault();

        setSteps([...steps, {step: step}]);
        
        setStep('');
    }

    const deleteIngredient = (index) => {
        setIngredients(ingredients.filter((ingredient, i) => i !== index))
    }

    const deleteStep = (index) => {
        setSteps(steps.filter((step, i) => i !== index))
    }

    return (
        <div>
            <Header />
            <div className='wrapper'>
                <h2>Add New Recipe</h2>
                <form onSubmit={submitHandler}>
                    <h3 style={{marginBottom: '0px'}}>Recipe Name</h3>
                    <input type='text' placeholder='Recipe Name' onChange={(e) => setName(e.target.value)} style={{margin: '0px 0px 7px 117px', width: '335px'}} />
                    {
                        errors.name ?
                        <p className='errorMessage'>*{errors.name.message}</p>
                        :null
                    }
                    <div className='aboutForm'>
                        <div>
                            <div className='aboutFormOne'>
                                <div>Cooking Time</div>
                                <input type='text' placeholder='Cooking Time' onChange={(e) => setCookingTime(e.target.value)} />
                            </div>
                            <div className='aboutFormOne'>
                                <div>Photo</div>
                                <input className='fileInput' type='file' accept='image/*' onChange={handleImageChange} />
                            </div>
                        </div>
                        <div>
                            <div className='aboutFormOne'>
                                <div>Difficulty Level</div>
                                <select onChange={(e) => setDifficultyLevel(e.target.value)}>
                                    <option value='' defaultValue >Choose Difficulty Level</option>
                                    <option value='easy'>easy</option>
                                    <option value='normal'>normal</option>
                                    <option value='hard'>hard</option>
                                </select>
                            </div>
                            {
                                errors.difficultyLevel ?
                                <p className='errorMessage'>*{errors.difficultyLevel.message}</p>
                                :null
                            }
                            <div className='aboutFormOne'>
                                <div>Description</div>
                                <input type='text' placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <hr className='divLine' />
                    <div>
                        <h3>Ingredients</h3>
                        <div>
                            <input type='text' value={ingredient} placeholder='Specify Ingredient' onChange={(e) => setIngredient(e.target.value)} className='ingredients' />
                            <input type='text' value={amount} placeholder='Amount' onChange={(e) => setAmount(e.target.value)} />
                        </div>
                        {
                            errors.ingredients ?
                            <p className='errorMessage'>*{errors.ingredients.message}</p>
                            :null
                        }
                        <div className='addMore'>
                            <button onClick={addIngredient}>
                                <img src={uploadImgAddStr} alt={'uploadImgAddStr'} className='addStr' />
                                <div>Add Ingredient</div>
                            </button>
                        </div>
                        {ingredients.map((ingredient, index) => {
                            return (
                                <div key={index} className='ingredientsList'>
                                    <div>
                                        <p>{index+1}.</p>
                                        <p>{ingredient.ingr}</p>
                                        <p>{ingredient.amount}</p>
                                    </div>
                                    <button onClick={() => deleteIngredient(index)} className='delete' style={{background: 'none'}}>
                                        <img src={uploadImgDelete} alt={'uploadImgDelete'} />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <hr className='divLine' />
                    <div>
                        <h3>Instruction</h3>
                        <div>
                            <textarea placeholder='Specify New Step' value={step} onChange={(e) => setStep(e.target.value)} rows='4' />
                        </div>
                        {
                            errors.steps ?
                            <p className='errorMessage' style={{marginLeft: '10px'}}>*{errors.steps.message}</p>
                            :null
                        }
                        <div className='addMore'>
                            <button onClick={addStep}>
                                <img src={uploadImgAddStr} alt={'uploadImgAddStr'} className='addStr' />
                                <div>Add Step</div>
                            </button>
                        </div>
                        {steps.map((step, index) => {
                            return (
                                <div key={index} className='stepsList'>
                                    <div className='step'>
                                        <h4>Step {index+1}</h4>
                                        <p>{step.step}</p>
                                    </div>
                                    <button onClick={() => deleteStep(index)} className='delete'>
                                        <img src={uploadImgDelete} alt={'uploadImgDelete'} />
                                    </button>
                                </div>
                            )
                        })}
                        
                    </div>
                    <div className='addButton'>
                        <button>Add Recipe</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewRecipeForm;