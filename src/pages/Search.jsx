import { useFetchAllGenresQuery } from "@/app/services/genreApi"
import Tabs from "@/components/customs/Atomics/Tabs"
import GenreList from "@/components/shared/Genre/GenreList"
import TrackList from "@/components/shared/Track/TrackList"
import { AppContext } from "@/context/AppProvider"
import { useContext } from "react"
import { Typography } from "./Home"

import AlbumList from "@/components/shared/Album/AlbumList"
import ArtistList from "@/components/shared/Artist/ArtistList"
import PlaylistList from "@/components/shared/Playlist/PlaylistList"

const Search = () => {
    const { data, isFetching, isError } = useFetchAllGenresQuery(undefined)
    const { searchResult } = useContext(AppContext)

    return (
        <section>
            {searchResult ? (
                <>
                    <Tabs
                        tabType="boxed"
                        data={[
                            {
                                title: "All",
                                pannelElement: (
                                    <div>
                                        {searchResult.tracks?.length > 0 && (
                                            <section>
                                                <Typography>Tracks</Typography>
                                                <TrackList data={searchResult.tracks} />
                                            </section>
                                        )}
                                        {searchResult.artists?.length > 0 && (
                                            <section>
                                                <Typography>Artists</Typography>
                                                <ArtistList data={searchResult.artists} />
                                            </section>
                                        )}
                                        {searchResult.albums?.length > 0 && (
                                            <section>
                                                <Typography>Albums</Typography>
                                                <AlbumList data={searchResult.albums} />
                                            </section>
                                        )}
                                        {searchResult.playlists?.length > 0 && (
                                            <section>
                                                <Typography>Playlists</Typography>
                                                <PlaylistList data={searchResult.playlists} />
                                            </section>
                                        )}
                                    </div>
                                )
                            },
                            {
                                title: "Tracks",
                                pannelElement: <TrackList data={searchResult.tracks} />
                            },
                            {
                                title: "Albums",
                                pannelElement: <AlbumList data={searchResult.albums} />
                            },
                            {
                                title: "Aritsts",
                                pannelElement: <ArtistList data={searchResult.artists} />
                            },
                            {
                                title: "Playlists",
                                pannelElement: <PlaylistList data={searchResult.playlists} />
                            }
                        ]}
                    />
                </>
            ) : (
                <>
                    <Typography>Discovery</Typography>
                    <GenreList data={data} status={{ isFetching: isFetching, isError: isError }} />
                </>
            )}
        </section>
    )
}

export default Search
