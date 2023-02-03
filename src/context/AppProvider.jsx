import { logout } from "@/app/slices/authSlice"
import { createContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const AppContext = createContext()
const AppProvider = ({ children }) => {
    const [playState, setPlayState] = useState(false)
    const [searchResult, setSearchResult] = useState(null)
    const { authenticated } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!authenticated) {
            dispatch(logout())
        }
    }, [authenticated])
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
