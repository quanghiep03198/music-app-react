import instance from "@/app/axios/instance"
import { useFetchSingleAlbumQuery } from "@/app/redux/api/albumApi"
import { setCurrentPlaylist } from "@/app/redux/slice/queueSlice"
import { AppContext } from "@/context/AppProvider"
import { useEffect } from "react"
import { useContext, useState } from "react"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Button from "../../customs/Atomics/Button"
import { Card, CardBody, Figure } from "../../customs/Atomics/Card"

const AlbumCard = ({ album }) => {
    const { playState, setPlayState } = useContext(AppContext)
    const dispatch = useDispatch()
    const { currentPlaylist } = useSelector((state) => state.queue)

    const playThisAlbum = async (album) => {
        if (album._id !== currentPlaylist) {
            const { tracks } = await instance.get(`/albums/${album._id}`)
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
                    src={album?.image}
                    loading="lazy"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = "/images/default-album-image.png"
                    }}
                />
                <Button
                    shape="circle"
                    color="success"
                    className="absolute bottom-2 right-2 translate-y-2 text-xl opacity-0 group-hover:translate-y-0 group-hover:opacity-100 sm:text-base sm:btn-sm"
                    onClick={() => playThisAlbum(album)}
                >
                    {playState && currentPlaylist === album?._id ? (
                        <BsPauseFill />
                    ) : (
                        <BsPlayFill />
                    )}
                </Button>
            </Figure>
            <CardBody>
                <Link
                    to={`/album/${album?._id}`}
                    className="card-title hover:link sm:text-base"
                >
                    {album?.title}
                </Link>
                <Link
                    to={`/artist/${album.artist?._id}`}
                    className="text-base-content/50 hover:link sm:text-sm"
                >
                    {album.artist?.name}
                </Link>
            </CardBody>
        </Card>
    )
}

export default AlbumCard
