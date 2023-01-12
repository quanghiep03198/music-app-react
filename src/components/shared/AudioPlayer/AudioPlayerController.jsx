import { AppContext } from "@/components/context/AppProvider";
import timer from "@/utils/timer";
import { useContext, useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";

import {
	BsArrowRepeat,
	BsPauseCircle,
	BsPlayCircle,
	BsShuffle,
	BsSkipBackwardFill,
	BsSkipForwardFill,
} from "react-icons/bs";
import { TbRepeat } from "react-icons/tb";
import InputRange from "../Atoms/InputRange";
import Swap from "../Atoms/Swap";

const AudioControllerWrapper = tw.div`flex flex-col gap-5 justify-center items-center flex-1 `;
const AudioButton = tw.button`btn btn-ghost hover:bg-transparent text-2xl`;
const RepeatIcon = tw.i`bi bi-repeat`;
const ShuffleIcon = tw.i`bi bi-shuffle`;
const AudioPlayerController = ({ audioRef }) => {
	const { playState, setPlayState, currentTrack } = useContext(AppContext);
	const [currentTime, setCurrentTime] = useState(0);
	const inputRangeProcessRef = useRef(null);

	const [intervalState, setIntervalState] = useState();

	useEffect(() => {
		playState ? audioRef.current.play() : audioRef.current.pause();
		inputRangeProcessRef.current.value = audioRef.current.currentTime;
		if (playState) {
			const currentInterval = setInterval(() => {
				setCurrentTime(audioRef.current.currentTime);
				inputRangeProcessRef.current.value = audioRef.current.currentTime;
			}, 1);
			setIntervalState(currentInterval);
		} else {
			clearInterval(intervalState);
		}
	}, [playState]);

	const togglePlay = (e) => {
		setPlayState(e.target.checked);
	};

	const getCurrentDuration = () => {
		audioRef.current.currentTime = inputRangeProcessRef.current.value;
	};
	const handleOnEnded = () => {
		// if loop -> replay
		// if queue -> change to next song
		// if no track in queue -> reset
	};
	return (
		<AudioControllerWrapper>
			{/* audio range process */}
			<div className="flex min-w-full items-center justify-center gap-3 ">
				<span>{timer(currentTime)}</span>
				<InputRange
					step={1}
					className="w-[-webkit-fill-available]"
					inputRef={inputRangeProcessRef}
					value={audioRef.current?.currentTime}
					max={currentTrack?.duration}
					handleChange={getCurrentDuration}
				/>
				<span>{currentTrack?.duration ? timer(currentTrack?.duration) : timer(0)}</span>
			</div>

			{/* audio player controllers */}
			<div className="flex items-center">
				<Swap
					swapOn={<BsShuffle className="text-accent" />}
					swapOff={<BsShuffle className="text-base-content" />}
					tw="text-xl btn btn-ghost hover:bg-transparent"
				/>
				<AudioButton>
					<BsSkipBackwardFill />
				</AudioButton>
				<Swap
					swapOff={<BsPlayCircle />}
					swapOn={<BsPauseCircle />}
					tw="swap-rotate btn btn-ghost btn-circle hover:bg-transparent text-4xl"
					checked={playState}
					handleChange={togglePlay}
				/>
				<AudioButton>
					<BsSkipForwardFill />
				</AudioButton>
				<Swap
					swapOn={<RepeatIcon className=" text-accent" />}
					swapOff={<RepeatIcon className="text-base-content" />}
					tw="btn btn-ghost text-xl hover:bg-transparent"
				/>
			</div>

			<audio src={currentTrack?.trackSrc} className="invisible fixed" onEnded={handleOnEnded} ref={audioRef}></audio>
		</AudioControllerWrapper>
	);
};

export default AudioPlayerController;
