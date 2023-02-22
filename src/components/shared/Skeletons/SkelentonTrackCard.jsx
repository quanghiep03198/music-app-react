import { BsPlayFill } from "react-icons/bs"
import tw from "tailwind-styled-components"
import { SkeletonTextCard } from "../../customs/atoms/Card"
export const ThumbnailSkeleton = tw.div`h-14 w-14 rounded-lg bg-gray-300 `

const SkeletonTrackCard = () => {
    return (
        <div
            className="group
                    grid 
                    min-h-[60px]
                    grid-cols-[5%,35%,15%,15%,15%,5%]
                    items-center
                    justify-between
                    gap-2 
                    rounded-lg 
                    p-1 
                    sm:grid-cols-[10%,80%,10%]
                    sm:text-sm
                    md:grid-cols-[10%,80%,10%]
                    lg:grid-cols-[10%,80%,10%]
                    sm:[&>:not(:first-child):not(:nth-child(2)):not(:last-child)]:hidden
                    md:[&>:not(:first-child):not(:nth-child(2)):not(:last-child)]:hidden
                    lg:[&>:not(:first-child):not(:nth-child(2)):not(:last-child)]:hidden"
        >
            <BsPlayFill className="animate-pulse text-2xl text-neutral/20" />

            <div className="flex items-center gap-1">
                <ThumbnailSkeleton />
                <div className="flex flex-col gap-3">
                    <SkeletonTextCard />
                    <SkeletonTextCard />
                </div>
            </div>

            <div>
                <SkeletonTextCard />
            </div>
            <div>
                <SkeletonTextCard />
            </div>
            <div>
                <SkeletonTextCard />
            </div>
        </div>
    )
}

export default SkeletonTrackCard
