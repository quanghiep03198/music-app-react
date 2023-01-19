import { useFetchTracksQuery } from "@/app/redux/api/trackApi";
import { setCurrentTrack } from "@/app/redux/slice/queueSlice";
import ErrorBoundary from "@/components/customs/ErrorBoundary";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import TrackCardSkeleton from "./TrackCardSkeleton";

import TrackCard from "./TrackCard";

export const StyledTracksList = tw.div`flex flex-col gap-2 w-full`;

const TrackList = () => {
	const { data } = useFetchTracksQuery({ skip: 0, limit: 5 });
	const { currentTrack } = useSelector((state) => state.queue);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!currentTrack || currentTrack === null) {
			if (Array.isArray(data)) dispatch(setCurrentTrack(data[0]));
		}
	}, []);
	return (
		<ErrorBoundary>
			<StyledTracksList>
				{Array.isArray(data) &&
					data.map((track, index) => {
						return <TrackCard key={track._id} className="rounded-xl" track={track} index={index + 1} />;
					})}
			</StyledTracksList>
		</ErrorBoundary>
	);
};
export default TrackList;
