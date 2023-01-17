import React, { createContext, useEffect, useRef, useState } from "react";
export const AudioContext = createContext(null);
const AudioProvider = ({ children }) => {
	const audioRef = useRef(null);
	const seekBarRef = useRef(null);
	const volumeRef = useRef(null);
	const [audioRefState, setAudioRefState] = useState(null);
	const [seekBarRefState, setSeekBarRefState] = useState(null);
	const [volumeRefState, setVolumeRefState] = useState(null);
	useEffect(() => {
		if (!audioRef.current || !seekBarRef.current || !volumeRef.current) return;
		setAudioRefState(audioRef);
		setSeekBarRefState(seekBarRef);
		setVolumeRefState(volumeRef);
	}, [audioRef, seekBarRef, volumeRef]);
	console.log(audioRef);
	return (
		<AudioContext.Provider value={{ audioRefState, seekBarRefState, volumeRefState }}>{children}</AudioContext.Provider>
	);
};

export default AudioProvider;
