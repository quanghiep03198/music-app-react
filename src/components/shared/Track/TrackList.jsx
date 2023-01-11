import { useFetchTracksQuery } from "@/app/redux/api/trackApi";
import Loading from "../Atoms/Loading";
import TrackCard from "./TrackCard";
import tw from "tailwind-styled-components";

export const StyledTracksList = tw.table`border-separate border-spacing-x-0 border-spacing-y-1 w-full`;

const TrackList = () => {
	const { data, isFetching, isError } = useFetchTracksQuery({ skip: 0, limit: 5 });

	return (
		<StyledTracksList className="">
			<tbody>
				{isFetching && (
					<tr align="center">
						<td colSpan={6} align="center" className="">
							<Loading />
						</td>
					</tr>
				)}
				{Array.isArray(data) &&
					data.map((track, index) => (
						<TrackCard key={track._id} className="rounded-xl" track={track} index={index + 1} />
					))}
			</tbody>
		</StyledTracksList>
	);
};
export default TrackList;
