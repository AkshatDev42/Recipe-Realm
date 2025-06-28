import React from 'react'
import NonVeg from '../assets/NonVeg.png'
import { useNavigate } from 'react-router-dom'
export default function NonVegBanner() {
  const navigate = useNavigate()
  return (
    <>
    <div className='h-1/3 lg:h-2/5 flex justify-between items-center bg-gradient-to-l from-red-200 via-red-300 to-yellow-300 md:px-7'>
        <div>
            <img src={NonVeg} className='h-56 w-80 md:h-72 lg:h-72 lg:w-96'/>
        </div>
        <div className='px-2 flex flex-col justify-center items-center gap-y-4 md:gap-y-8 lg:gap-y-14'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-red-900 text-center'>
            Unleash the Taste of Perfection – A Meat Lover’s Paradise!
            </h2>
            <div className='flex justify-center'>
                <button className='bg-black text-white px-3 py-2 md:py-3 md:px-8 md:text-2xl lg:text-2xl lg:px-10 font-semibold hover:bg-red-400 hover:text-black transition-colors duration-500'
                onClick={()=>{navigate('/recipes/non-veg')}}
                >Explore NonVeg Recipes</button>
            </div>
        </div>
    </div>
    </>
  )
}
