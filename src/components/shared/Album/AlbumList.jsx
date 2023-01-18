import { useFetchAlbumsQuery } from "@/app/redux/api/albumApi";
import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import Loading from "../Atomics/Loading";
import AlbumCard from "./AlbumCard";

const Grid = tw.div`grid grid-cols-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
const AlbumList = () => {
	const fetchAlbumsResponse = useFetchAlbumsQuery({ skip: 0, limit: 10 });
	useEffect(() => {
		console.log(fetchAlbumsResponse);
	});
	const { data, isLoading, isFetching } = fetchAlbumsResponse;
	return (
		<>
			{isLoading && <Loading />}
			<Grid>
				{Array.isArray(data) &&
					data.map((album) => (
						<AlbumCard imageUrl={album?.album} title={album?.title} typography={album?.description} />
					))}
			</Grid>
		</>
	);
};

export default AlbumList;
