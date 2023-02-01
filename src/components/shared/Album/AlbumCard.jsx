import { setCurrentPlaylist } from "@/app/slices/queueSlice"
import { AppContext } from "@/context/AppProvider"
import useLocalStorage from "@/hooks/useLocalStorage"
import axios from "axios"
import { useContext } from "react"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Button from "../../customs/atoms/Button"
import { Card, CardBody, Figure } from "../../customs/atoms/Card"
import DefaultAlbumThumbnail from "/images/default-album-image.png"

const AlbumCard = ({ albumData }) => {
    const [playState, setPlayState] = useLocalStorage("playState")

    const dispatch = useDispatch()
    const { currentPlaylist } = useSelector((state) => state.queue)

    const playThisAlbum = async (album) => {
        if (album._id !== currentPlaylist) {
            const { tracks } = await axios.get(`/albums/${album._id}`)
            // if album has no tracks -> show message then exit function
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
                    className="absolute bottom-2 right-2 translate-y-2 text-xl opacity-0 group-hover:translate-y-0 group-hover:opacity-100 sm:text-base sm:btn-sm"
                    onClick={() => playThisAlbum(albumData)}
                >
                    {playState && currentPlaylist === albumData?._id ? <BsPauseFill /> : <BsPlayFill />}
                </Button>
            </Figure>
            <CardBody>
                <Link to={`/album/${albumData?._id}`} className="card-title  truncate hover:link sm:text-base">
                    {albumData?.title}
                </Link>
                <Link to={`/artist/${albumData?.artist?._id}`} className="truncate text-base-content/50 hover:link sm:text-sm">
                    {albumData?.artist?.name}
                </Link>
            </CardBody>
        </Card>
    )
}

export default AlbumCard
