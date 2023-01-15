import { useFetchTracksQuery } from "@/app/redux/api/trackApi";
import { setCurrentTrack } from "@/app/redux/slice/queueSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import TrackCard from "./TrackCard";

export const StyledTracksList = tw.table`table border-separate border-spacing-x-0 border-spacing-y-1 w-full`;

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
		<StyledTracksList>
			{Array.isArray(data) &&
				data.map((track, index) => {
					return <TrackCard key={track._id} className="rounded-xl" track={track} index={index + 1} />;
				})}
		</StyledTracksList>
	);
};
export default TrackList;
