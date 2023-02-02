import { useFetchSingleAlbumQuery } from "@/app/services/albumApi"
import Button from "@/components/customs/atoms/Button"
import ErrorBoundary from "@/components/customs/ErrorBoundary"
import TrackList from "@/components/shared/Track/TrackList"
import { AppContext } from "@/context/AppProvider"
import { useContext } from "react"
import { BsPlayFill } from "react-icons/bs"

import { Link, useParams } from "react-router-dom"
import HeroBanner from "../customs/atoms/HeroBanner"
import DefaultThumbnail from "/images/default-thumbnail.png"

const AlbumPage = () => {
    const { id } = useParams()
    const { data } = useFetchSingleAlbumQuery(id)
    console.log("album:>>", data)
    const { playState, setPlayState } = useContext(AppContext)
    const togglePlayPlaylist = () => {
        if (data._id && data._id !== currentPlaylist) {
            dispatch(setCurrentPlaylist(data))
        }
        setPlayState(!playState)
    }
    return (
        <ErrorBoundary>
            <HeroBanner heroImageUrl={data?.album?.image || DefaultThumbnail}>
                <div className="flex flex-col gap-4">
                    <h1 className="text-6xl font-bold sm:text-4xl md:text-4xl ">{data?.album?.title}</h1>
                    <p className="flex items-center gap-4 text-lg sm:text-sm">{Array.isArray(data?.tracks) ? data?.tracks?.length : 0} tracks</p>

                    <Link className="font-semibold text-base-content hover:link">{data?.album?.artist?.name}</Link>

                    <p className="text-base-content/50">
                        Relased at <span className="font-semibold text-base-content">{new Date(data?.album?.releaseDate).toLocaleDateString()}</span>
                    </p>
                    <Button shape="circle" color="success">
                        <BsPlayFill />
                    </Button>
                </div>
            </HeroBanner>

            <TrackList data={data?.tracks} />
        </ErrorBoundary>
    )
}

export default AlbumPage
