import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GiTomato } from "react-icons/gi";
import { useTheme } from '../contexts/ThemeContext';
import LoadingScreen from '../assets/LoadingScreen.gif';
import { useParams } from 'react-router-dom';
import { useLoading } from '../contexts/LoadingContext';

export default function RecipeDesc() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({});
    const {loading, setLoading} = useLoading(false)
    const { dark } = useTheme()
    const fetchRecipe = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY}`);
            const result = response.data;
            console.log(result);
            setRecipe(result);
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchRecipe();
    }, []);

    return (
        loading ?
            (<div className={`fixed top-0 left-0 flex justify-center items-center h-screen w-screen ${dark ? 'bg-slate-400' : ''}`}>
                <img src={LoadingScreen} className={`h-60 w-60 lg:h-80 lg:w-72 ${dark ? 'invert' : ''}`} />
            </div >)
            :
            (
                <div className={`${dark ? 'bg-slate-400 text-white' : ''} w-screen font-dm-serif-display`}>
                    <div className='text-4xl lg:text-5xl my-1 '>
                        {recipe.title}
                    </div>

                    <div className='flex justify-center'>    
                        <img src={recipe.image} className={`h-60 w-full lg:h-72 lg:w-1/2 shadow-md my-3 lg:my-8 ${dark?'shadow-white':''}`} alt="Recipe" />
                    </div>

                    <div className='text-xl lg:text-2xl'>
                        {recipe.readyInMinutes && <div className='flex gap-2'>
                            <span>
                                Cooking Time:
                            </span>
                            <span>
                                {recipe.readyInMinutes} Minutes
                            </span>
                        </div>}

                        {recipe.servings && <div className='flex gap-2'>
                            <span>
                                Servings:
                            </span>
                            <span>
                                {recipe.servings} Persons
                            </span>
                        </div>}
                    </div>

                    <div className='text-3xl lg:text-4xl py-5 w-screen'>
                        Here's What You Need
                    </div>

                    <div>
                        {recipe.extendedIngredients && recipe.extendedIngredients.map((ingredient) => (
                            <div key={ingredient.original} className='flex my-4 gap-2 text-xl lg:text-2xl'>
                                <div className={`text-2xl ${dark?'text-green-500':'text-red-600'}`}><GiTomato /></div><div>{ingredient.original}</div>
                            </div>
                        ))}
                    </div>

                    <div className='text-3xl lg:text-4xl my-4'>
                        Steps Involved
                    </div>

                    <div>
                        {recipe.analyzedInstructions && recipe.analyzedInstructions[0].steps.map((step) => {
                            return <div className='flex justify-start text-xl lg:text-2xl py-6'>
                                <span>{step.number}.</span><span>{step.step}</span>
                            </div>
                        })}
                    </div>
                </div>
            )
    );
}
