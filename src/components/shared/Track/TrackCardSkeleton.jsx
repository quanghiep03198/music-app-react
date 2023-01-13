import React from "react";
import { TrackCardRow, TrackCardCell } from "./TrackCard";
const TrackCardSkeleton = () => {
	return (
		<td className="animate-pulse">
			<td className="h-14 p-2"></td>
			<td className="h-14 p-2"></td>
			<td className="h-14 p-2"></td>
			<td className="h-14 p-2"></td>
			<td className="h-14 p-2"></td>
		</td>
	);
};

export default TrackCardSkeleton;
