import React, { Suspense } from "react";
import tw from "tailwind-styled-components";
import ArtistSlide from "../shared/Artist/ArtistSlide";
import Loading from "../shared/Atomics/Loading";
import TrackCardSkeleton from "../shared/Track/TrackCardSkeleton";
import { StyledTracksList } from "../shared/Track/TrackList";
const TrackList = React.lazy(() => import("../shared/Track/TrackList"));

export const PageContent = tw.div`flex flex-col gap-10 items-stretch p-3`;
const HomePage = () => {
	return (
		<PageContent>
			<Suspense
				fallback={
					<StyledTracksList>
						{[1, 2, 3, 4, 5].map((item) => (
							<TrackCardSkeleton key={item} />
						))}
					</StyledTracksList>
				}
			>
				<TrackList />
			</Suspense>
			<Suspense fallback={<Loading />}>
				<ArtistSlide />
			</Suspense>
		</PageContent>
	);
};

export default HomePage;
