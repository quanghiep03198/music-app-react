import { useFetchAllGenresQuery } from "@/providers/api/genreApi"
import GenreList from "@/components/shared/Genre/GenreList"
import TrackList from "@/components/shared/Track/TrackList"
import { AppContext } from "@/context/AppProvider"
import { Fragment, useContext, useEffect, useMemo, useState } from "react"
import Typography from "../../components/customs/Typography"
import AlbumList from "@/components/shared/Album/AlbumList"
import ArtistList from "@/components/shared/Artist/ArtistList"
import PlaylistList from "@/components/shared/Playlist/PlaylistList"
import { Tabs } from "react-daisyui"
import tw from "tailwind-styled-components"
import classNames from "classnames"

const Search = () => {
   const { data, isFetching, isError } = useFetchAllGenresQuery(undefined)
   const { searchResult } = useContext(AppContext)
   const [tabValue, setTabValue] = useState("All")

   const tabData = useMemo(
      () => [
         {
            title: "All",
            pannelElement: (
               <div className="flex flex-col gap-20">
                  {searchResult?.tracks?.length > 0 && (
                     <section>
                        <Typography size="2xl">Tracks</Typography>
                        <TrackList data={searchResult?.tracks} status={{ isFetching: isFetching }} />
                     </section>
                  )}
                  {searchResult?.artists?.length > 0 && (
                     <section>
                        <Typography size="2xl">Artists</Typography>
                        <ArtistList data={searchResult?.artists} status={{ isFetching: isFetching }} />
                     </section>
                  )}
                  {searchResult?.albums?.length > 0 && (
                     <section>
                        <Typography size="2xl">Albums</Typography>
                        <AlbumList data={searchResult?.albums} status={{ isFetching: isFetching }} />
                     </section>
                  )}
                  {searchResult?.playlists?.length > 0 && (
                     <section>
                        <Typography size="2xl">Playlists</Typography>
                        <PlaylistList data={searchResult?.playlists} status={{ isFetching: isFetching }} />
                     </section>
                  )}
               </div>
            )
         },
         {
            title: "Tracks",
            pannelElement: <TrackList data={searchResult?.tracks} status={{ isFetching: isFetching }} />
         },
         {
            title: "Albums",
            pannelElement: <AlbumList data={searchResult?.albums} status={{ isFetching: isFetching }} />
         },
         {
            title: "Aritsts",
            pannelElement: <ArtistList data={searchResult?.artists} status={{ isFetching: isFetching }} />
         },
         {
            title: "Playlists",
            pannelElement: <PlaylistList data={searchResult?.playlists} status={{ isFetching: isFetching }} />
         }
      ],
      [searchResult]
   )

   useEffect(() => {
      if (searchResult) setTabValue("All")
   }, [])

   if (searchResult)
      return (
         <Fragment>
            <Tabs onChange={setTabValue} value={tabValue} variant="lifted" size="lg">
               {tabData.map((item) => (
                  <Tabs.Tab size="lg" color="success" value={item.title}>
                     {item.title}
                  </Tabs.Tab>
               ))}
            </Tabs>
            {tabData.map((item) => (
               <Pannel className={classNames({ hidden: item.title !== tabValue })}>{item.pannelElement}</Pannel>
            ))}
         </Fragment>
      )

   return (
      <Fragment>
         <Typography size="4xl">Discovery</Typography>
         <GenreList data={data} status={{ isFetching: isFetching, isError: isError }} />
      </Fragment>
   )
}

const Pannel = tw.div`w-full`

export default Search
