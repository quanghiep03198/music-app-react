import { AppContext } from "@/components/context/AppProvider";
import React, { useContext, useState, useRef, useEffect } from "react";
import timer from "@/utils/timer";
import InputRange from "../Atomics/InputRange";
import { useSelector } from "react-redux";
const AudioProcess = ({ audioRef }) => {
	const { playState } = useContext(AppContext);
	const currentTrack = useSelector((state) => state.queue.nowPlaying);
	const [currentTime, setCurrentTime] = useState(0);
	const inputRangeProcessRef = useRef(null);

	const [intervalState, setIntervalState] = useState();

	useEffect(() => {
		playState && audioRef ? audioRef.current.play() : audioRef.current.pause();
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
	};

	return (
		<div className="flex min-w-full items-center justify-center gap-3 ">
			<span>{timer(currentTime)}</span>
			<InputRange
				step={1}
				className="w-[-webkit-fill-available]"
				inputRef={inputRangeProcessRef}
				// value={audioRef.current?.currentTime}
				max={currentTrack?.duration}
				handleChange={getCurrentDuration}
			/>
			<span>{currentTrack?.duration ? timer(currentTrack?.duration) : timer(0)}</span>
		</div>
	);
};

export default AudioProcess;
