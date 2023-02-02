// import { fetchRelatedTrackThunkAction } from "@/app/redux/slice/queueSlice";
import { Suspense } from "react"
import { BsPlayFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import Loading from "../customs/atoms/Loading"
import TrackList from "../shared/Track/TrackList"
import Typography from "../customs/atoms/Typography"
import { Fragment } from "react"

const Queue = () => {
    const { nextup } = useSelector((state) => state.queue)

    return (
        <Fragment>
            <Typography size="4xl" className="flex items-center gap-2">
                <BsPlayFill /> Queue
            </Typography>
            {/* now playing track */}
            <Suspense fallback={<Loading />}>
                <TrackList data={nextup} />
            </Suspense>
        </Fragment>
    )
}

export default Queue
