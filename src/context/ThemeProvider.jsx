import useLocalStorage from "@/hooks/useLocalStorage"
import { createContext, useState } from "react"

export const ThemeContext = createContext(false)

const ThemeProvider = ({ children }) => {
   const [isDarkTheme, setTheme] = useLocalStorage("dark-theme", true)

   return <ThemeContext.Provider value={{ isDarkTheme, setTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
