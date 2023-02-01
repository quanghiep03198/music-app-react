import tw from "tailwind-styled-components"
import TrackList from "../shared/Track/TrackList"

import { useFetchTracksQuery } from "@/app/services/trackApi"
import AlbumSlider from "../shared/Album/AlbumSlider"
import ArtistSlider from "../shared/Artist/ArtistSlider"
import PlaylistSlider from "../shared/Playlist/PlaylistSlider"
import { useFetchAlbumsQuery } from "@/app/services/albumApi"
import { useFetchArtistsQuery } from "@/app/services/artistApi"
import { useFetchUserPlaylistsQuery } from "@/app/services/playlistApi"

export const Typography = tw.h1`text-2xl font-semibold first-letter:uppercase mb-3`
export const PageContent = tw.div`flex flex-col gap-10 items-stretch`

const HomePage = () => {
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
    return (
        <>
            <section className="pb-10">
                <Typography>most popular</Typography>
                <TrackList data={fetchTracksResponse.data} status={{ isFetching: fetchTracksResponse.isFetching }} />
            </section>

            <section>
                <Typography className="!normal-case">Bass Station mixes</Typography>
                <PlaylistSlider data={fetchPlaylistsResponse.data} status={{ isFetching: fetchPlaylistsResponse.isFetching }} />
            </section>

            <section>
                <Typography>artists you also like</Typography>
                <ArtistSlider data={fetchArtistsResponse.data} status={{ isFetching: fetchArtistsResponse.isFetching }} />
            </section>

            <section>
                <Typography>new albums</Typography>
                <AlbumSlider data={fetchAlbumsResponse.data} status={{ isFetching: fetchAlbumsResponse.isFetching }} />
            </section>
        </>
    )
}

export default HomePage
