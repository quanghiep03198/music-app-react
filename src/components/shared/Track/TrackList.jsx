import SkeletonTrackCard from "../Skeletons/SkelentonTrackCard";

import TrackCard from "./TrackCard";

const TrackList = ({ data, status }) => {
  return (
    <div className=" flex w-full flex-col gap-2">
      {status?.isFetching &&
        [1, 2, 3, 4, 5].map((item) => <SkeletonTrackCard key={item} />)}
      {Array.isArray(data) &&
        data.map((track, index) => {
          return (
            <TrackCard
              key={index}
              className="rounded-xl"
              track={track}
              index={index + 1}
            />
          );
        })}
    </div>
  );
};
export default TrackList;
