import { useFetchArtistQuery } from "@/app/services/artistApi"
import React, { Fragment } from "react"
import { useParams } from "react-router-dom"
import HeroBanner from "../customs/atoms/HeroBanner"

const Artist = () => {
    const { id } = useParams()

    const { data, isFetching } = useFetchArtistQuery(id)
    return (
        <Fragment>
            <HeroBanner heroImageUrl={data?.avatar} className={`bg-[url(${data?.wallpaper})]`}></HeroBanner>
        </Fragment>
    )
}

export default Artist
