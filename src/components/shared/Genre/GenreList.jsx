import React from "react"
import SkeletonCard from "../Skeletons/SkeletonCard"
import GenreCard from "./GenreCard"

const GenreList = ({ data, status }) => {
    return (
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6">
            {Array.isArray(data) && data.map((genre) => <GenreCard key={genre._id} data={genre} />)}
        </div>
    )
}

export default GenreList
