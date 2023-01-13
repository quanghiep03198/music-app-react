import { AppContext } from "@/components/context/AppProvider";
import { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import AudioButtonGroup from "./AudioButtonGroup";
import AudioProcess from "./AudioProcess";
import TrackActions from "./TrackActions";
import TrackInfo from "./TrackInfo";

const AudioPlayerWrapper = tw.div`w-full text-base-content flex flex-wrap xl:flex-nowrap xxl:flex-nowrap justify-between items-center xl:items-start xxl:items-start flex-grow gap-10 p-5 bg-base-300`;
const AudioControllerWrapper = tw.div`flex flex-col gap-5 justify-center items-center flex-1 `;
const Audio = tw.audio`fixed invisible`;

const AudioPlayer = () => {
	const audioRef = useRef(null);
	const currentTrack = useSelector((state) => state.queue.nowPlaying);

	return (
		<AudioPlayerWrapper>
			<TrackInfo />
			<AudioControllerWrapper>
				<Audio src={currentTrack?.trackSrc} ref={audioRef} />
				<AudioProcess audioRef={audioRef} />
				<AudioButtonGroup />
			</AudioControllerWrapper>
			<TrackActions audioRef={audioRef} />
		</AudioPlayerWrapper>
	);
};

export default AudioPlayer;
