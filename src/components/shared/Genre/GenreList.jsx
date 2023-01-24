import React from "react"
import GenreCard from "./GenreCard"

const GenreList = ({ data }) => {
    return (
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xxl:grid-cols-5">
            {Array.isArray(data) &&
                data.map((genre) => <GenreCard data={genre} />)}
        </div>
    )
}

export default GenreList
