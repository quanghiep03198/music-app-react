import React from "react"
import CardSkeleton from "../Skeletons/SkeletonCard"
import GenreCard from "./GenreCard"

const GenreList = ({ data, status }) => {
    return (
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xxl:grid-cols-5">
            {status.isFetching &&
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <CardSkeleton key={item} />
                ))}
            {Array.isArray(data) &&
                data.map((genre) => <GenreCard data={genre} />)}
        </div>
    )
}

export default GenreList
