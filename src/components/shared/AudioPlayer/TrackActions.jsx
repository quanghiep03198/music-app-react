import ErrorBoundary from "@/components/customs/ErrorBoundary";
import { useEffect, useId, useState } from "react";
import { BsHeart, BsHeartFill, BsVolumeUp } from "react-icons/bs";
import { HiOutlineQueueList } from "react-icons/hi2";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import Range from "../Atomics/Range";
import Swap from "../Atomics/Swap";
const ActionsGroup = tw.div`flex justify-end items-center gap-3 basis-1/4 sm:flex-none md:flex-none `;
const VolumeController = tw.div`flex items-center self-center gap-2 sm:hidden md:hidden`;

const TrackActions = ({ audioRef }) => {
	const [volume, setVolume] = useState(0);
	const inputId = useId();
	useEffect(() => {
		setVolume(audioRef.current.volume);
	}, [audioRef]);

	const adjustVolume = (e) => {
		setVolume(e.target.value);
		audioRef.current.volume = e.target.value;
	};
	return (
		<ErrorBoundary>
			<ActionsGroup>
				<VolumeController>
					<label htmlFor="volume-range" className="text-xl" id={inputId}>
						<BsVolumeUp />
					</label>
					<Range value={volume} step={0.01} max={1} onChange={adjustVolume} id="volume-range" />
				</VolumeController>
				<Swap swapOff={<BsHeart />} swapOn={<BsHeartFill className="text-accent" />} />
				<Link to="/queue">
					<HiOutlineQueueList className="text-xl" />
				</Link>
			</ActionsGroup>
		</ErrorBoundary>
	);
};

export default TrackActions;
