import tw from "tailwind-styled-components"
import TrackList from "../../components/shared/Track/TrackList"
import { useFetchAlbumsQuery } from "@/providers/api/albumApi"
import { useFetchArtistsQuery } from "@/providers/api/artistApi"
import { useFetchUserPlaylistsQuery } from "@/providers/api/playlistApi"
import { useFetchTracksQuery } from "@/providers/api/trackApi"
import AlbumSlider from "../../components/shared/Album/AlbumSlider"
import ArtistSlider from "../../components/shared/Artist/ArtistSlider"
import PlaylistSlider from "../../components/shared/Playlist/PlaylistSlider"
import { useSelector } from "react-redux"
import { useFetchArtistsCollectionQuery } from "@/providers/api/collectionApi"
import Typography from "@/components/customs/Typography"
import { Fragment } from "react"

const HomePage = () => {
   const { uid, authenticated } = useSelector((state) => state.auth)
   const fetchTracksResponse = useFetchTracksQuery({
      skip: 0,
      limit: 5
   })
   const fetchPlaylistsResponse = useFetchUserPlaylistsQuery({
      id: import.meta.env.VITE_ADMIN_ID,
      query: { skip: 0, limit: 10 }
   })
   const fetchArtistsResponse = useFetchArtistsQuery({ skip: 0, limit: 10 })
   const fetchAlbumsResponse = useFetchAlbumsQuery({
      skip: 0,
      limit: 10
   })
   const userArtistsCollection = useFetchArtistsCollectionQuery(undefined, { skip: !authenticated })
   const userPlaylists = useFetchUserPlaylistsQuery({ id: uid }, { skip: !authenticated })

   return (
      <Fragment>
         <section className="pb-10">
            <Typography tranform="capitalize" size="2xl">
               most popular
            </Typography>
            <TrackList data={fetchTracksResponse.data} status={{ isFetching: fetchTracksResponse.isFetching }} />
         </section>

         <section>
            <Typography tranform="capitalize" size="2xl">
               Bass Station mixes
            </Typography>
            <PlaylistSlider data={fetchPlaylistsResponse.data} status={{ isFetching: fetchPlaylistsResponse.isFetching }} />
         </section>

         <section>
            <Typography tranform="capitalize" size="2xl">
               artists you also like
            </Typography>
            <ArtistSlider data={fetchArtistsResponse.data} status={{ isFetching: fetchArtistsResponse.isFetching }} />
         </section>

         <section>
            <Typography tranform="capitalize" size="2xl">
               new albums
            </Typography>
            <AlbumSlider data={fetchAlbumsResponse.data} status={{ isFetching: fetchAlbumsResponse.isFetching }} />
         </section>

         {Array.isArray(userArtistsCollection.data) && userArtistsCollection.data.length > 0 && (
            <section>
               <Typography tranform="capitalize" size="2xl">
                  your favourite artists
               </Typography>
               <ArtistSlider data={userArtistsCollection.data} status={{ isFetching: fetchArtistsResponse.isFetching }} />
            </section>
         )}

         {Array.isArray(userPlaylists.data) && userPlaylists.data?.length > 0 && (
            <section>
               <Typography tranform="capitalize" size="2xl">
                  your playlists
               </Typography>
               <PlaylistSlider data={userPlaylists.data} status={{ isFetching: fetchPlaylistsResponse.isFetching }} />
            </section>
         )}
      </Fragment>
   )
}

export default HomePage
