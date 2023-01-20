import { createContext, useState } from "react";

export const AppContext = createContext();
const AppProvider = ({ children }) => {
	const [playState, setPlayState] = useState(false);
	return (
		<AppContext.Provider
			value={{
				playState,
				setPlayState,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
