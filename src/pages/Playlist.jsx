import { useFetchSinglePlaylistQuery } from "@/app/redux/api/playlistApi"
import { setCurrentPlaylist } from "@/app/redux/slice/queueSlice"
import { useContext } from "react"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { AppContext } from "../context/AppProvider"
import ErrorBoundary from "../components/customs/ErrorBoundary"
import Button from "../components/customs/Atomics/Button"
import TrackList from "../components/shared/Track/TrackList"

const Playlist = () => {
    const { id } = useParams()
    const { data, isFetching } = useFetchSinglePlaylistQuery(id)
    const { playState, setPlayState } = useContext(AppContext)
    const dispatch = useDispatch()
    const { currentPlaylist } = useSelector((state) => state.queue)
    console.log(data)
    const togglePlayPlaylist = () => {
        if (data._id && data._id !== currentPlaylist) {
            dispatch(setCurrentPlaylist(data))
        }
        setPlayState(!playState)
    }
    return (
        <ErrorBoundary>
            <section className="group relative">
                <div className="hero place-content-start rounded-lg bg-gradient-to-r from-neutral to-transparent">
                    <div className="hero-content flex-row sm:flex-col md:flex-col xl:gap-6 xxl:gap-10">
                        <img
                            src={data?.thumbnail}
                            className="max-w-sm rounded-lg shadow-2xl"
                        />
                        <div className="sm:self-start">
                            <p className="first-letter:uppercase">
                                {data?.public
                                    ? "public playlist"
                                    : "private playlist"}
                            </p>
                            <h1 className="text-5xl font-bold">
                                {data?.title}
                            </h1>
                            <p className="my-2 text-lg">
                                {Array.isArray(data?.tracks)
                                    ? data?.tracks?.length
                                    : 0}{" "}
                                tracks
                            </p>
                            <p className="my-4">
                                Created by{" "}
                                <Link className="font-bold text-base-content">
                                    {data?.creator?.username}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <Button
                    shape="circle"
                    color="success"
                    className="absolute bottom-4 right-4 text-xl"
                    onClick={togglePlayPlaylist}
                >
                    {playState ? <BsPauseFill /> : <BsPlayFill />}
                </Button>
            </section>

            {Array.isArray(data?.tracks) && (
                <TrackList data={data?.tracks || []} />
            )}
        </ErrorBoundary>
    )
}

export default Playlist
