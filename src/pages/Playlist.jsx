import { useFetchSinglePlaylistQuery } from "@/app/api/playlistApi"
import { setCurrentPlaylist } from "@/app/slices/queueSlice"
import { useContext } from "react"
import {
    BsHeart,
    BsPauseFill,
    BsPencil,
    BsPlayFill,
    BsThreeDots
} from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { AppContext } from "../context/AppProvider"
import ErrorBoundary from "../components/customs/ErrorBoundary"
import Button from "../components/customs/Atomics/Button"
import TrackList from "../components/shared/Track/TrackList"
import DefaultThumbnail from "/images/default-thumbnail.png"
import {
    Dropdown,
    DropdownContent
} from "@/components/customs/Atomics/Dropdown"
import { Menu, MenuItem } from "@/components/customs/Atomics/Menu"
import { Figure } from "@/components/customs/Atomics/Card"
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
                <div className="hero glass place-content-start rounded-lg sm:place-content-center ">
                    <div className="hero-content flex-row sm:flex-col md:flex-col xl:gap-6 xxl:gap-10">
                        <Figure mask="square">
                            <img
                                src={
                                    data?.thumbnail !== ""
                                        ? data?.thumbnail
                                        : DefaultThumbnail
                                }
                                className="max-w-[240px] rounded-lg shadow-2xl "
                            />
                        </Figure>
                        <div className="sm:self-start">
                            <p className="first-letter:uppercase sm:text-sm">
                                {data?.public
                                    ? "public playlist"
                                    : "private playlist"}
                            </p>
                            <h1 className="text-5xl font-bold sm:text-2xl">
                                {data?.title}
                            </h1>
                            <p className="my-2 text-lg sm:text-sm">
                                {Array.isArray(data?.tracks)
                                    ? data?.tracks?.length
                                    : 0}{" "}
                                tracks
                            </p>
                            <p className="my-4">
                                Created by{" "}
                                <Link className="font-bold text-base-content hover:link">
                                    {data?.creator?.username}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <Dropdown
                    className="absolute top-0 right-0"
                    position="bottom-end"
                >
                    <Button
                        color="transparent"
                        className="text-xl"
                        tabIndex={0}
                    >
                        <BsThreeDots />
                    </Button>
                    <DropdownContent tabIndex={0} className="bg-base-300">
                        <Menu>
                            <MenuItem>
                                <a role="menuitem">
                                    <BsPencil /> Edit Playlist
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a role="menuitem">
                                    <BsHeart /> Save to your library
                                </a>
                            </MenuItem>
                        </Menu>
                    </DropdownContent>
                </Dropdown>
                <Button
                    shape="circle"
                    color="success"
                    className="absolute bottom-4 right-4 text-xl sm:right-2 sm:bottom-2"
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
