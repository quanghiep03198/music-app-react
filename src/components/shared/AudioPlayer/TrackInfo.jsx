import { AppContext } from "@/components/context/AppProvider";
import React, { useContext } from "react";

const TrackInfo = () => {
	const { currentTrack } = useContext(AppContext);

	return (
		<div className="flex items-center gap-4">
			<img src={currentTrack?.thumbnail} className="h-16 w-16 sm:h-12 sm:w-12" />
			<div>
				<h5 className="font-semibold text-base-content">{currentTrack?.title}</h5>
				<p>{Array.isArray(currentTrack?.artists) && currentTrack.artists.map((artist) => artist.name).join(", ")}</p>
			</div>
		</div>
	);
};

export default TrackInfo;
