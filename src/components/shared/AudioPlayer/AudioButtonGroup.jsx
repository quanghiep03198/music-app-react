import { AppContext } from "@/components/context/AppProvider";
import { useContext, useState } from "react";
import { BsPauseCircle, BsPlayCircle, BsShuffle, BsSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import Swap from "../Atomics/Swap";
const AudioButton = tw.button`btn btn-ghost hover:bg-transparent text-2xl w-fit`;
const RepeatIcon = tw.i`bi bi-repeat`;
const AudioButtonGroup = () => {
	const { playState, setPlayState, setCurrentTrack } = useContext(AppContext);
	const queue = useSelector((state) => state.queue);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
	const [isShuffle, setIsShuffle] = useState(false);
	const togglePlay = (e) => {
		setPlayState(e.target.checked);
	};

	const changeToPreviousTrack = () => {
		setCurrentTrackIndex((prev) => prev - 1);
		if (currentTrackIndex < 1) {
			setCurrentTrackIndex(queue.length - 1);
		}
		setCurrentTrack(queue[currentTrackIndex]);
		console.log("ahihhi :>>", currentTrackIndex, queue[currentTrackIndex]);
	};
	const changeToNextTrack = () => {
		setCurrentTrackIndex((prev) => prev + 1);
		if (currentTrackIndex >= queue.length - 1) {
			setCurrentTrackIndex(0);
		}
		console.log("current track :>>", currentTrackIndex, queue[currentTrackIndex]);
		setCurrentTrack(queue[currentTrackIndex]);
	};
	return (
		<div className="flex items-center">
			<Swap swapOn={<BsShuffle className="text-success" />} swapOff={<BsShuffle />} tw="text-xl w-fit" />
			<AudioButton onClick={changeToPreviousTrack}>
				<BsSkipBackwardFill />
			</AudioButton>
			<Swap
				swapOff={<BsPlayCircle />}
				swapOn={<BsPauseCircle />}
				tw="swap-rotate btn btn-ghost btn-circle hover:bg-transparent text-4xl w-fit"
				checked={playState}
				handleChange={togglePlay}
			/>
			<AudioButton onClick={changeToNextTrack}>
				<BsSkipForwardFill />
			</AudioButton>
			<Swap
				swapOn={<RepeatIcon className="text-success" />}
				swapOff={<RepeatIcon className="text-base-content" />}
				tw="text-xl w-fit"
			/>
		</div>
	);
};

export default AudioButtonGroup;
