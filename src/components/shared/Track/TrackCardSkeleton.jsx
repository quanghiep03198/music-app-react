import tw from "tailwind-styled-components";
import { StyledTrackCard } from "./TrackCard";
export const TextSkeleton = tw.div`h-2 w-32 rounded-full bg-base-content opacity-20`;
export const ThumbnailSkeleton = tw.div`h-12 w-12 rounded-lg bg-base-content opacity-20`;

const TrackCardSkeleton = () => {
	return (
		<StyledTrackCard className="w-full">
			<div className="animate-pulse"></div>
			<div colSpan={2} className="animate-pulse">
				<div className="flex items-center gap-2">
					<ThumbnailSkeleton />
					<div className="flex flex-col gap-4">
						<TextSkeleton />
						<TextSkeleton />
					</div>
				</div>
			</div>
			<div className="animate-pulse ">
				<TextSkeleton />
			</div>
			<div className="animate-pulse ">
				<TextSkeleton />
			</div>
			<div className="animate-pulse ">
				<TextSkeleton />
			</div>
		</StyledTrackCard>
	);
};

export default TrackCardSkeleton;
