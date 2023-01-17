import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
	name: "queue",
	initialState: { currentTrack: null, nextup: null },
	reducers: {
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload;
			return state;
		},
		setCurrentPlaylist: (state, action) => {
			state.nextup = action.payload;
			// state.currentTrack = [action.payload];
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
