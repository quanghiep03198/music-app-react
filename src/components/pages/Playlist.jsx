import { useDeleteUserPlaylistMutation, useFetchSinglePlaylistQuery } from "@/app/services/playlistApi"
import { setCurrentPlaylist } from "@/app/slices/queueSlice"
import { Dropdown, DropdownContent } from "@/components/customs/atoms/Dropdown"
import HeroBanner from "@/components/customs/atoms/HeroBanner"
import { Menu, MenuItem } from "@/components/customs/atoms/Menu"
import { Fragment, useContext } from "react"
import { BsPauseFill, BsPencil, BsPlayFill, BsThreeDots, BsTrash } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../../context/AppProvider"
import Button from "../customs/atoms/Button"
import { SkeletonCardTitle, SkeletonTextCard } from "../customs/atoms/Card"
import TrackCard from "../shared/Track/TrackCard"
import DefaultThumbnail from "/images/default-album-image.png"

const Playlist = () => {
    const { id } = useParams()
    const { data: playlist, isFetching, refetch } = useFetchSinglePlaylistQuery(id, { refetchOnMountOrArgChange: true })
    const { playState, setPlayState } = useContext(AppContext)
    const { currentPlaylist } = useSelector((state) => state.queue)
    const { credential } = useSelector((state) => state.auth)
    const [deletePlaylist] = useDeleteUserPlaylistMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const togglePlayPlaylist = () => {
        if (playlist?._id && playlist?._id !== currentPlaylist) {
            dispatch(setCurrentPlaylist({ playlistId: playlist._id, tracks: playlist }))
        }
        setPlayState(!playState)
    }

    const handleDeletePlaylist = (id) => {
        deletePlaylist(id)
            .then(() => navigate("/"))
            .catch((error) => console.log(error.message))
    }

    return (
        <div className="flex h-screen flex-col gap-10">
            <section className="group relative">
                <HeroBanner heroImageUrl={playlist?.thumbnail !== "" ? playlist?.thumbnail : DefaultThumbnail}>
                    {isFetching ? (
                        <div className="flex flex-col gap-3">
                            <SkeletonCardTitle />
                            <SkeletonTextCard />
                            <SkeletonTextCard />
                        </div>
                    ) : (
                        <Fragment>
                            <small className="first-letter:uppercase">{playlist?.public ? "public playlist" : "private playlist"}</small>
                            <h1 className="text-6xl font-bold sm:text-4xl md:text-4xl ">{playlist?.title}</h1>
                            <p className="sm:text-sm">{playlist?.tracks?.length || 0} tracks</p>
                            <p>
                                <span>Created by </span>
                                <Link className="font-bold text-base-content hover:link">{playlist?.creator?.username}</Link>
                            </p>
                        </Fragment>
                    )}
                </HeroBanner>
            </section>

            <section className="flex items-center gap-3">
                <Button shape="circle" color="success" className="text-xl sm:text-base" onClick={togglePlayPlaylist}>
                    {playState && currentPlaylist === playlist?._id ? <BsPauseFill /> : <BsPlayFill />}
                </Button>
                <Dropdown position="bottom-right">
                    <Button color="transparent" className="text-xl" tabIndex={0}>
                        <BsThreeDots />
                    </Button>
                    <DropdownContent tabIndex={0}>
                        <Menu className="bg-neutral">
                            <MenuItem>
                                <a role="menuitem">
                                    <BsPencil /> Edit playlist
                                </a>
                            </MenuItem>
                            {credential === playlist?.creator?._id && (
                                <MenuItem onClick={() => handleDeletePlaylist(id)}>
                                    <a role="menuitem">
                                        <BsTrash className="text-xl" /> Delete this playlist
                                    </a>
                                </MenuItem>
                            )}
                        </Menu>
                    </DropdownContent>
                </Dropdown>
            </section>

            <div className=" flex w-full flex-col gap-2">
                {Array.isArray(playlist?.tracks) &&
                    playlist?.tracks?.map((track, index) => {
                        return (
                            <TrackCard
                                key={index}
                                isPlaylistCreator={playlist.creator._id === credential || false}
                                className="rounded-xl"
                                onRemoveTrackFromPlaylist={refetch}
                                track={track}
                                index={index + 1}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

export default Playlist
