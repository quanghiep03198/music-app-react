import instance from "@/app/axios/instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const fetchRelatedTrackThunkAction = createAsyncThunk(
	"queue/fetch_related_tracks",
	async (genre, { rejectWithValue }) => {
		try {
			return await instance.get(`/track/related/${genre}`);
		} catch (error) {
			rejectWithValue([]);
		}
	},
);
const queueSlice = createSlice({
	name: "queue",
	initialState: { currentTrack: null, nextup: [] },
	reducers: {
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload;
		},
		setCurrentPlaylist: (state, action) => {
			state.nextup = action.payload;
			state.currentTrack = [action.payload];
		},
		addToQueue: (state, action) => {
			state.nextup = [action.payload, ...state.nextup];
		},
		removeFromQueue: (state, action) => {
			return state.filter((track) => track._id !== action.payload._id);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRelatedTrackThunkAction.fulfilled, (state, action) => {
			state.nextup = action.payload;
		});
	},
});

export { fetchRelatedTrackThunkAction };
export const { addToQueue, removeFromQueue, setCurrentTrack, setCurrentPlaylist } = queueSlice.actions;
export default queueSlice;
