import { Suspense } from "react"
import { BsPlayFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import Loading from "../../components/customs/Loading"
import TrackList from "../../components/shared/Track/TrackList"
import Typography from "../../components/customs/Typography"
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
