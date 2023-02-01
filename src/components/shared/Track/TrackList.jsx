import tw from "tailwind-styled-components"
import SkeletonTrackCard from "../Skeletons/SkelentonTrackCard"

import TrackCard from "./TrackCard"

export const StyledTracksList = tw.div`flex flex-col gap-2 w-full`

const TrackList = ({ data, status }) => {
    return (
        <StyledTracksList>
            {status?.isFetching && [1, 2, 3, 4, 5].map((item) => <SkeletonTrackCard key={item} />)}
            {Array.isArray(data) &&
                data.map((track, index) => {
                    return <TrackCard key={index} className="rounded-xl" track={track} index={index + 1} />
                })}
        </StyledTracksList>
    )
}
export default TrackList
