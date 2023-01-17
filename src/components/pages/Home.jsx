import tw from "tailwind-styled-components";
import ErrorBoundary from "../customs/ErrorBoundary";
import ArtistSlide from "../shared/Artist/ArtistSlide";
import TrackList from "../shared/Track/TrackList";

export const PageContent = tw.div`flex flex-col gap-10 items-stretch p-3`;
const HomePage = () => {
	return (
		<PageContent>
			<ErrorBoundary>
				<h1 className="text-2xl font-semibold first-letter:uppercase">most popular</h1>
				<TrackList />
				<h1 className="text-2xl font-semibold first-letter:uppercase">artists you also like</h1>
				<ArtistSlide />
			</ErrorBoundary>
		</PageContent>
	);
};

export default HomePage;
