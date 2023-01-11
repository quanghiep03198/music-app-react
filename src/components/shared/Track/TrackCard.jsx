import timer from "@/utils/timer";
import React, { useContext, useEffect, useState } from "react";
import { BsPause, BsPauseFill, BsPlay, BsPlayBtnFill, BsPlayFill, BsThreeDots } from "react-icons/bs";
import tw from "tailwind-styled-components";
import Swap from "@/components/shared/Atoms/Swap";
import SoundWave from "./SoundWave";
import { AppContext } from "@/components/context/AppProvider";
import formatNumber from "@/utils/formatNumber";
import Dropdown from "../Atoms/Dropdown";
import { Menu, MenuItem } from "../Atoms/Menu";

const TrackCardWrapper = tw.tr`group hover:bg-zinc-400/10 hover:duration-300 rounded-row`;
const PlayButton = tw.button`btn btn-circle btn-accent hidden group-hover:inline-flex text-xl `;
const TrackIndex = tw.span`group-hover:hidden w-full`;
const TrackCardCol = tw.td`p-2`;

const TrackCard = ({ index, track }) => {
	const { playState, setPlayState, setCurrentTrack, currentTrack } = useContext(AppContext);
	const [isPlaying, setIsPlaying] = useState(false);
	useEffect(() => {
		if (currentTrack?._id !== track?._id) {
			setIsPlaying(false);
		} else {
			setIsPlaying(playState);
		}
	}, [currentTrack, playState]);

	const playTrack = (track) => {
		setIsPlaying(!isPlaying);
		setPlayState(!isPlaying);
		setCurrentTrack(track);
	};
	return (
		<TrackCardWrapper>
			<TrackCardCol className="w-20">
				<div className="relative text-center">
					<SoundWave track={track} isPlaying={isPlaying && playState} />
					{!isPlaying && <TrackIndex>{index}</TrackIndex>}
					<PlayButton onClick={() => playTrack(track)}>{isPlaying ? <BsPauseFill /> : <BsPlayFill />}</PlayButton>
				</div>
			</TrackCardCol>
			<TrackCardCol colSpan={2}>
				<div className="flex items-center gap-2">
					<img src={track?.thumbnail} className="h-14 w-14 rounded-md" />
					<div>
						<h5>{track.title}</h5>
						<p>{track.artists.map((artist) => artist.name).join(", ")}</p>
					</div>
				</div>
			</TrackCardCol>
			<TrackCardCol>{track.album?.title ?? ""}</TrackCardCol>
			<TrackCardCol className="sm:hidden">{formatNumber(track.listen)}</TrackCardCol>
			<TrackCardCol className="sm:hidden">{timer(track.duration)}</TrackCardCol>
			<TrackCardCol>
				<Dropdown dropdownButtonElement={<BsThreeDots />}>
					<Menu tw=" bg-base-300">
						<MenuItem>Save to your library</MenuItem>
						<MenuItem>Save to your library</MenuItem>
					</Menu>
				</Dropdown>
			</TrackCardCol>
		</TrackCardWrapper>
	);
};

export default TrackCard;
