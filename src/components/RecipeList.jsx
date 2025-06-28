import React, { useState, useEffect} from 'react'
import RecipeItem from './RecipeItem';
import LoadingScreen from '../assets/LoadingScreen.gif'
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../contexts/LoadingContext';

export default function RecipeList({fetchRecipe,recipe,index,total,setIndex,veg,searchValue,setVeg}) {
    const{dark} = useTheme()
    const location = useLocation()
    const [errorMessage,setErrorMessage] = useState('')
    const {loading,setLoading} = useLoading()
    const fetchRecipeAsync = async()=>{
        try{
            await fetchRecipe();
        }
        catch(err){
            setErrorMessage(err.message)
        }
    }
    useEffect(()=>{
        fetchRecipeAsync()
    },[index,veg])

  return (
    <>
    {
        loading?
        (<div className={`fixed top-0 left-0 flex justify-center items-center h-screen w-screen ${dark?'bg-slate-400':''}`}>
            <img src={LoadingScreen} className={`h-60 w-60 lg:h-72 lg:w-72 ${dark?'invert':''}`}/>
        </div>):(errorMessage!=='')?
        (<div className='fixed top-0 left-0 flex justify-center items-center h-screen w-screen text-3xl font-semibold text-center'>
            {errorMessage}
        </div>)
        :(<>
        {/* Extract Veg Recipes Only [Feature only for searched recipes] */}
        {
        location.pathname==`/recipes/${searchValue}`?
        (<div className='flex justify-end px-10 gap-3 items-center'>
            <div className='font-semibold text-green-800'>Veg Only</div>
            <div className='h-8 w-16 bg-gray-300 rounded-full cursor-pointer' onClick ={()=>{
                setVeg((prev)=>!prev)
                setIndex(1)
            }}>
                <div className={`h-full w-1/2 rounded-full  shadow-sm    shadow-gray-500 ${veg?'translate-x-full bg-green-400':'bg-white'} transition-all duration-700 border-2`}>

                </div>
            </div>
        </div>):(<div></div>)}
       <div className={`flex justify-center items-center flex-wrap py-5 gap-y-9 gap-x-10 w-screen ${dark?'bg-slate-400':''}`}>
            <div className='w-screen text-center text-2xl md:text-3xl lg:text-3xl'>
                {total} Search Results Found
            </div>
            {
                recipe.map((recipe)=>
                <RecipeItem
                name = {recipe.title}
                image = {recipe.image}
                id = {recipe.id}
                key = {recipe.title}
                />
                )
            }
        </div>
        <div className={`flex justify-center items-center py-8 font-semibold text-xl md:text-2xl lg:text-3xl gap-8 ${dark?'bg-slate-400 text-white':''}`}>
            <div className={`${index===1?'text-gray-500':''} ${dark?'hover:bg-gray-700':'hover:bg-gray-300'} p-3 rounded-full`}onClick={()=>{
                if(index===1)
                    return
                else
                {
                    setIndex((prevIndex)=>prevIndex-1)
                }
            }}><MdArrowBackIos/></div>
            <div>
                {index} of {Math.ceil(total/10)}
            </div>
            <div className={`${index>=Math.ceil(total/10)?'text-gray-500':''} ${dark?'hover:bg-gray-700':'hover:bg-gray-300'} p-3 rounded-full`} onClick={()=>{
                if(index>=Math.ceil(total/10))
                    return
                setIndex((prevIndex)=>prevIndex+1)
            }}><MdArrowForwardIos/></div>
        </div>
        </>)
    }
    </>
  )
}
