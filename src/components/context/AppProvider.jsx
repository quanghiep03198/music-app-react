import { createContext, useState } from "react";

export const AppContext = createContext();
const AppProvider = ({ children }) => {
	const [playState, setPlayState] = useState(false);
	const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
	return (
		<AppContext.Provider
			value={{
				searchBoxVisibility,
				setSearchBoxVisibility,
				playState,
				setPlayState,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
