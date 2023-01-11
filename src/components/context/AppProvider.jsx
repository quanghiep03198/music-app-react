import instance from "@/app/axios/instance";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();
const AppProvider = ({ children }) => {
	const [currentTrack, setCurrentTrack] = useState();
	const [playState, setPlayState] = useState(false);
	useEffect(() => {
		(async () => {
			const [track] = await instance.get(import.meta.env.VITE_BASE_URL + "/track?limit=1");
			setCurrentTrack(track);
		})();
	}, []);
	return (
		<AppContext.Provider value={{ playState, setPlayState, currentTrack, setCurrentTrack }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
