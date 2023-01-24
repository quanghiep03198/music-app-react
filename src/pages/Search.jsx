import { useFetchAllGenresQuery } from "@/app/redux/api/genreApi"
import Tabs, { TabPannel } from "@/components/customs/Atomics/Tabs"
import ArtistCard from "@/components/shared/Artist/ArtistCard"
import GenreList from "@/components/shared/Genre/GenreList"
import TrackList from "@/components/shared/Track/TrackList"
import { AppContext } from "@/context/AppProvider"
import { useState } from "react"
import { useContext } from "react"
import { Typography } from "./Home"

import {
    AllResultPannel,
    TrackPannel,
    ArtistPannel,
    AlbumPannel,
    PlaylistPannel
} from "@/components/shared/Pannels"
import { useEffect } from "react"

const Search = () => {
    const { data, isFetching } = useFetchAllGenresQuery()
    const { searchResult } = useContext(AppContext)
    const [currentTabIndex, setCurrentTabIndex] = useState(1)
    console.log(searchResult)

    return (
        <section>
            {searchResult ? (
                <>
                    <Tabs
                        tw="tabs-boxed mb-6"
                        currentTabIndex={currentTabIndex}
                        onChangeTab={setCurrentTabIndex}
                        tabData={[
                            { children: "All" },
                            { children: "Tracks" },
                            { children: "Artists" },
                            { children: "Albums" },
                            { children: "Playlists" }
                        ]}
                    />
                    <AllResultPannel
                        isActive={currentTabIndex === 1}
                        data={searchResult}
                    />
                    <TrackPannel
                        isActive={currentTabIndex === 2}
                        tracks={searchResult?.tracks}
                    />
                    <ArtistPannel
                        isActive={currentTabIndex === 3}
                        artists={searchResult?.artists}
                    />
                    <AlbumPannel
                        isActive={currentTabIndex === 4}
                        albums={searchResult?.albums}
                    />
                    <PlaylistPannel
                        isActive={currentTabIndex === 5}
                        playlists={searchResult?.playlists}
                    />
                </>
            ) : (
                <>
                    <Typography>Discovery</Typography>
                    <GenreList data={data} />
                </>
            )}
        </section>
    )
}

export default Search
