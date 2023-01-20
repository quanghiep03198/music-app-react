import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
	name: "queue",
	initialState: { currentTrack: null, currentPlaylist: null, nextup: null },
	reducers: {
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload;
			return state;
		},
		setCurrentPlaylist: (state, action) => {
			state.nextup = action.payload.tracks;
			state.currentPlaylist = action.payload._id;
			state.currentTrack = action.payload.tracks[0];
		},
		addToQueue: (state, action) => {
			state.nextup = [action.payload, [...state.nextup]];
		},
		removeFromQueue: (state, action) => {
			state.nextup = state.nextup.filter((track) => track._id !== action.payload._id);
		},
	},
});

export const { addToQueue, removeFromQueue, setCurrentTrack, setCurrentPlaylist } = queueSlice.actions;
export default queueSlice;
