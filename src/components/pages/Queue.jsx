// import { fetchRelatedTrackThunkAction } from "@/app/redux/slice/queueSlice";
import { Suspense } from "react"
import { BsPlayFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import Loading from "../customs/atoms/Loading"
import TrackList from "../shared/Track/TrackList"
import Typography from "../customs/atoms/Typography"

const Queue = () => {
    const { nextup } = useSelector((state) => state.queue)

    return (
        <>
<<<<<<< HEAD
            <Typography size="2xl" className="flex items-center gap-2">
=======
            <Typography className="flex items-center gap-2">
>>>>>>> 249c10de1e8d8f3d0612943a04dc3e5a84ae8728
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
