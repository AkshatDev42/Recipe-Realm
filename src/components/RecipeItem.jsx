import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

export default function RecipeItem({name, image, id}) {
  const {dark} = useTheme()
  const navigate = useNavigate()
  return (
    <>
    <div className={`h-56 lg:h-80 w-80 md:h-72 md:w-2/5 lg:w-2/5 rounded-xl shadow-md transition-colors duration-500 ${dark?'shadow-white bg-gray-600 hover:bg-gray-800 text-white bg':'shadow-gray-500 hover:bg-gray-300'} cursor-pointer`}
    onClick={()=>{navigate(`recipe/${id}`)}}
    >
      <div className='h-56 md:h-72 lg:h-80 rounded-2xl overflow-hidden'>
        <div className='h-2/3 lg:h-3/4 md:h-3/4 bg-cover bg-center' style={{backgroundImage: `url(${image})`}}>
        </div>
        <div className='h-1/3 lg:h-1/4 md:h-1/4 flex flex-col justify-center items-center py-2 text-center'>
          <h2 className={`font-semibold ${name.length > 30? 'sm:text-sm md:text-xl':'text-xl'}`}>
            {name}
          </h2>
          <div className='text-sm'>
            Click to View Recipe
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
