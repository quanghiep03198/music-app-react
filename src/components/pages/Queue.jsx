// import { fetchRelatedTrackThunkAction } from "@/app/redux/slice/queueSlice";
import { useFetchRelatedTracksQuery } from "@/app/redux/api/trackApi";
import { setCurrentPlaylist } from "@/app/redux/slice/queueSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorBoundary from "../customs/ErrorBoundary";
import TrackCard from "../shared/Track/TrackCard";
import { StyledTracksList } from "../shared/Track/TrackList";
import { PageContent } from "./Home";

const Queue = () => {
	const { currentTrack, nextup } = useSelector((state) => state.queue);

	const { data, isLoading } = useFetchRelatedTracksQuery({ genre: currentTrack.genre?._id, skip: 0, limit: 10 });
	const dispatch = useDispatch();
	useEffect(() => {
		if (!nextup || nextup.length === 0 || nextup[0] === null) {
			console.log(data);
			dispatch(setCurrentPlaylist(data));
		}
	}, []);
	return (
		<ErrorBoundary>
			<PageContent>
				{/* now playing track */}
				<StyledTracksList>
					<h1 className="text-2xl font-semibold">Next Up</h1>

					{Array.isArray(nextup) &&
						nextup.length > 0 &&
						nextup.map((track, index) => <TrackCard key={track?._id} track={track} index={index + 1} />)}
				</StyledTracksList>
			</PageContent>
		</ErrorBoundary>
	);
};

export default Queue;
