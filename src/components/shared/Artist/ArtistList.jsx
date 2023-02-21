import SkeletonCard from "../Skeletons/SkeletonCard"
import ArtistCard from "./ArtistCard"

const ArtistList = ({ data, status }) => {
    return (
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6">
            {Array.isArray(data) && data.map((artist) => <ArtistCard isFetching={status.isFetching} key={artist?._id} artistData={artist} />)}
        </div>
    )
}

export default ArtistList
