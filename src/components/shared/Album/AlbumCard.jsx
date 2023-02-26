import { useFetchAlbumsCollectionQuery, useUpdateAlbumsCollectionMutation } from "@/app/services/collectionApi"
import { setCurrentPlaylist } from "@/app/slices/queueSlice"
import Swap from "@/components/customs/atoms/Swap"
import { AppContext } from "@/context/AppProvider"
import axios from "axios"
import { memo, useContext, useEffect, useState } from "react"
import { BsHeart, BsHeartFill, BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Button from "../../customs/atoms/Button"
import { Card, CardBody, CardTitle, Figure, SkeletonImage } from "../../customs/atoms/Card"
import DefaultAlbumThumbnail from "/images/default-album-image.png"

const AlbumCard = ({ albumData }) => {
    const { playState, setPlayState } = useContext(AppContext)
    const dispatch = useDispatch()
    const [updateAlbumCollection, { isLoading }] = useUpdateAlbumsCollectionMutation()
    const authenticated = useSelector((state) => state.auth?.authenticated)
    const albumsCollection = useSelector((state) => state.collections?.albums)
    const { currentPlaylist } = useSelector((state) => state.queue)
    const [isLiked, setIsLiked] = useState(false)
    const [isLoadingImage, setIsLoadingImage] = useState(true)

    useEffect(() => {
        let isLiked = Array.isArray(albumsCollection) && albumsCollection?.some((album) => album._id === albumData._id)
        setIsLiked(isLiked)
    }, [])

    const playThisAlbum = async () => {
        if (albumData._id !== currentPlaylist) {
            const { tracks } = await axios.get(`/albums/${albumData._id}`)
            if (!Array.isArray(tracks) || tracks.length === 0) {
                toast.info("Album is updating!", { toastId: albumData._id })
                return
            }
            dispatch(setCurrentPlaylist({ listId: albumData._id, tracks: tracks, ...albumData }))
            setPlayState(true)
        } else {
            setPlayState(!playState)
        }
    }

    const handleToggleAddToLibrary = async (album) => {
        try {
            const response = await updateAlbumCollection(album)
            if (!response) throw new Error("Failed to add to your library")
            setIsLiked(!isLiked)
            !isLiked ? toast.success("Added to your library!") : toast.info("Removed from your library!")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <Card>
            <Figure shape="square">
                {isLoadingImage && <SkeletonImage tw="min-w-full aspect-[1]" />}
                <img
                    src={albumData?.image}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = DefaultAlbumThumbnail
                    }}
                    alt="thumbnail"
                    loading="eager"
                    className={isLoadingImage ? "hidden" : "aspect-square min-w-full object-cover"}
                    onLoad={() => setIsLoadingImage(false)}
                />
                <Button
                    shape="circle"
                    color="success"
                    className="sm:text-md absolute bottom-2 right-2  translate-y-2 text-xl opacity-0 duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:btn-sm"
                    onClick={playThisAlbum}>
                    {playState && currentPlaylist === albumData?._id ? <BsPauseFill /> : <BsPlayFill />}
                </Button>
            </Figure>
            <CardBody>
                <label className="label p-0">
                    <Link to={`/album/${albumData?._id}`} className="card-title flex-1 truncate hover:link sm:text-base">
                        <CardTitle>{albumData?.title}</CardTitle>
                    </Link>
                    {isLoading ? (
                        <BsHeartFill className="animate-pulse text-xl text-success" />
                    ) : (
                        <Swap
                            swapon={<BsHeartFill className="text-xl text-success" />}
                            swapoff={<BsHeart className="text-xl" />}
                            onChange={() => handleToggleAddToLibrary(albumData)}
                            checked={isLiked}
                        />
                    )}
                </label>
                <Link to={`/artist/${albumData?.artist?._id}`} className="truncate text-base-content/50 hover:link sm:text-sm">
                    {albumData?.artist?.name}
                </Link>
            </CardBody>
        </Card>
    )
}

export default memo(AlbumCard)
