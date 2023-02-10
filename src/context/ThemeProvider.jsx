const { createContext, useState } = require("react")

const ThemeContext = createContext(false)

const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setTheme] = useState(true)

    return <ThemeContext.Provider value={{ isDarkTheme, setTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeContext }
export default ThemeProvider
