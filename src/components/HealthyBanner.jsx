import React from 'react'
import Salad from '../assets/Salad.png'
import { useNavigate } from 'react-router-dom'

export default function HealthyBanner() {
  const navigate = useNavigate()
  return (
    <>
    <div className='h-1/3 lg:h-2/5 flex justify-between items-center bg-gradient-to-r from-sky-200 via-sky-300 to-green-300 md:px-7'>
            <div className='px-2 flex flex-col justify-center items-center gap-y-4 md:gap-y-8 lg:gap-y-14'>
                <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-blue-800 text-center'>
                Energize Your Day with Fresh, Healthy Choices!
                </h2>
                <div className='flex justify-center'>
                    <button className='bg-black text-white px-3 py-2 md:py-3 md:px-8 md:text-2xl lg:text-2xl lg:px-16 font-semibold hover:bg-sky-400 hover:text-black transition-colors duration-500 '
                    onClick={()=>{navigate('recipes/healthy-food')}}
                    >Explore Healthy Food</button>
                </div>
            </div>
    
            <div>
                <img src={Salad}className='h-56 w-80 md:h-72 lg:h-80 lg:w-96'/>
            </div>
        </div>
    </>
  )
}
