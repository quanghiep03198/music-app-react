import { useFetchAllPlaylistQuery } from "@/app/redux/api/playlistApi";
import React from "react";

const PlaybackList = () => {
	const { data, isFetching, isLoading } = useFetchAllPlaylistQuery({ skip: 0, limit: 10 });
	console.log(data);
	return (
		<div className="lg:grid-col-3 grid gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5"></div>
	);
};

export default PlaybackList;
