import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../context/AppProvider";
import ErrorBoundary from "../customs/ErrorBoundary";
import TrackCard from "../shared/Track/TrackCard";
import { StyledTracksList } from "../shared/Track/TrackList";
import { PageContent } from "./Home";

const Queue = () => {
	const { currentTrack } = useContext(AppContext);
	const tracksInQueue = useSelector((state) => state.queue);

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
					{Array.isArray(tracksInQueue) &&
						tracksInQueue.length > 0 &&
						tracksInQueue.map((track, index) => <TrackCard key={track?._id} track={track} index={index + 1} />)}
				</StyledTracksList>
			</PageContent>
		</ErrorBoundary>
	);
};

export default Queue;
