import { useFetchTracksQuery } from "@/app/redux/api/trackApi";
import { AppContext } from "@/components/context/AppProvider";
import { useContext, useLayoutEffect } from "react";
import tw from "tailwind-styled-components";
import TrackCard from "./TrackCard";
import TrackCardSkeleton from "./TrackCardSkeleton";

export const StyledTracksList = tw.table`table border-separate border-spacing-x-0 border-spacing-y-1 w-full`;

const TrackList = () => {
	const { data, isFetching, isError, isSuccess } = useFetchTracksQuery({ skip: 0, limit: 5 });
	const { currentTrack, setCurrentTrack } = useContext(AppContext);
	useLayoutEffect(() => {
		if (!currentTrack) setCurrentTrack(data[0]);
	}, []);
	return (
		<StyledTracksList>
			{isError &&
				[(1, 2, 3, 4, 5)].map((item) => {
					return <TrackCardSkeleton key={item} />;
				})}
			{Array.isArray(data) &&
				data.map((track, index) => {
					return <TrackCard key={track._id} className="rounded-xl" track={track} index={index + 1} />;
				})}
		</StyledTracksList>
	);
};
export default TrackList;
