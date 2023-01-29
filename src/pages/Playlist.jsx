import { useFetchSinglePlaylistQuery } from "@/app/services/playlistApi"
import { setCurrentPlaylist } from "@/app/slices/queueSlice"
import { Dropdown, DropdownContent } from "@/components/customs/Atomics/Dropdown"
import HeroBanner from "@/components/customs/Atomics/HeroBanner"
import { Menu, MenuItem } from "@/components/customs/Atomics/Menu"
import { useContext } from "react"
import { BsPauseFill, BsPencil, BsPlayFill, BsThreeDots, BsX } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Button from "../components/customs/Atomics/Button"
import TrackList from "../components/shared/Track/TrackList"
import { AppContext } from "../context/AppProvider"
import DefaultThumbnail from "/images/default-thumbnail.png"

const Playlist = () => {
    const { id } = useParams()
    const { data, isFetching } = useFetchSinglePlaylistQuery(id)
    const { playState, setPlayState } = useContext(AppContext)
    const { currentPlaylist } = useSelector((state) => state.playback)

    const dispatch = useDispatch()

    const togglePlayPlaylist = () => {
        if (data._id && data._id !== currentPlaylist) {
            dispatch(setCurrentPlaylist(data))
        }
        setPlayState(!playState)
    }
    return (
        <div className="flex flex-col gap-10">
            <section className="group relative">
                <HeroBanner heroImageUrl={data?.thumbnail !== "" ? data?.thumbnail : DefaultThumbnail}>
                    <small className="first-letter:uppercase">{data?.public ? "public playlist" : "private playlist"}</small>
                    <h1 className="text-6xl font-bold sm:text-3xl md:text-4xl">{data?.title}</h1>
                    <p className="sm:text-sm">{data?.tracks?.length || 0} tracks</p>
                    <p>
                        <span>Created by </span>
                        <Link className="font-bold text-base-content hover:link">{data?.creator?.username}</Link>
                    </p>
                    <Button shape="circle" color="success" className="text-xl sm:text-base" onClick={togglePlayPlaylist}>
                        {playState && currentPlaylist === data._id ? <BsPauseFill /> : <BsPlayFill />}
                    </Button>
                </HeroBanner>

                <Dropdown className="absolute top-0 right-0" position="bottom-end">
                    <Button color="transparent" className="text-xl" tabIndex={0}>
                        <BsThreeDots />
                    </Button>
                    <DropdownContent tabIndex={0} className="bg-base-300">
                        <Menu>
                            <MenuItem>
                                <a role="menuitem">
                                    <BsPencil /> Edit playlist
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a role="menuitem" className="text-error">
                                    <BsX className="text-xl" /> Delete this playlist
                                </a>
                            </MenuItem>
                        </Menu>
                    </DropdownContent>
                </Dropdown>
            </section>

            {Array.isArray(data?.tracks) && <TrackList data={data?.tracks} status={{ isFetching: isFetching }} />}
        </div>
    )
}

export default Playlist
