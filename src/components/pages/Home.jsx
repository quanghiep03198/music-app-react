import { useFetchTracksQuery } from "@/app/redux/api/trackApi";
import React from "react";
import TrackList from "../shared/Track/TrackList";
import tw from "tailwind-styled-components";

const HompageContent = tw.div` flex flex-col gap-10 items-stretch p-3`;
const HomePage = () => {
	return (
		<HompageContent>
			<TrackList />
		</HompageContent>
	);
};

export default HomePage;
