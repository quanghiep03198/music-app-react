import React from "react";
import { TrackCardRow, TrackCardCell } from "./TrackCard";
const TrackCardSkeleton = () => {
	return (
		<TrackCardRow className="animate-pulse">
			<TrackCardCell className="h-14"></TrackCardCell>
			<TrackCardCell className="h-14"></TrackCardCell>
			<TrackCardCell className="h-14"></TrackCardCell>
			<TrackCardCell className="h-14"></TrackCardCell>
			<TrackCardCell className="h-14"></TrackCardCell>
		</TrackCardRow>
	);
};

export default TrackCardSkeleton;
