import React,{createContext,useState,useContext} from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({children}) =>{
    const [dark,setDark] = useState(false)
     const toggleTheme = () =>{
        setDark((prevTheme) => prevTheme === false? true:false)
     }
     return <ThemeContext.Provider value={{dark,toggleTheme}}>{children}</ThemeContext.Provider>
}

export const useTheme = () =>{
    return useContext(ThemeContext)
}