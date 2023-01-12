import timer from "@/utils/timer";
import React, { useContext, useEffect, useState } from "react";
import {
	BsHeart,
	BsPause,
	BsPauseFill,
	BsPlay,
	BsPlayBtnFill,
	BsPlayFill,
	BsPlus,
	BsPlusLg,
	BsSubtract,
	BsThreeDots,
} from "react-icons/bs";
import tw from "tailwind-styled-components";
import Swap from "@/components/shared/Atoms/Swap";
import SoundWave from "./SoundWave";
import { AppContext } from "@/components/context/AppProvider";
import formatNumber from "@/utils/formatNumber";
import Dropdown from "../Atoms/Dropdown";
import { Menu, MenuItem } from "../Atoms/Menu";
import { addToQueue, removeFromQueue } from "@/app/redux/slice/queueSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineMinus } from "react-icons/hi2";

export const TrackCardRow = tw.tr`group hover:bg-zinc-400/10 hover:duration-300 rounded-row`;
export const TrackCardCell = tw.td`p-2`;
const PlayButton = tw.button`btn btn-circle btn-accent hidden group-hover:inline-flex text-xl `;
const TrackIndex = tw.span`group-hover:hidden w-full`;

const TrackCard = ({ index, track }) => {
	const { playState, setPlayState, setCurrentTrack, currentTrack } = useContext(AppContext);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isInQueue, setIsInQueue] = useState();

	const dispatch = useDispatch();
	const tracksInQueue = useSelector((state) => state.queue);

	useEffect(() => {
		const isExisted = tracksInQueue.find((item) => item._id === track._id) !== undefined;
		setIsInQueue(isExisted);
		if (currentTrack?._id !== track?._id) {
			setIsPlaying(false);
		} else {
			setIsPlaying(playState);
		}
	}, [currentTrack, playState]);

	console.log(track.title, isInQueue);
	const playTrack = (track) => {
		setIsPlaying(!isPlaying);
		setPlayState(!isPlaying);
		setCurrentTrack(track);
	};
	const handleAddToQueue = () => {
		dispatch(addToQueue(track));
		setIsInQueue(true);
	};

	const handleRemoveFromQueue = () => {
		dispatch(removeFromQueue(track));
		setIsInQueue(false);
	};

	return (
		<TrackCardRow>
			<TrackCardCell className="w-20">
				<div className="relative text-center">
					<SoundWave track={track} isPlaying={isPlaying && playState} />
					{!isPlaying && <TrackIndex>{index}</TrackIndex>}
					<PlayButton onClick={() => playTrack(track)}>{isPlaying ? <BsPauseFill /> : <BsPlayFill />}</PlayButton>
				</div>
			</TrackCardCell>
			<TrackCardCell colSpan={2}>
				<div className="flex items-center gap-2">
					<img src={track?.thumbnail} className="h-14 w-14 rounded-md" />
					<div>
						<h5>{track.title}</h5>
						<p>{track.artists.map((artist) => artist.name).join(", ")}</p>
					</div>
				</div>
			</TrackCardCell>
			<TrackCardCell>{track.album?.title ?? ""}</TrackCardCell>
			<TrackCardCell className="sm:hidden">{formatNumber(track.listen)}</TrackCardCell>
			<TrackCardCell className="sm:hidden">{timer(track.duration)}</TrackCardCell>
			<TrackCardCell>
				<Dropdown dropdownButtonElement={<BsThreeDots />}>
					<Menu tw="bg-base-300">
						<MenuItem>
							<BsHeart /> Save to your library
						</MenuItem>
						{isInQueue ? (
							<MenuItem handleClick={handleRemoveFromQueue}>
								<HiOutlineMinus /> Remove from queue
							</MenuItem>
						) : (
							<MenuItem handleClick={handleAddToQueue}>
								<BsPlusLg /> Add to queue
							</MenuItem>
						)}
					</Menu>
				</Dropdown>
			</TrackCardCell>
		</TrackCardRow>
	);
};

export default TrackCard;
