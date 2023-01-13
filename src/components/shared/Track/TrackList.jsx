import { useFetchTracksQuery } from "@/app/redux/api/trackApi";
import Loading from "../Atomics/Loading";
import TrackCard from "./TrackCard";
import tw from "tailwind-styled-components";
import TrackCardSkeleton from "./TrackCardSkeleton";

export const StyledTracksList = tw.table`table border-separate border-spacing-x-0 border-spacing-y-1 w-full`;

const TrackList = () => {
	const { data, isFetching, isError, isSuccess } = useFetchTracksQuery({ skip: 0, limit: 5 });
	const preloadData = [1, 2, 3, 4, 5];
	return (
		<StyledTracksList>
			{isFetching &&
				preloadData.map((item) => {
					return <TrackCardSkeleton key={item} />;
				})}
			{isSuccess &&
				Array.isArray(data) &&
				data.map((track, index) => {
					return <TrackCard key={track._id} className="rounded-xl" track={track} index={index + 1} />;
				})}
		</StyledTracksList>
	);
};
export default TrackList;
