import { addToQueue, removeFromQueue, setCurrentTrack } from "@/app/redux/slice/queueSlice";
import { AppContext } from "@/components/context/AppProvider";
import formatNumber from "@/utils/formatNumber";
import timer from "@/utils/timer";
import { useContext, useEffect, useState } from "react";
import { BsClock, BsHeart, BsPauseFill, BsPlayFill, BsPlusLg, BsThreeDots } from "react-icons/bs";
import { HiOutlineMinus } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import Dropdown from "../Atomics/Dropdown";
import { Menu, MenuItem } from "../Atomics/Menu";
import SoundWave from "./SoundWave";

export const TrackCardRow = tw.div`group track-card`;
export const TrackCardCell = tw.div`p-2 `;
const PlayButton = tw.button`btn btn-ghost btn-circle hover:bg-transparent hidden group-hover:inline-flex text-xl`;
const TrackIndex = tw.span`group-hover:hidden w-full`;

const TrackCard = ({ index, track }) => {
	const { playState, setPlayState } = useContext(AppContext);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isCurrentTrack, setIsCurrentTrack] = useState(false);

	const [isInQueue, setIsInQueue] = useState();

	const dispatch = useDispatch();
	const { currentTrack, nextup } = useSelector((state) => state.queue);

	useEffect(() => {
		const isExisted = nextup.find((item) => item._id === track._id) !== undefined;
		setIsInQueue(isExisted);
		let isCurrentTrack = currentTrack?._id === track?._id;
		setIsPlaying(isCurrentTrack && playState);
		setIsCurrentTrack(isCurrentTrack);
	}, [currentTrack, playState]);

	const togglePlay = (track) => {
		setIsPlaying(!isPlaying);
		setPlayState(!isPlaying);
		dispatch(setCurrentTrack(track));
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
		<TrackCardRow className={isCurrentTrack && "bg-zinc-400/20"}>
			<TrackCardCell className="basis-1/12 sm:basis-1/6">
				<div className="relative text-center">
					<SoundWave track={track} isPlaying={isPlaying && playState} />
					{!isPlaying && <TrackIndex>{index}</TrackIndex>}
					<PlayButton onClick={() => togglePlay(track)}>{isPlaying ? <BsPauseFill /> : <BsPlayFill />}</PlayButton>
				</div>
			</TrackCardCell>
			<TrackCardCell className="basis-1/2 sm:basis-full">
				<div className="flex items-center gap-2">
					<img src={track?.thumbnail} className="h-14 w-14 rounded-md" loading="lazy" />
					<div>
						<h5 className="truncate">{track?.title}</h5>
						<p>{Array.isArray(track.artists) && track.artists.map((artist) => artist.name).join(", ")}</p>
					</div>
				</div>
			</TrackCardCell>
			<TrackCardCell className="basis-1/4 sm:hidden">{track.album?.title ?? ""}</TrackCardCell>
			<TrackCardCell className="basis-1/4 sm:hidden">
				<div className="flex items-center gap-2">
					<BsPlayFill /> {formatNumber(track?.listen)}
				</div>
			</TrackCardCell>
			<TrackCardCell className="basis-1/4 sm:hidden">
				<div className="flex items-center gap-2">
					<BsClock /> {timer(track?.duration)}
				</div>
			</TrackCardCell>
			<TrackCardCell className="basis-1/12 ">
				<Dropdown dropdownButtonElement={<BsThreeDots />} gap={6}>
					<Menu tw="bg-base-300 rounded-lg">
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
