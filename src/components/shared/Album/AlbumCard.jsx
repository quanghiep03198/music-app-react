import { useFetchAlbumsCollectionQuery, useUpdateAlbumsCollectionMutation } from "@/app/services/collectionApi"
import { setCurrentPlaylist } from "@/app/slices/queueSlice"
import Loading from "@/components/customs/atoms/Loading"
import Swap from "@/components/customs/atoms/Swap"
import { AppContext } from "@/context/AppProvider"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { BsHeart, BsHeartFill, BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Button from "../../customs/atoms/Button"
import { Card, CardBody, Figure } from "../../customs/atoms/Card"
import DefaultAlbumThumbnail from "/images/default-album-image.png"

const AlbumCard = ({ albumData }) => {
    const { playState, setPlayState } = useContext(AppContext)
    const dispatch = useDispatch()
    const [updateAlbumCollection, { isLoading }] = useUpdateAlbumsCollectionMutation()
    const authenticated = useSelector((state) => state.auth?.authenticated)
    const { data: albumsCollection } = useFetchAlbumsCollectionQuery(undefined, { skip: !authenticated })
    const { currentPlaylist } = useSelector((state) => state.queue)
    const [isLiked, setIsLiked] = useState(false)
    useEffect(() => {
        let isLiked = Array.isArray(albumsCollection) ? albumsCollection?.find((album) => album._id === albumData._id) !== undefined : false
        setIsLiked(isLiked)
    }, [])

    const playThisAlbum = async (album) => {
        if (album._id !== currentPlaylist) {
            const { tracks } = await axios.get(`/albums/${album._id}`)
            if (!Array.isArray(tracks) || tracks.length === 0) {
                toast.info("Album is updating!", { toastId: album._id })
                return
            }
            dispatch(setCurrentPlaylist({ ...album, tracks }))
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
                <img
                    src={albumData?.image}
                    loading="lazy"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = DefaultAlbumThumbnail
                    }}
                />
                <Button
                    shape="circle"
                    color="success"
                    className="sm:text-md absolute bottom-2 right-2  translate-y-2 text-xl opacity-0 duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:btn-sm"
                    onClick={() => playThisAlbum(albumData)}
                >
                    {playState && currentPlaylist === albumData?._id ? <BsPauseFill /> : <BsPlayFill />}
                </Button>
            </Figure>
            <CardBody>
                <label className="label p-0">
                    <Link to={`/album/${albumData?._id}`} className="card-title flex-1 truncate hover:link sm:text-base">
                        {albumData?.title}
                    </Link>
                    {isLoading ? (
                        <Loading />
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

export default AlbumCard
