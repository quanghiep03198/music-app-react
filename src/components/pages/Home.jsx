import tw from "tailwind-styled-components";
import ErrorBoundary from "../customs/ErrorBoundary";
import AlbumSlider from "../shared/Album/AlbumSlider";
import ArtistSlider from "../shared/Artist/ArtistSlider";
import PlaylistSlider from "../shared/Playlist/PlaylistSlider";
import TrackList from "../shared/Track/TrackList";

export const SectionTitle = tw.h1`text-2xl font-semibold first-letter:uppercase`;
export const PageContent = tw.div`flex flex-col gap-10 items-stretch`;
const HomePage = () => {
	return (
		<PageContent>
			<ErrorBoundary>
				<SectionTitle>most popular</SectionTitle>
				<TrackList />

				<SectionTitle className="!normal-case">Bass Station mixes</SectionTitle>
				<PlaylistSlider />

				<SectionTitle>artists you also like</SectionTitle>
				<ArtistSlider />

				<SectionTitle>new albums</SectionTitle>
				<AlbumSlider />
			</ErrorBoundary>
		</PageContent>
	);
};

export default HomePage;
