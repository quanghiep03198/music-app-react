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
            state.currentPlaylist = action.payload._id || "unknown"
            state.currentTrack = action.payload.tracks[0]
        },
        addToQueue: (state, action) => {
            Array.isArray(action.payload)
                ? (state.nextup = state.nextup.concat(action.payload))
                : [action.payload, [...state.nextup]]
        },
        removeFromQueue: (state, action) => {
            state.nextup = state.nextup.filter(
                (track) => track._id !== action.payload._id
            )
        }
    }
})

export const {
    addToQueue,
    removeFromQueue,
    setCurrentTrack,
    setCurrentPlaylist
} = queueSlice.actions
export default queueSlice