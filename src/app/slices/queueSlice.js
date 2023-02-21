import { createSlice } from "@reduxjs/toolkit"

const queueSlice = createSlice({
    name: "queue",
    initialState: { currentTrack: null, currentPlaylist: null, nextup: [] },
    reducers: {
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload
        },
        setCurrentPlaylist: (state, action) => {
            state.nextup = action.payload.tracks
            state.currentPlaylist = action.payload.listId
            state.currentTrack = action.payload.tracks[0]
        },
        addToQueue: (state, action) => {
            state.nextup = Array.isArray(action.payload) ? state.nextup.concat(action.payload) : [action.payload, ...state.nextup]
        },
        removeFromQueue: (state, action) => {
            console.log(action.payload)
            state.nextup = state.nextup.filter((track) => track._id !== action.payload._id)
            return state
        }
    }
})

export const { addToQueue, removeFromQueue, setCurrentTrack, setCurrentPlaylist } = queueSlice.actions
export default queueSlice
