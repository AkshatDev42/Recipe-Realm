//Fix the loading context in all places

import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes, useSearchParams} from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx' 
import RecipeList from './components/RecipeList.jsx';
import axios from 'axios';
import { ThemeProvider} from './contexts/ThemeContext.jsx';
import Padding from './components/Padding.jsx';
import RecipeDesc from './components/RecipeDesc.jsx';
import { useLoading } from './contexts/LoadingContext.jsx';

function App() {
  const[vegRecipe,setVegRecipe] = useState([])
  const[nonVegRecipe,setNonVegRecipe] = useState([])
  const[healthyRecipe,setHealthyRecipe] = useState([])
  const[dessertRecipe,setDessertRecipe] = useState([])
  const[searchResult,setSearchResult] = useState([])
  
  const[vegTotal,setVegTotal] = useState(0)
  const[nonVegTotal,setNonVegTotal] = useState(0)
  const[healthyTotal,setHealthyTotal] = useState(0)
  const[dessertTotal,setDessertTotal] = useState(0)
  const[searchTotal,setSearchTotal] = useState(0)
  
  const[vegIndex,setVegIndex] = useState(1)
  const[nonVegIndex,setNonVegIndex] = useState(1)
  const[healthyIndex,setHealthyIndex] = useState(1)
  const[dessertIndex,setDessertIndex] = useState(1)
  const[searchIndex,setSearchIndex] = useState(1)

  const[vegOnly,setVegOnly] = useState(false)
 const[searchValue,setSearchValue] = useState('')

  const {loading,setLoading} = useLoading()

  const fetchVegRecipe = async()=>{
    try{
      setLoading(true)
      setNonVegIndex(1)
      setHealthyIndex(1)
      setDessertIndex(1)
      setSearchIndex(1)
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&diet=Vegetarian&offset=${vegIndex*10-10}`)
      const results = response.data.results
      setVegTotal(response.data.totalResults)
      setVegRecipe(results)
    }
    catch(err){
      throw new Error("Looks like our veggies have gone on a picnic! Please check back soon.")
    }
    finally{
      setLoading(false)
    }
  }

  const fetchNonVegRecipe = async()=>{
    try{
      setLoading(true)
      setVegIndex(1)
      setHealthyIndex(1)
      setDessertIndex(1)
      setSearchIndex(1)
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=Chicken&offset=${nonVegIndex*10-10}`)
      const results = response.data.results
      setNonVegTotal(response.data.totalResults)
      setNonVegRecipe(results)
    }
    catch(err){
      throw new Error("Our grills are on cooldown, and the non-veg dishes are taking a nap. Please check back later!")
    }
    finally{
      setLoading(false)
    }
  }

  const fetchDessertRecipe = async()=>{
    try{
      setLoading(true)
      setVegIndex(1)
      setNonVegIndex(1)
      setHealthyIndex(1)
      setSearchIndex(1)
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=Dessert&offset=${dessertIndex*10-10}`)
        const results = response.data.results
        console.log(results)
        setDessertTotal(response.data.totalResults)
        setDessertRecipe(results)
    }
    catch(err){
      throw new Error("Oh no! Looks like the desserts have melted away. We're working to bring them back to you soon!")
    }
    finally{
      setLoading(false)
    }
  }  

  const fetchHealthyRecipe = async()=>{
    try{
      setLoading(true)
      setVegIndex(1)
      setNonVegIndex(1)
      setDessertIndex(1)
      setSearchIndex(1)
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=Salad&offset=${healthyIndex*10-10}`)
      const results = response.data.results
      setHealthyTotal(response.data.totalResults)
      setHealthyRecipe(results)
    }
    catch(err){
      throw new Error("Yikes! The healthy options are out of stock for now. We’ll refill them soon to keep you fit and happy!")
    }
    finally{
      setLoading(false)
    }
  }
  
  const fetchSearchRecipe = async() =>{
    try{
      setLoading(true)
      setVegIndex(1)
      setNonVegIndex(1)
      setHealthyIndex(1)
      setDessertIndex(1)
      console.log(searchValue)
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=${searchValue}&${vegOnly?'diet=Vegetarian':''}&offset=${searchIndex*10-10}`)
      const results = response.data.results
      console.log(results)
      if(results.length!==0)
      {
        setSearchResult(results)
        setSearchTotal(response.data.totalResults)
      }
      else if(response.status===402)
      {
        throw new Error("Looks like We've reached our daily limit Sorry we were not able to serve you")
      }
      else
      {
        throw new Error(`Looks like ‘${searchValue}’ isn’t in our cookbook right now. How about trying a different dish?`)
      }
    }
    catch(err)
    {
      throw err
    }
    finally
    {
      setLoading(false)
    }
  }
  return (
    <>
    <ThemeProvider> 
      <BrowserRouter>
      <Padding>

      <Navbar/>
          <Routes>
            <Route exact path='/' element = {<Home
            setSearchValue = {setSearchValue}
            />}/>

            <Route exact path = '/recipes/veg' element = {
              <RecipeList 
              fetchRecipe = {fetchVegRecipe}
              recipe = {vegRecipe}
              loading={loading}
              index = {vegIndex}
              total = {vegTotal}
              setIndex = {setVegIndex}
              />}/>

            <Route exact path='recipes/non-veg' element= {
              <RecipeList
              fetchRecipe={fetchNonVegRecipe}
              recipe={nonVegRecipe}
              loading={loading}
              index ={nonVegIndex}
              setIndex={setNonVegIndex}
              total = {nonVegTotal}
              />
            }/>
            
            <Route exact path='recipes/dessert' element= {
              <RecipeList
              fetchRecipe={fetchDessertRecipe}
              recipe={dessertRecipe}
              loading={loading}
              index={dessertIndex}
              setIndex={setDessertIndex}
              total = {dessertTotal}
              />
            }/>

            <Route exact path='recipes/healthy-food' element= {
              <RecipeList
              fetchRecipe={fetchHealthyRecipe}
              recipe={healthyRecipe}
              loading={loading}
              index = {healthyIndex}
              setIndex={setHealthyIndex}
              total = {healthyTotal}
              />
            }/>

            <Route path = 'recipes/:item' element = {
              <RecipeList
              fetchRecipe={fetchSearchRecipe}
              recipe = {searchResult}
              loading={loading}
              index = {searchIndex}
              setIndex={setSearchIndex}
              total = {searchTotal}
              veg = {vegOnly}
              setVeg = {setVegOnly}
              searchValue = {searchValue}
              />
            }/>

            <Route path='recipes/veg/recipe/:id' element = {<RecipeDesc/>}/>

            <Route path='recipes/non-veg/recipe/:id' element = {<RecipeDesc/>}/>

            <Route path='recipes/dessert/recipe/:id' element = {<RecipeDesc/>}/>

            <Route path='recipes/healthy-food/recipe/:id' element = {<RecipeDesc/>}/>

            <Route path={`recipes/${searchValue}/recipe/:id`} element = {<RecipeDesc/>}/>
          </Routes>
      </Padding>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}


export default App
