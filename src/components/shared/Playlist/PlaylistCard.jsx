import { setCurrentPlaylist } from "@/app/slices/queueSlice"
import { AppContext } from "@/context/AppProvider"
import useRenderOnScroll from "@/hooks/useRenderOnScroll"
import { useContext, useRef } from "react"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Button from "../../customs/atoms/Button"
import { Card, CardBody, CardTitle, Figure, SkeletonImage } from "../../customs/atoms/Card"
import SkeletonCard from "../Skeletons/SkeletonCard"
import DefaultPlaylistThumbnail from "/images/default-album-image.png"

const PlaylistCard = ({ isFetching = false, playlist }) => {
    const dispatch = useDispatch()
    const { playState, setPlayState } = useContext(AppContext)
    const cardRef = useRef(null)
    const isScrolledIntoView = useRenderOnScroll(cardRef)
    const { currentPlaylist } = useSelector((state) => state.queue)

    const playThisPlaylist = (playlist) => {
        if (currentPlaylist !== playlist._id) {
            dispatch(setCurrentPlaylist({ playlistId: playlist._id, tracks: playlist?.tracks }))
            return
        }
        setPlayState(!playState)
    }
    return (
        <div ref={cardRef}>
            {!isScrolledIntoView || isFetching ? (
                <SkeletonCard />
            ) : (
                <Card>
                    <div className="relative max-w-full">
                        <Link to={`/playlist/${playlist?._id}`}>
                            <Figure>
                                <img
                                    loading="lazy"
                                    src={playlist.thumbnail !== "" ? playlist.thumbnail : DefaultPlaylistThumbnail}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null // prevents looping
                                        currentTarget.src = DefaultPlaylistThumbnail
                                    }}
                                    onLoadStart={<SkeletonImage />}
                                />
                            </Figure>
                        </Link>
                        <Button
                            shape="circle"
                            color="success"
                            className="sm:text-md absolute bottom-2 right-2  translate-y-2 text-xl opacity-0 duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:btn-sm"
                            onClick={() => playThisPlaylist(playlist)}
                        >
                            {playState && currentPlaylist === playlist._id ? <BsPauseFill /> : <BsPlayFill />}
                        </Button>
                    </div>
                    <CardBody>
                        <Link to={`/playlist/${playlist?._id}`} className="hover:link">
                            <CardTitle>{playlist?.title}</CardTitle>
                        </Link>
                        <p className="text-base-content/50 sm:text-sm">Created at: {playlist.createdAt && new Date(playlist.createdAt).toLocaleDateString()}</p>
                    </CardBody>
                </Card>
            )}
        </div>
    )
}

export default PlaylistCard
