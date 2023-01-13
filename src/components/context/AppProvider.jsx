import instance from "@/app/axios/instance";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const AppContext = createContext();
const AppProvider = ({ children }) => {
	const [currentTrack, setCurrentTrack] = useState();
	const [playState, setPlayState] = useState(false);
	const tracksInQueue = useSelector((state) => state.queue);
	// console.log(data);
	useEffect(() => {
		if (Array.isArray(tracksInQueue) && tracksInQueue.length >= 1) setCurrentTrack(tracksInQueue[0]);
		else {
			instance
				.get(import.meta.env.VITE_BASE_URL + "/track?skip=0&limit=1")
				.then((data) => setCurrentTrack(data))
				.catch((err) => console.log(err));
		}
	}, []);
	return (
		<AppContext.Provider value={{ playState, setPlayState, currentTrack, setCurrentTrack }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
