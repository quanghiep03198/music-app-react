import { LoadingWrapper } from "@/components/shared/Loading/LazyLoadingScreen"

import { useFetchAlbumsCollectionQuery, useFetchArtistsCollectionQuery } from "@/redux/api/collectionApi"
import { useFetchUserPlaylistsQuery } from "@/redux/api/playlistApi"
import { useFetchTracksUserUploadedQuery } from "@/redux/api/trackApi"
import { lazy, Suspense } from "react"
import { useSelector } from "react-redux"
import Loading from "../components/customs/@core/Loading"
import Tabs from "../components/customs/@core/Tabs"
import Typography from "../components/customs/@core/Typography"

const PlaylistList = lazy(() => import("../components/shared/Playlist/PlaylistList"))
const AlbumList = lazy(() => import("../components/shared/Album/AlbumList"))
const ArtistList = lazy(() => import("../components/shared/Artist/ArtistList"))
const TrackList = lazy(() => import("../components/shared/Track/TrackList"))

const Library = () => {
    const { uid, authenticated } = useSelector((state) => state.auth)
    const userArtistsCollection = useFetchArtistsCollectionQuery(undefined, { skip: !authenticated, refetchOnMountOrArgChange: true })

    const userAlbumsCollection = useFetchAlbumsCollectionQuery(undefined, { skip: !authenticated, refetchOnMountOrArgChange: true })
    const uploadedTracks = useFetchTracksUserUploadedQuery(undefined, { skip: !authenticated, refetchOnMountOrArgChange: true })
    const userPlaylists = useFetchUserPlaylistsQuery({ id: uid }, { skip: !authenticated, refetchOnMountOrArgChange: true })

    const tabData = [
        {
            title: "Albums",
            pannelElement: (
                <Suspense
                    fallback={
                        <LoadingWrapper>
                            <Loading />
                        </LoadingWrapper>
                    }>
                    <AlbumList data={userAlbumsCollection.data} status={{ isFetching: userAlbumsCollection.isFetching }} />
                </Suspense>
            )
        },
        {
            title: "Artists",
            pannelElement: (
                <Suspense
                    fallback={
                        <LoadingWrapper>
                            <Loading />
                        </LoadingWrapper>
                    }>
                    <ArtistList data={userArtistsCollection.data} status={{ isFetching: userArtistsCollection.isFetching }} />
                </Suspense>
            )
        },
        {
            title: "Playlists",
            pannelElement: (
                <Suspense
                    fallback={
                        <LoadingWrapper>
                            <Loading />
                        </LoadingWrapper>
                    }>
                    <PlaylistList data={userPlaylists?.data} status={{ isFetching: userPlaylists.isFetching }} />
                </Suspense>
            )
        },
        {
            title: "Uploaded",
            pannelElement: (
                <Suspense
                    fallback={
                        <LoadingWrapper>
                            <Loading />
                        </LoadingWrapper>
                    }>
                    <TrackList data={uploadedTracks.data} status={{ isFetching: uploadedTracks.isFetching }} />
                </Suspense>
            )
        }
    ]

    return (
        <>
            <Typography size="4xl">Your Library</Typography>
            <Tabs data={tabData} tabType="boxed" />
        </>
    )
}

export default Library
