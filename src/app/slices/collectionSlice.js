import { createSlice } from "@reduxjs/toolkit"
import collectionApi from "../services/collectionApi"
import playlistApi from "../services/playlistApi"

const initialState = {
    tracks: [],
    albums: [],
    artists: [],
    playlists: []
}
const collectionSlice = createSlice({
    name: "collection",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(collectionApi.endpoints.fetchTrackCollection.matchFulfilled, (state, { payload }) => {
            state.tracks = payload
        })
        builder.addMatcher(collectionApi.endpoints.fetchArtistsCollection.matchFulfilled, (state, { payload }) => {
            state.artists = payload
            return state
        })
        builder.addMatcher(collectionApi.endpoints.fetchAlbumsCollection.matchFulfilled, (state, { payload }) => {
            state.albums = payload
        })
        builder.addMatcher(playlistApi.endpoints.fetchUserPlaylists.matchFulfilled, (state, { payload }) => {
            state.playlists = payload
        })
    }
})

export default collectionSlice
