import tw from "tailwind-styled-components";
import ErrorBoundary from "../customs/ErrorBoundary";
import TrackList from "../shared/Track/TrackList";

import AlbumSlider from "../shared/Album/AlbumSlider";
import ArtistSlider from "../shared/Artist/ArtistSlider";
import PlaylistSlider from "../shared/Playlist/PlaylistSlider";

export const Typography = tw.h1`text-2xl font-semibold first-letter:uppercase`;
export const PageContent = tw.div`flex flex-col gap-10 items-stretch`;
const HomePage = () => {
	return (
		<ErrorBoundary>
			<PageContent>
				<Typography>most popular</Typography>
				<TrackList />

				<Typography className="!normal-case">Bass Station mixes</Typography>
				<PlaylistSlider />

				<Typography>artists you also like</Typography>
				<ArtistSlider />

				<Typography>new albums</Typography>
				<AlbumSlider />
			</PageContent>
		</ErrorBoundary>
	);
};

export default HomePage;
