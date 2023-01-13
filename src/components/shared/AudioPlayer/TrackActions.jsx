import React, { useEffect, useId, useRef } from "react";
import { BsHeart, BsHeartFill, BsVolumeUp } from "react-icons/bs";
import { HiOutlineQueueList } from "react-icons/hi2";
import { Link } from "react-router-dom";
import InputRange from "../Atomics/InputRange";
import Swap from "../Atomics/Swap";
import tw from "tailwind-styled-components";

const ActionsGroup = tw.div`flex justify-end items-center gap-5 order-2 xl:order-3 xxl:order-3`;
const VolumeController = tw.div`flex justify-end items-center self-center gap-2 sm:hidden md:hidden`;

const TrackActions = ({ audioRef }) => {
	const volumeInputRef = useRef(null);
	const inputId = useId();
	useEffect(() => {
		volumeInputRef.current.value = audioRef.current.volume * 100;
	}, []);

	const adjustVolume = () => {
		audioRef.current.volume = volumeInputRef.current.value / 100;
	};
	return (
		<ActionsGroup>
			<VolumeController>
				<label htmlFor="volume" className="text-xl" id={inputId}>
					<BsVolumeUp />
				</label>
				<InputRange inputRef={volumeInputRef} max={100} handleChange={adjustVolume} labelRef={inputId} />
			</VolumeController>
			<Swap swapOff={<BsHeart />} swapOn={<BsHeartFill className="text-accent" />} />
			<Link to="/queue">
				<HiOutlineQueueList />
			</Link>
		</ActionsGroup>
	);
};

export default TrackActions;
