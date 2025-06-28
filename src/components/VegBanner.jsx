import React, { useState } from 'react'
import VegSpag from '../assets/VegSpag.png'
import { useNavigate } from 'react-router-dom'

export default function VegBanner() {
    const navigate = useNavigate()
    const handleClick = async()=>{
        navigate('recipes/veg')
    }
  return (  
    <>
    <div className='h-1/3 lg:h-2/5 flex justify-between items-center bg-gradient-to-r from-green-200 via-green-300 to-green-500'>
        <div className={`px-2 flex flex-col justify-center items-center gap-y-4 md:gap-y-8 lg:gap-y-14`}>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-green-950 text-center'>
                Wholesome, Fresh, and Flavorful - The Veg Way!
            </h2>
            <div className='flex justify-center'>
                <button className='bg-black text-white px-3 py-2 md:py-3 md:px-8 md:text-2xl lg:text-2xl lg:px-10 font-semibold hover:bg-green-400 hover:text-black transition-colors duration-500'
                onClick={()=>{
                    handleClick()
                }}
                >Explore Veg Recipes</button>
            </div>
        </div>

        <div>
            <img src={VegSpag} className={`h-56 w-80 md:h-72 lg:h-80 lg:w-96`}/>
        </div>
    </div>
    </>
  )
}
