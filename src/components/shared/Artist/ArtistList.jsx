import CardSkeleton from "../Skeletons/SkeletonCard"
import ArtistCard from "./ArtistCard"

const ArtistList = ({ data, status }) => {
    return (
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
            {status.isFetching &&
                [1, 2, 3, 4, 5].map((item) => <CardSkeleton key={item} />)}
            {Array.isArray(data) &&
                data.map((artist) => (
                    <ArtistCard key={artist?._id} artistData={artist} />
                ))}
        </div>
    )
}

export default ArtistList
