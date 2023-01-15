import { fetchRelatedTrackThunkAction } from "@/app/redux/slice/queueSlice";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/AppProvider";
import ErrorBoundary from "../customs/ErrorBoundary";
import TrackCard from "../shared/Track/TrackCard";
import { StyledTracksList } from "../shared/Track/TrackList";
import { PageContent } from "./Home";

const Queue = () => {
	const { currentTrack, nextup } = useSelector((state) => state.queue);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!nextup || nextup.length === 0) dispatch(fetchRelatedTrackThunkAction(currentTrack.genre._id));
	}, []);

	return (
		<ErrorBoundary>
			<PageContent>
				{/* now playing track */}
				<StyledTracksList>
					<tr>
						<td colSpan={6}>
							<h1 className="text-2xl font-semibold">Next Up</h1>
						</td>
					</tr>
					{Array.isArray(nextup) &&
						nextup.length > 0 &&
						nextup.map((track, index) => <TrackCard key={track?._id} track={track} index={index + 1} />)}
				</StyledTracksList>
			</PageContent>
		</ErrorBoundary>
	);
};

export default Queue;
