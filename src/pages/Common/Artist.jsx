import { useFetchArtistQuery } from "@/providers/api/artistApi"
import React, { Fragment } from "react"
import { useParams } from "react-router-dom"
import { SkeletonCardTitle, SkeletonTextCard } from "../../components/customs/Card"
import HeroBanner from "../../components/customs/HeroBanner"
import Typography from "../../components/customs/Typography"
import ErrorBoundary from "../../components/error/ErrorBoundary"
import AlbumList from "../../components/shared/Album/AlbumList"
import TrackList from "../../components/shared/Track/TrackList"
import Text from "@/components/customs/Text"

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
                  <Typography $as="h1" className="mb-6 sm:text-4xl" size="6xl" fontWeight="bold">
                     {data?.artist?.name}
                  </Typography>
                  <Text $as="p" size="lg" fontWeight="normal" className="mb-1 sm:text-sm">
                     {data?.artist.desc}
                  </Text>
                  <Text $as="p" size="base" fontWeight="normal" className="mb-1 text-neutral-content sm:text-sm">
                     {data?.followers} followers
                  </Text>
               </Fragment>
            )}
         </HeroBanner>
         <section className="flex flex-col gap-10">
            {data?.tracks.length > 0 && (
               <Fragment>
                  <Typography size="2xl" className="mb-0">
                     Tracks
                  </Typography>
                  <TrackList data={data?.tracks} />
               </Fragment>
            )}
            {data?.albums.length > 0 && (
               <Fragment>
                  <Typography size="2xl" className="mb-0">
                     albums
                  </Typography>
                  <AlbumList data={data?.albums} />
               </Fragment>
            )}
         </section>
      </ErrorBoundary>
   )
}

export default Artist
