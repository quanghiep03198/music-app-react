import { createContext, useReducer, useState } from "react"

/**
 * @enum
 */
export const ModalActionEnum = {
   TOGGLE_CREATE_PLAYLIST_MODAL: 1,
   TOGGLE_COLLECTION_MODAL: 2,
   TOGGLE_UPLOAD_MODAL: 3
}

const modalsInitialState = {
   uploadModalState: false,
   collectionModalState: false,
   createPlaylistModalState: false
}
export const modalReducer = (state, action) => {
   switch (action.type) {
      case ModalActionEnum.TOGGLE_UPLOAD_MODAL:
         return { ...state, uploadModalState: !state.uploadModalState }
      case ModalActionEnum.TOGGLE_COLLECTION_MODAL:
         return { ...state, collectionModalState: !state.playlistModalState }
      case ModalActionEnum.TOGGLE_CREATE_PLAYLIST_MODAL:
         return { ...state, createPlaylistModalState: !state.createPlaylistModalState }
   }
}

export const AppContext = createContext()
const AppProvider = ({ children }) => {
   const [playState, setPlayState] = useState(false)
   const [searchResult, setSearchResult] = useState(null)
   const [trackToEditPlaylist, setTrackToEditPlaylist] = useState(null)
   const [modalStates, dispatch] = useReducer(modalReducer, modalsInitialState)

   return (
      <AppContext.Provider
         value={{
            playState,
            setPlayState,
            searchResult,
            setSearchResult,
            trackToEditPlaylist,
            setTrackToEditPlaylist,
            modalStates,
            handleToggleModal: dispatch
         }}>
         {children}
      </AppContext.Provider>
   )
}

export default AppProvider
