import tw from "tailwind-styled-components";
import ErrorBoundary from "../customs/ErrorBoundary";
import AlbumList from "../shared/Album/AlbumList";
import ArtistSlide from "../shared/Artist/ArtistSlide";
import TrackList from "../shared/Track/TrackList";

export const SectionTitle = tw.h1`text-2xl font-semibold first-letter:uppercase`;
export const PageContent = tw.div`flex flex-col gap-10 items-stretch p-3`;
const HomePage = () => {
	return (
		<PageContent>
			<ErrorBoundary>
				<SectionTitle>most popular</SectionTitle>
				<TrackList />

				<SectionTitle>artists you also like</SectionTitle>
				<ArtistSlide />

				<SectionTitle>artists you also like</SectionTitle>
				<AlbumList />
			</ErrorBoundary>
		</PageContent>
	);
};

export default HomePage;
