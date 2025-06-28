import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useLocation } from 'react-router-dom'

export default function Padding({children}) {
    const {dark} = useTheme()
    const location = useLocation()
  return (
    <div className={`sticky top-0 left-0 pt-16 w-screen ${dark?'bg-slate-400':''} ${dark&&location.pathname.includes('/recipe/')?'bg-slate-500':''}`}>{children}</div>
  )
}
