import React, { useEffect, useState } from 'react';
import Image1 from '../assets/Image1.avif';
import Image2 from '../assets/Image2.webp';
import Image3 from '../assets/Image3.webp';
import Typewriter from 'typewriter-effect';
import VegBanner from './VegBanner';
import NonVegBanner from './NonVegBanner';
import HealthyBanner from './HealthyBanner';
import DesertBanner from './DesertBanner';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Home({setSearchValue}) {
  const {dark} = useTheme()
  const navigate = useNavigate()
  const [index, setIndex] = useState(0);
  const ImageArray = [Image1, Image2, Image3];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % ImageArray.length);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const recipeValue = event.target.recipe.value.trim();
    
    if (recipeValue === '') {
      event.target.recipe.placeholder = 'Please Enter Recipe Name!';
      return;
    }
    setSearchValue(recipeValue)
    navigate(`recipes/${recipeValue}`);
  }
  
  return (
    <>
      <div className={`h-screen ${dark?'bg-slate-400':''}`}>
        <div
          style={{ backgroundImage: `url(${ImageArray[index]})` }}
          className="flex flex-col items-center justify-center h-1/2 lg:h-3/4 w-screen bg-cover opacity-90 text-white"
        >
          <div className='flex justify-center text-3xl md:text-5xl lg:text-6xl font-bold py-10 md:py-14 lg:py-20'>
            <span>
              <Typewriter
                options={{
                  strings: ['Discover', 'Crave', 'Cook', 'Celebrate'],
                  autoStart: true,
                  loop: true,
                  delay: 90,
                  cursor: ''
                }}
              />
            </span>
            <span>&nbsp;With <span className='font-lobster lg:text-5xl'>RecipeRealm</span></span>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <form onSubmit={handleSubmit}>
              <input type='text' name='recipe' id='recipe' placeholder='Search for your favorite dish..' className='w-80 h-11 px-4 rounded-3xl text-lg opacity-85 text-black lg:w-[35rem] lg:h-14 lg:text-xl xl:w-[50rem]' />
            <div className='flex justify-center'>
              <button type = 'submit' className='bg-white my-8 px-8 py-2 text-black rounded-full text-xl font-semibold opacity-85 active hover:bg-black hover:text-white transition-colors duration-500 lg:px-16 lg:py-3 lg:text-2xl'>Search</button>
            </div>
            </form>
          </div>

        </div>
        <div className={`flex flex-col gap-y-2 mt-2 lg:gap-3 ${dark?'bg-slate-400':''}`}>
          <VegBanner/>
          <NonVegBanner/>
          <HealthyBanner/>
          <DesertBanner/>
        </div>
      </div>
    </>
  );
}
