import { logout } from "@/redux/reducers/authSlice"
import { createContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const AppContext = createContext()
const AppProvider = ({ children }) => {
    const [playState, setPlayState] = useState(false)
    const [searchResult, setSearchResult] = useState(null)
    const [trackToEditPlaylist, setTrackToEditPlaylist] = useState(null)
    return (
        <AppContext.Provider
            value={{
                playState,
                setPlayState,
                searchResult,
                setSearchResult,
                trackToEditPlaylist,
                setTrackToEditPlaylist
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
