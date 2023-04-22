import { useFetchAllGenresQuery } from "@/redux/api/genreApi"
import Tabs from "@/components/customs/@core/Tabs"
import GenreList from "@/components/shared/Genre/GenreList"
import TrackList from "@/components/shared/Track/TrackList"
import { AppContext } from "@/context/AppProvider"
import { useContext } from "react"
import Typography from "../components/customs/@core/Typography"
import AlbumList from "@/components/shared/Album/AlbumList"
import ArtistList from "@/components/shared/Artist/ArtistList"
import PlaylistList from "@/components/shared/Playlist/PlaylistList"
const Search = () => {
    const { data, isFetching, isError } = useFetchAllGenresQuery(undefined)
    const { searchResult } = useContext(AppContext)

    return (
        <section>
            {searchResult ? (
                <Tabs
                    tabType="boxed"
                    data={[
                        {
                            title: "All",
                            pannelElement: (
                                <div className="flex flex-col gap-20">
                                    {searchResult.tracks?.length > 0 && (
                                        <section>
                                            <Typography size="2xl">Tracks</Typography>
                                            <TrackList data={searchResult.tracks} status={{ isFetching: isFetching }} />
                                        </section>
                                    )}
                                    {searchResult.artists?.length > 0 && (
                                        <section>
                                            <Typography size="2xl">Artists</Typography>
                                            <ArtistList data={searchResult.artists} status={{ isFetching: isFetching }} />
                                        </section>
                                    )}
                                    {searchResult.albums?.length > 0 && (
                                        <section>
                                            <Typography size="2xl">Albums</Typography>
                                            <AlbumList data={searchResult.albums} status={{ isFetching: isFetching }} />
                                        </section>
                                    )}
                                    {searchResult.playlists?.length > 0 && (
                                        <section>
                                            <Typography size="2xl">Playlists</Typography>
                                            <PlaylistList data={searchResult.playlists} status={{ isFetching: isFetching }} />
                                        </section>
                                    )}
                                </div>
                            )
                        },
                        {
                            title: "Tracks",
                            pannelElement: <TrackList data={searchResult.tracks} status={{ isFetching: isFetching }} />
                        },
                        {
                            title: "Albums",
                            pannelElement: <AlbumList data={searchResult.albums} status={{ isFetching: isFetching }} />
                        },
                        {
                            title: "Aritsts",
                            pannelElement: <ArtistList data={searchResult.artists} status={{ isFetching: isFetching }} />
                        },
                        {
                            title: "Playlists",
                            pannelElement: <PlaylistList data={searchResult.playlists} status={{ isFetching: isFetching }} />
                        }
                    ]}
                />
            ) : (
                <>
                    <Typography size="4xl">Discovery</Typography>
                    <GenreList data={data} status={{ isFetching: isFetching, isError: isError }} />
                </>
            )}
        </section>
    )
}

export default Search
