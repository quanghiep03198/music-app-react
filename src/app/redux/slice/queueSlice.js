import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
	name: "queue",
	initialState: [],
	reducers: {
		addToQueue: (state, action) => {
			return [action.payload, ...state];
		},
		removeFromQueue: (state, action) => {
			return state.filter((track) => track._id !== action.payload._id);
		},
	},
});
export const { addToQueue, removeFromQueue } = queueSlice.actions;
export default queueSlice;
