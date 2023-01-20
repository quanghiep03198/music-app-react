import tw from "tailwind-styled-components"
import { CardTextSkeleton, CardTitleSkeleton } from "../../customs/Atomics/Card"
import { StyledTrackCard } from "./TrackCard"
export const ThumbnailSkeleton = tw.div`h-14 w-14 rounded-lg bg-base-content opacity-20`

const TrackCardSkeleton = () => {
    return (
        <StyledTrackCard>
            <CardTextSkeleton />
            <div className="animate-pulse">
                <div className="flex items-center gap-2">
                    <ThumbnailSkeleton />
                    <div className="flex flex-col gap-4">
                        <CardTitleSkeleton />
                        <CardTextSkeleton />
                    </div>
                </div>
            </div>
            <div className="animate-pulse ">
                <CardTextSkeleton />
            </div>
            <div className="animate-pulse ">
                <CardTextSkeleton />
            </div>
            <div className="animate-pulse ">
                <CardTextSkeleton />
            </div>
        </StyledTrackCard>
    )
}

export default TrackCardSkeleton
