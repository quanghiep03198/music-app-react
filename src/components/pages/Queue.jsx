// import { fetchRelatedTrackThunkAction } from "@/app/redux/slice/queueSlice";
import { useFetchRelatedTracksQuery } from "@/app/services/trackApi"
import { addToQueue, setCurrentPlaylist } from "@/app/slices/queueSlice"
import { Suspense, useEffect } from "react"
import { BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../customs/atoms/Loading"
import TrackList from "../shared/Track/TrackList"
import { PageContent, Typography } from "./Home"

const Queue = () => {
    const { nextup } = useSelector((state) => state.queue)

    return (
        <>
            <Typography className="flex items-center gap-2">
                <BsPlayFill /> Queue
            </Typography>
            {/* now playing track */}
            <Suspense fallback={<Loading />}>
                <TrackList data={nextup} />
            </Suspense>
        </>
    )
}

export default Queue
