import { setCurrentTrack } from "@/app/redux/slice/queueSlice";
import { AppContext } from "@/context/AppProvider";
import { useContext, useState } from "react";
import { BsPauseCircle, BsPlayCircle, BsShuffle, BsSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import Button from "../Atomics/Button";
import Swap from "../Atomics/Swap";
const AudioButton = tw.button`btn btn-ghost hover:bg-transparent text-2xl w-fit`;
const RepeatIcon = tw.i`bi bi-repeat`;

const AudioButtonGroup = ({ handleLoopStateChange, loopState }) => {
	const { playState, setPlayState } = useContext(AppContext);

	const { nextup } = useSelector((state) => state.queue);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
	const [shuffleState, setShuffleState] = useState(false);

	const dispatch = useDispatch();
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
			newIndex = Math.floor(Math.random() * nextup.length);
			let currentIndex = nextup.findIndex((track) => track._id === currentTrack._id);
			while (currentIndex === newIndex) {
				newIndex = Math.floor(Math.random() * nextup.length);
			}
		} else {
			newIndex = currentTrackIndex + increasedValue;
			if (newIndex < 0) newIndex = nextup.length - 1;
			if (newIndex > nextup.length - 1) newIndex = 0;
		}
		setCurrentTrackIndex(newIndex);
		dispatch(setCurrentTrack(nextup[newIndex]));
		setPlayState(true);
	};
	return (
		<div className="flex items-center">
			<Swap
				swapOn={<BsShuffle className="text-success" />}
				swapOff={<BsShuffle />}
				tw="text-xl w-fit"
				checked={shuffleState}
				onChange={handleToggleShuffle}
			/>
			<Button color="transparent" className="text-2xl" onClick={() => changeTrack(-1)}>
				<BsSkipBackwardFill />
			</Button>
			<Swap
				swapOff={<BsPlayCircle />}
				swapOn={<BsPauseCircle />}
				tw="swap-rotate btn btn-ghost btn-circle hover:bg-transparent text-4xl w-fit"
				checked={playState}
				onChange={togglePlay}
			/>
			<Button color="transparent" className="text-2xl" onClick={() => changeTrack(1)}>
				<BsSkipForwardFill />
			</Button>
			<Swap
				swapOn={<RepeatIcon className="text-success" />}
				swapOff={<RepeatIcon className="text-base-content" />}
				tw="text-xl w-fit"
				checked={loopState}
				onChange={toggleLoop}
			/>
		</div>
	);
};

export default AudioButtonGroup;
