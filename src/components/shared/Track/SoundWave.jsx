import { AppContext } from "@/components/context/AppProvider";
import { useContext } from "react";

const SoundWave = ({ track, isPlaying }) => {
	const { playState, currentTrack } = useContext(AppContext);

	return (
		<div className={`sound-wave group-hover:hidden ${!isPlaying && "hidden"}`}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default SoundWave;
