import { AppContext } from "@/components/context/AppProvider";
import timer from "@/utils/timer";
import { useContext, useEffect, useRef, useState } from "react";
import InputRange from "../Atomics/InputRange";

const AudioSeekBar = ({ audioRef }) => {
	const { playState } = useContext(AppContext);
	const { currentTrack } = useContext(AppContext);
	const [currentTime, setCurrentTime] = useState(0);
	const inputRangeProcessRef = useRef(null);

	const [intervalState, setIntervalState] = useState();

	useEffect(() => {
		inputRangeProcessRef.current.value = audioRef.current.currentTime;
		if (playState && audioRef.current) {
			const currentInterval = setInterval(() => {
				setCurrentTime(audioRef.current.currentTime);
				inputRangeProcessRef.current.value = audioRef.current.currentTime;
			}, 1);
			setIntervalState(currentInterval);
		} else {
			clearInterval(intervalState);
		}
	}, [playState, currentTrack]);

	const getCurrentDuration = () => {
		audioRef.current.currentTime = inputRangeProcessRef.current.value;
		setCurrentTime(audioRef.current.currentTime);
	};

	return (
		<div className="flex min-w-full items-center justify-center gap-3 ">
			<span>{timer(currentTime)}</span>
			<InputRange
				step={1}
				className="w-[-webkit-fill-available]"
				inputRef={inputRangeProcessRef}
				max={currentTrack?.duration}
				handleChange={getCurrentDuration}
			/>
			<span>{currentTrack?.duration ? timer(currentTrack?.duration) : timer(0)}</span>
		</div>
	);
};

export default AudioSeekBar;
