import { setCurrentPlaylist } from "@/app/redux/slice/queueSlice"
import { AppContext } from "@/context/AppProvider"
import { useContext } from "react"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Button from "../../customs/Atomics/Button"
import { Card, CardBody, CardTitle, Figure } from "../../customs/Atomics/Card"

const PlaylistCard = ({ playlist }) => {
    const { playState, setPlayState } = useContext(AppContext)
    const dispatch = useDispatch()
    const { currentPlaylist } = useSelector((state) => state.queue)

    const playThisPlaylist = (playlist) => {
        setPlayState(!playState)
        if (currentPlaylist !== playlist._id) {
            dispatch(setCurrentPlaylist(playlist))
        }
    }
    return (
        <Card>
            <div className=" relative max-w-full">
                <Link to={`/playlist/${playlist?._id}`}>
                    {Array.isArray(playlist.thumbnail) ? (
                        <div className="grid grid-cols-4">
                            {playlist.thumbnail.map((thumbnail) => (
                                <Figure>
                                    <img src={thumbnail} loading="lazy" />
                                </Figure>
                            ))}
                        </div>
                    ) : (
                        <Figure>
                            <img src={playlist?.thumbnail} alt="" />
                        </Figure>
                    )}
                </Link>
                <Button
                    shape="circle"
                    color="success"
                    className="sm:text-md absolute bottom-2 right-2 z-[999] translate-y-2 text-xl opacity-0 duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:btn-sm"
                    onClick={() => playThisPlaylist(playlist)}
                >
                    {playState && currentPlaylist === playlist._id ? (
                        <BsPauseFill />
                    ) : (
                        <BsPlayFill />
                    )}
                </Button>
            </div>
            <CardBody>
                <Link to={`/playlist/${playlist?._id}`} className="hover:link">
                    <CardTitle>{playlist?.title}</CardTitle>
                </Link>
                <p className="text-base-content/50 sm:text-sm">
                    Created at:{" "}
                    {playlist.createdAt &&
                        new Date(playlist.createdAt).toLocaleDateString()}
                </p>
            </CardBody>
        </Card>
    )
}

export default PlaylistCard
