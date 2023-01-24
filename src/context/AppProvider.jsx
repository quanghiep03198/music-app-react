import { createContext, useState } from "react"

export const AppContext = createContext()
const AppProvider = ({ children }) => {
    const [playState, setPlayState] = useState(false)
    const [searchResult, setSearchResult] = useState(null)
    return (
        <AppContext.Provider
            value={{
                playState,
                setPlayState,
                searchResult,
                setSearchResult
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
