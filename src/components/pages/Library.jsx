import { useFetchAlbumsCollectionQuery, useFetchArtistsCollectionQuery } from "@/app/services/collectionApi"
<<<<<<< HEAD
import { useFetchTracksUserUploadedQuery } from "@/app/services/trackApi"
import { lazy, Suspense } from "react"
import Loading from "../customs/atoms/Loading"
import Tabs from "../customs/atoms/Tabs"
import Typography from "../customs/atoms/Typography"

const AlbumList = lazy(() => import("../shared/Album/AlbumList"))
const ArtistList = lazy(() => import("../shared/Artist/ArtistList"))
const TrackList = lazy(() => import("../shared/Track/TrackList"))
=======
import Tabs from "../customs/atoms/Tabs"
import AlbumList from "../shared/Album/AlbumList"
import ArtistList from "../shared/Artist/ArtistList"

>>>>>>> 249c10de1e8d8f3d0612943a04dc3e5a84ae8728
const Library = () => {
    // const userPlaylists = useFetchUserPlaylistsQuery(undefined,{skip:})

    const userAlbumsCollection = useFetchAlbumsCollectionQuery(undefined)
    const userArtistsCollection = useFetchArtistsCollectionQuery(undefined)
<<<<<<< HEAD

    const uploadedTracks = useFetchTracksUserUploadedQuery(undefined)
    const tabData = [
        {
            title: "Albums",
            pannelElement: (
                <Suspense
                    fallback={
                        <div className="p-10">
                            <Loading />
                        </div>
                    }
                >
                    <AlbumList data={userAlbumsCollection.data} status={{ isFetching: userAlbumsCollection.isFetching }} />
                </Suspense>
            )
        },
        {
            title: "Artists",
            pannelElement: (
                <Suspense
                    fallback={
                        <div className="p-10">
                            <Loading />
                        </div>
                    }
                >
                    <ArtistList data={userArtistsCollection.data} status={{ isFetching: userArtistsCollection.isFetching }} />
                </Suspense>
            )
        },
        {
            title: "Uploaded",
            pannelElement: (
                <Suspense
                    fallback={
                        <div className="p-10">
                            <Loading />
                        </div>
                    }
                >
                    <TrackList data={uploadedTracks.data} status={{ isFetching: uploadedTracks.isFetching }} />
                </Suspense>
            )
        }
    ]
    return (
        <>
            <Typography size="4xl">Your Library</Typography>
=======
    console.log(userArtistsCollection.data)
    const uploadedTrack = []
    const tabData = [
        {
            title: "Albums",
            pannelElement: <AlbumList data={userAlbumsCollection.data} status={{ isFetching: userAlbumsCollection.isFetching }} />
        },
        {
            title: "Artists",
            pannelElement: <ArtistList data={userArtistsCollection.data} status={{ isFetching: userArtistsCollection.isFetching }} />
        }
        // {
        //     title: "Uploaded",
        //     pannelElement: <AlbumList data={userArtistsCollection.data} status={{ isFetching: userPlaylists.isFetching }} />
        // }
    ]
    return (
        <>
>>>>>>> 249c10de1e8d8f3d0612943a04dc3e5a84ae8728
            <Tabs data={tabData} tabType="boxed" />
        </>
    )
}

export default Library
