import { BsPlayFill } from "react-icons/bs"
import tw from "tailwind-styled-components"
import { CardTextSkeleton, CardTitleSkeleton } from "../../customs/Atomics/Card"
export const ThumbnailSkeleton = tw.div`h-14 w-14 rounded-lg bg-neutral `

const SkeletonTrackCard = () => {
    return (
        <div className="track-card p-1">
            <BsPlayFill className="animate-pulse text-2xl text-neutral" />

            <div className="flex items-center gap-1">
                <ThumbnailSkeleton />
                <div className="flex flex-col gap-3">
                    <CardTextSkeleton />
                    <CardTextSkeleton />
                </div>
            </div>

            <div>
                <CardTextSkeleton />
            </div>
            <div>
                <CardTextSkeleton />
            </div>
            <div>
                <CardTextSkeleton />
            </div>
        </div>
    )
}

export default SkeletonTrackCard
