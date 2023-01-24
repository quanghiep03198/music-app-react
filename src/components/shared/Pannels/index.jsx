import { TabPannel } from "@/components/customs/Atomics/Tabs"
import { Typography } from "@/pages/Home"
import { BsFileEarmarkMusic } from "react-icons/bs"
import AlbumCard from "../Album/AlbumCard"
import ArtistCard from "../Artist/ArtistCard"
import PlaylistCard from "../Playlist/PlaylistCard"
import TrackList from "../Track/TrackList"

const EmptyPannel = () => {
    return (
        <div className="hero min-h-full place-content-center">
            <div className="hero-content place-content-center text-center">
                <div className="flex flex-col items-center justify-center gap-6">
                    <BsFileEarmarkMusic className="text-center text-9xl text-base-content/20" />
                    <p className="py-6 text-xl tracking-wider">
                        It seems to be empty!
                    </p>
                </div>
            </div>
        </div>
    )
}

export const AllResultPannel = ({ data, isActive }) => {
    if (data.status === 404) return <EmptyPannel />
    return (
        <TabPannel isActive={isActive}>
            {Array.isArray(data?.tracks) && data?.tracks?.length > 0 && (
                <section>
                    <Typography>Tracks</Typography>
                    <TrackList data={data.tracks} />
                </section>
            )}

            {Array.isArray(data?.artists) && data?.artists?.length > 0 && (
                <section>
                    <Typography>Artists</Typography>
                    <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
                        {data.artists.map((artist) => (
                            <ArtistCard key={artist._id} artistData={artist} />
                        ))}
                    </div>
                </section>
            )}
            {Array.isArray(data?.albums) && data?.albums?.length > 0 && (
                <section>
                    <Typography>Albums</Typography>
                    <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
                        {data.albums.map((album) => (
                            <AlbumCard key={album._id} albumData={album} />
                        ))}
                    </div>
                </section>
            )}
            {Array.isArray(data?.playlists) && data?.playlists?.length > 0 && (
                <section>
                    <Typography>playlists</Typography>
                    <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
                        {data.playlists.map((artist) => (
                            <ArtistCard key={artist._id} artistData={artist} />
                        ))}
                    </div>
                </section>
            )}
        </TabPannel>
    )
}

export const TrackPannel = ({ tracks, isActive }) => {
    return (
        Array.isArray(tracks) && (
            <TabPannel isActive={isActive}>
                <TrackList data={tracks} />
            </TabPannel>
        )
    )
}

export const ArtistPannel = ({ artists, isActive }) => {
    return (
        Array.isArray(artists) && (
            <TabPannel isActive={isActive}>
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
                    {artists.map((artist) => (
                        <ArtistCard key={artist._id} artistData={artist} />
                    ))}
                </div>
            </TabPannel>
        )
    )
}

export const AlbumPannel = ({ albums, isActive }) => {
    return (
        Array.isArray(albums) && (
            <TabPannel isActive={isActive}>
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
                    {albums.map((album) => (
                        <AlbumCard key={album._id} album={album} />
                    ))}
                </div>
            </TabPannel>
        )
    )
}
export const PlaylistPannel = ({ playlists, isActive }) => {
    return (
        Array.isArray(playlists) && (
            <TabPannel isActive={isActive}>
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
                    {playlists.map((artist) => (
                        <PlaylistCard key={artist._id} artistData={artist} />
                    ))}
                </div>
            </TabPannel>
        )
    )
}
