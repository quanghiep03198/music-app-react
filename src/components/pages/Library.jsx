import { useFetchAlbumsCollectionQuery, useFetchArtistsCollectionQuery } from "@/app/services/collectionApi"
import Tabs from "../customs/atoms/Tabs"
import AlbumList from "../shared/Album/AlbumList"
import ArtistList from "../shared/Artist/ArtistList"

const Library = () => {
    // const userPlaylists = useFetchUserPlaylistsQuery(undefined,{skip:})

    const userAlbumsCollection = useFetchAlbumsCollectionQuery(undefined)
    const userArtistsCollection = useFetchArtistsCollectionQuery(undefined)
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
            <Tabs data={tabData} tabType="boxed" />
        </>
    )
}

export default Library
