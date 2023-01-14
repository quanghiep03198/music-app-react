import timer from "@/utils/timer";
import React, { useContext, useEffect, useState } from "react";
import {
	BsClock,
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
import Swap from "@/components/shared/Atomics/Swap";
import SoundWave from "./SoundWave";
import { AppContext } from "@/components/context/AppProvider";
import formatNumber from "@/utils/formatNumber";
import Dropdown from "../Atomics/Dropdown";
import { Menu, MenuItem } from "../Atomics/Menu";
import { addToQueue, removeFromQueue } from "@/app/redux/slice/queueSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineMinus } from "react-icons/hi2";

export const TrackCardRow = tw.tr`group hover:bg-zinc-400/10 hover:duration-300 rounded-row`;
export const TrackCardCell = tw.td`p-2`;
const PlayButton = tw.button`btn btn-circle btn-success hidden group-hover:inline-flex text-xl `;
const TrackIndex = tw.span`group-hover:hidden w-full`;

const TrackCard = ({ index, track }) => {
	const { playState, setPlayState, setCurrentTrack, currentTrack } = useContext(AppContext);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isCurrentTrack, setIsCurrentTrack] = useState(false);

	const [isInQueue, setIsInQueue] = useState();

	const dispatch = useDispatch();
	const tracksInQueue = useSelector((state) => state.queue);

	useEffect(() => {
		const isExisted = tracksInQueue.find((item) => item._id === track._id) !== undefined;
		setIsInQueue(isExisted);
		let isCurrentTrack = currentTrack?._id === track?._id;
		setIsPlaying(isCurrentTrack && playState);
		setIsCurrentTrack(isCurrentTrack);
	}, [currentTrack, playState]);

	const togglePlay = (track) => {
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
		<TrackCardRow className={isCurrentTrack && "bg-zinc-400/10"}>
			<TrackCardCell className="w-20">
				<div className="relative text-center">
					<SoundWave track={track} isPlaying={isPlaying && playState} />
					{!isPlaying && <TrackIndex>{index}</TrackIndex>}
					<PlayButton onClick={() => togglePlay(track)}>{isPlaying ? <BsPauseFill /> : <BsPlayFill />}</PlayButton>
				</div>
			</TrackCardCell>
			<TrackCardCell colSpan={2}>
				<div className="flex items-center gap-2">
					<img src={track?.thumbnail} className="h-14 w-14 rounded-md" />
					<div>
						<h5>{track?.title}</h5>
						<p>{Array.isArray(track.artists) && track.artists.map((artist) => artist.name).join(", ")}</p>
					</div>
				</div>
			</TrackCardCell>
			<TrackCardCell className="sm:hidden">{track.album?.title ?? ""}</TrackCardCell>
			<TrackCardCell className="sm:hidden">
				<div className="flex items-center gap-2">
					<BsPlayFill /> {formatNumber(track?.listen)}
				</div>
			</TrackCardCell>
			<TrackCardCell className="sm:hidden">
				<div className="flex items-center gap-2">
					<BsClock /> {timer(track?.duration)}
				</div>
			</TrackCardCell>
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
