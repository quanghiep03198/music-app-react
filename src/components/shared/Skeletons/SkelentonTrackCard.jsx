import { BsPlayFill } from "react-icons/bs"
import tw from "tailwind-styled-components"
import { SkeletonTextCard } from "../../customs/Card"
export const ThumbnailSkeleton = tw.div`h-14 w-14 rounded-lg bg-neutral `
import { Track } from "../Track/TrackCard"

const SkeletonTrackCard = () => {
   return (
      <Track>
         <BsPlayFill className="animate-pulse text-2xl text-neutral" />

         <div className="flex items-center gap-1">
            <ThumbnailSkeleton />
            <div className="flex flex-col gap-3">
               <SkeletonTextCard />
               <SkeletonTextCard />
            </div>
         </div>

         <SkeletonTextCard />
         <SkeletonTextCard />
         <SkeletonTextCard />
      </Track>
   )
}

export default SkeletonTrackCard
