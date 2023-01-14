import { useFetchTracksQuery } from "@/app/redux/api/trackApi";
import { AppContext } from "@/components/context/AppProvider";
import { useContext, useLayoutEffect } from "react";
import tw from "tailwind-styled-components";
import TrackCard from "./TrackCard";
import TrackCardSkeleton from "./TrackCardSkeleton";

export const StyledTracksList = tw.table`table border-separate border-spacing-x-0 border-spacing-y-1 w-full`;

const TrackList = () => {
	const { data } = useFetchTracksQuery({ skip: 0, limit: 5 });

	return (
		<StyledTracksList>
			{Array.isArray(data) &&
				data.map((track, index) => {
					return <TrackCard key={track._id} className="rounded-xl" track={track} index={index + 1} />;
				})}
		</StyledTracksList>
	);
};
export default TrackList;
