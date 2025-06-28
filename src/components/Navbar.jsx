import React, { useState } from 'react'
import logo from '../assets/RecipeFinderLogo.png'
import { FaHome } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaRegMoon } from "react-icons/fa";
import { RiSunFill } from "react-icons/ri";

export default function Navbar() {
    const {dark,toggleTheme} = useTheme()
    const [isOpen,setOpen] = useState(false);
  return (
        <nav className={`w-screen fixed left-0 top-0 z-50 transition-colors duration-700 px-3 ${!dark ? 'bg-white': 'bg-slate-400'}`}>
            <div className='flex items-center justify-between px-4 py-2 lg:px-5'>
                <div className='flex items-center'>
                    <img src={logo} className='h-14 w-14 md:h-18 md:w-18 lg:h-18 lg:w-18'/>
                    <div className='font-lobster text-3xl md:text-4xl lg:text-4xl'>
                        RecipeRealm
                    </div>
                </div>

                {/* Navbar Options for large devices */}
                <div className='hidden lg:block w-1/4 text-lg cursor-pointer'>
                    <ul className='flex justify-between items-center font-semibold'>
                        <NavLink to = '/'><li>Home</li></NavLink>
                        <li>
                        <div className={`h-8 w-16 shadow-sm my-3 ${dark?'shadow-white':'shadow-gray-500'} rounded-full`}
                        onClick={toggleTheme}>
                            <div className={`h-full w-1/2 shadow-md rounded-full ${dark?'translate-x-full shadow-white':'translate-x-0 shadow-gray-400'} transition-all duration-300 flex justify-center items-center`}>
                                {dark?<RiSunFill/>:<FaRegMoon/>}
                            </div>
                        </div>
                        </li>
                    </ul>
                </div>

                {/* Hamburger Icon */}
                <div className={`lg:hidden text-3xl cursor-pointer ${isOpen?'rotate-90':''} transition-transform`} onClick={()=>{
                    setOpen(!isOpen)
                }}>&#9776;</div>
            </div>
            
            {/* Menu For Mobile When Hamburger Icon is Clicked */}
            <div className={`cursor-pointer lg:hidden fixed left-0 h-full w-screen z-40 transform ${isOpen? 'translate-x-0':'-translate-x-full'} transition-transform duration-300 py-5 ${dark?'bg-gray-800':'bg-white '}`}>
                <ul className='text-2xl md:text-3xl px-5'>

                    <li>
                        <div className={`h-10 w-20 shadow-sm my-3 ${dark?'shadow-white':'shadow-gray-500'} rounded-full`}
                        onClick={toggleTheme}>
                            <div className={`h-full w-1/2 shadow-md rounded-full ${dark?'translate-x-full shadow-white':'translate-x-0 shadow-gray-400'} transition-all duration-300 flex justify-center items-center`}>
                                {dark?<RiSunFill/>:<FaRegMoon/>}
                            </div>
                        </div>
                    </li>
                    <Link to='/'><li className={`py-3.5 text-center flex items-center gap-3 ${dark?'active:bg-gray-950':'active:bg-gray-300'}`} onClick={()=>{setOpen(false)}}><FaHome/><span>Home</span></li></Link>
                     </ul>
            </div>
        </nav>
  )
}
