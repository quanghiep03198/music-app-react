import { AppContext } from "@/components/context/AppProvider";
import { useContext, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import AudioPlayerController from "./AudioPlayerController";
import TrackActions from "./TrackActions";
import TrackInfo from "./TrackInfo";

const AudioPlayerWrapper = tw.div`w-full text-base-content flex flex-wrap xl:flex-nowrap xxl:flex-nowrap justify-between items-center xl:items-start xxl:items-start flex-grow gap-10 p-5 bg-base-200`;
const Audio = tw.audio`fixed invisible`;

const AudioPlayer = () => {
	const { currentTrack } = useContext(AppContext);
	const audioRef = useRef(null);
	return (
		<AudioPlayerWrapper>
			<TrackInfo />
			<AudioPlayerController audioRef={audioRef} />
			<TrackActions audioRef={audioRef} />
			<Audio src={currentTrack?.trackSrc} ref={audioRef} />
		</AudioPlayerWrapper>
	);
};

export default AudioPlayer;
