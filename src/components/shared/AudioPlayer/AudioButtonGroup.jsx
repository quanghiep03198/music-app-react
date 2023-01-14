import { addToQueue } from "@/app/redux/slice/queueSlice";
import store from "@/app/redux/store";
import { AppContext } from "@/components/context/AppProvider";
import { useContext, useEffect, useMemo, useState } from "react";
import { BsPauseCircle, BsPlayCircle, BsShuffle, BsSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import Swap from "../Atomics/Swap";
const AudioButton = tw.button`btn btn-ghost hover:bg-transparent text-2xl w-fit`;
const RepeatIcon = tw.i`bi bi-repeat`;

const AudioButtonGroup = ({ handleLoopStateChange, loopState }) => {
	const { playState, setPlayState, setCurrentTrack, currentTrack } = useContext(AppContext);

	const queue = useSelector((state) => state.queue);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
	const [shuffleState, setShuffleState] = useState(false);
	// const [loopState, setLoopState] = useState(false);

	// play/pause
	const togglePlay = (e) => {
		setPlayState(e.target.checked);
	};

	// loop
	const toggleLoop = (e) => {
		handleLoopStateChange(e.target.checked);
	};

	// shuffle play
	const handleToggleShuffle = (e) => {
		setShuffleState(e.target.checked);
	};

	const changeTrack = (increasedValue) => {
		let newIndex;
		if (shuffleState) {
			newIndex = Math.floor(Math.random() * queue.length);
			let currentIndex = queue.findIndex((track) => track._id === currentTrack._id);
			while (currentIndex === newIndex) {
				newIndex = Math.floor(Math.random() * queue.length);
			}
		} else {
			newIndex = currentTrackIndex + increasedValue;
			if (newIndex < 0) newIndex = queue.length - 1;
			if (newIndex > queue.length - 1) newIndex = 0;
		}
		setCurrentTrackIndex(newIndex);
		setCurrentTrack(queue[newIndex]);
		setPlayState(true);
	};
	return (
		<div className="flex items-center">
			<Swap
				swapOn={<BsShuffle className="text-success" />}
				swapOff={<BsShuffle />}
				tw="text-xl w-fit"
				checked={shuffleState}
				onHandleChange={handleToggleShuffle}
			/>
			<AudioButton onClick={() => changeTrack(-1)}>
				<BsSkipBackwardFill />
			</AudioButton>
			<Swap
				swapOff={<BsPlayCircle />}
				swapOn={<BsPauseCircle />}
				tw="swap-rotate btn btn-ghost btn-circle hover:bg-transparent text-4xl w-fit"
				checked={playState}
				onHandleChange={togglePlay}
			/>
			<AudioButton onClick={() => changeTrack(1)}>
				<BsSkipForwardFill />
			</AudioButton>
			<Swap
				swapOn={<RepeatIcon className="text-success" />}
				swapOff={<RepeatIcon className="text-base-content" />}
				tw="text-xl w-fit"
				checked={loopState}
				onHandleChange={toggleLoop}
			/>
		</div>
	);
};

export default AudioButtonGroup;
