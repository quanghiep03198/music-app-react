// import { fetchRelatedTrackThunkAction } from "@/app/redux/slice/queueSlice";
import { useFetchRelatedTracksQuery } from "@/app/redux/api/trackApi"
import { addToQueue, setCurrentPlaylist } from "@/app/redux/slice/queueSlice"
import { Suspense, useEffect } from "react"
import { BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../components/customs/Atomics/Loading"
import TrackList from "../components/shared/Track/TrackList"
import { PageContent, Typography } from "./Home"

const Queue = () => {
    const { currentTrack, nextup } = useSelector((state) => state.queue)

    const { data, isLoading } = useFetchRelatedTracksQuery({
        genre: currentTrack.genre?._id,
        skip: 0,
        limit: 10
    })
    const dispatch = useDispatch()
    // useEffect(() => {
    //     console.log(data)
    //     if (nextup.length === 0) {
    //         dispatch(addToQueue(data))
    //     }
    // })

    return (
        <PageContent>
            <Typography className="flex items-center gap-2">
                <BsPlayFill /> Queue
            </Typography>
            {/* now playing track */}
            <Suspense fallback={<Loading />}>
                <TrackList data={nextup} />
            </Suspense>
        </PageContent>
    )
}

export default Queue
