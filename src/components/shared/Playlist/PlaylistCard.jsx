import { setCurrentPlaylist } from "@/app/slices/queueSlice"
import { AppContext } from "@/context/AppProvider"
import useRenderOnScroll from "@/hooks/useRenderOnScroll"
import { memo, useContext, useRef, useState } from "react"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Button from "../../customs/atoms/Button"
import { Card, CardBody, CardTitle, Figure, SkeletonImage } from "../../customs/atoms/Card"
import SkeletonCard from "../Skeletons/SkeletonCard"
import DefaultPlaylistThumbnail from "/images/default-album-image.png"

const PlaylistCard = ({ isFetching, data }) => {
    const dispatch = useDispatch()
    const { playState, setPlayState } = useContext(AppContext)
    const cardRef = useRef(null)
    const [isLoadingImage, setIsLoadingImage] = useState(true)
    const isScrolledIntoView = useRenderOnScroll(cardRef)
    const { currentPlaylist } = useSelector((state) => state.queue)

    const playThisPlaylist = () => {
        setPlayState(!playState)
        if (currentPlaylist !== data._id) {
            dispatch(setCurrentPlaylist({ listId: data._id, tracks: data?.tracks }))
        }
    }

    return (
        <div ref={cardRef}>
            {!isScrolledIntoView ? (
                <SkeletonCard />
            ) : (
                <Card>
                    <div className="relative max-w-full">
                        <Link to={`/playlist/${data?._id}`}>
                            <Figure>
                                {isLoadingImage && <SkeletonImage tw="min-w-full" />}
                                <img
                                    src={!data.thumbnail ? DefaultPlaylistThumbnail : data.thumbnail}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null // prevents looping
                                        currentTarget.src = DefaultPlaylistThumbnail
                                    }}
                                    alt="thumbnail"
                                    loading="eager"
                                    className={isLoadingImage ? "hidden" : "aspect-square min-w-full object-cover"}
                                    onLoad={() => setIsLoadingImage(false)}
                                />
                            </Figure>
                        </Link>
                        <Button
                            shape="circle"
                            color="success"
                            className="sm:text-md absolute bottom-2 right-2  translate-y-2 text-xl opacity-0 duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:btn-sm"
                            onClick={playThisPlaylist}>
                            {playState && currentPlaylist === data._id ? <BsPauseFill /> : <BsPlayFill />}
                        </Button>
                    </div>
                    <CardBody>
                        <Link to={`/playlist/${data?._id}`} className="hover:link">
                            <CardTitle>{data?.title}</CardTitle>
                        </Link>
                        <p className="text-base-content/50 sm:text-sm">Created at: {data.createdAt && new Date(data.createdAt).toLocaleDateString()}</p>
                    </CardBody>
                </Card>
            )}
        </div>
    )
}

export default memo(PlaylistCard)
