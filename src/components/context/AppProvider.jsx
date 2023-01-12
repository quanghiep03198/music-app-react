import instance from "@/app/axios/instance";
import { addToQueue } from "@/app/redux/slice/queueSlice";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const AppContext = createContext();
const AppProvider = ({ children }) => {
	const [currentTrack, setCurrentTrack] = useState();
	const [playState, setPlayState] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			const [track] = await instance.get(import.meta.env.VITE_BASE_URL + "/track?limit=1");
			setCurrentTrack(track);
			dispatch(addToQueue(track));
		})();
	}, []);
	return (
		<AppContext.Provider value={{ playState, setPlayState, currentTrack, setCurrentTrack }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
