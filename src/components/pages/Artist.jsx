import { useFetchArtistQuery } from "@/app/services/artistApi"
import React, { Fragment } from "react"
import { useParams } from "react-router-dom"
import { SkeletonCardTitle, SkeletonTextCard } from "../customs/atoms/Card"
import HeroBanner from "../customs/atoms/HeroBanner"
import Typography from "../customs/atoms/Typography"
import ErrorBoundary from "../customs/ErrorBoundary"
import AlbumList from "../shared/Album/AlbumList"
import TrackList from "../shared/Track/TrackList"

const Artist = () => {
    const { id } = useParams()

    const { data, isFetching } = useFetchArtistQuery(id)
    console.log(data)
    return (
        <ErrorBoundary>
            <HeroBanner heroImageUrl={data?.artist?.avatar} style={{ backgroundImage: `url(${data?.artist?.wallpaper}) ` }}>
                {isFetching ? (
                    <div className="flex flex-col gap-3">
                        <SkeletonCardTitle />
                        <SkeletonTextCard />
                        <SkeletonTextCard />
                    </div>
                ) : (
                    <Fragment>
                        <Typography size="7xl" fontWeight="semibold">
                            {data?.artist?.name}
                        </Typography>
                        <p className="text-lg">{data?.artist.desc}</p>
                        <p className="text-base">{data?.followers} followers</p>
                    </Fragment>
                )}
            </HeroBanner>
            <section className="flex flex-col gap-10">
                {data?.tracks.length > 0 && (
                    <div>
                        <Typography size="2xl">Tracks</Typography>
                        <TrackList data={data?.tracks} />
                    </div>
                )}
                {data?.albums.length > 0 && (
                    <div>
                        <Typography size="2xl">albums</Typography>
                        <AlbumList data={data?.albums} />
                    </div>
                )}
            </section>
        </ErrorBoundary>
    )
}

export default Artist
