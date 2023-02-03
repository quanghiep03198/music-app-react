import { useFetchArtistQuery } from "@/app/services/artistApi"
import React, { Fragment } from "react"
import { useParams } from "react-router-dom"
import HeroBanner from "../customs/atoms/HeroBanner"
import Typography from "../customs/atoms/Typography"
import ErrorBoundary from "../customs/ErrorBoundary"

const Artist = () => {
    const { id } = useParams()

    const { data, isFetching } = useFetchArtistQuery(id)
    const { artist, albums, tracks, followers } = data
    return (
        <ErrorBoundary>
            <HeroBanner heroImageUrl={artist?.avatar} style={{ backgroundImage: `url(${artist?.wallpaper}) ` }}>
                <div className="flex flex-col gap-3">
                    <Typography size="7xl">{artist?.name}</Typography>
                    <p className="text-xl">{artist.desc}</p>
                </div>
            </HeroBanner>
        </ErrorBoundary>
    )
}

export default Artist
