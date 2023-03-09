import TrackCard from "./TrackCard"

const TrackList = ({ data, status }) => {
    return (
        <div className=" flex w-full flex-col gap-2">
            {Array.isArray(data) &&
                data.map((track, index) => {
                    return <TrackCard key={index} className="rounded-xl" track={track} index={index + 1} />
                })}
        </div>
    )
}
export default TrackList
