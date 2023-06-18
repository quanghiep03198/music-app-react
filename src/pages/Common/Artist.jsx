import { useFetchArtistQuery } from "@/providers/api/artistApi"
import React, { Fragment } from "react"
import { useParams } from "react-router-dom"
import { SkeletonCardTitle, SkeletonTextCard } from "../../components/customs/Card"
import HeroBanner from "../../components/customs/HeroBanner"
import Typography from "../../components/customs/Typography"
import ErrorBoundary from "../../components/error/ErrorBoundary"
import AlbumList from "../../components/shared/Album/AlbumList"
import TrackList from "../../components/shared/Track/TrackList"

const Artist = () => {
   const { id } = useParams()

   const { data, isFetching } = useFetchArtistQuery(id)
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
                  <Typography size="6xl" fontWeight="bold">
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
