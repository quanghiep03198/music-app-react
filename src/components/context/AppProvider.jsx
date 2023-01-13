import instance from "@/app/axios/instance";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const AppContext = createContext();
const AppProvider = ({ children }) => {
	const [currentTrack, setCurrentTrack] = useState();
	const [playState, setPlayState] = useState(false);

	return (
		<AppContext.Provider value={{ playState, setPlayState, currentTrack, setCurrentTrack }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
