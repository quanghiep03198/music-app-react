import playlistApi, { useEditTrackListMutation } from "@/app/services/playlistApi"
import { setCurrentTrack } from "@/app/slices/queueSlice"
import { Menu, MenuItem } from "@/components/customs/atoms/Menu"
import { AppContext } from "@/context/AppProvider"
import useRenderOnScroll from "@/hooks/useRenderOnScroll"
import { timer } from "@/utils/formatter"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { BsClock, BsDownload, BsPauseFill, BsPlayFill, BsPlus, BsThreeDots } from "react-icons/bs"
import { HiMinus } from "react-icons/hi2"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import tw from "tailwind-styled-components"
import Button from "../../customs/atoms/Button"
import { Dropdown, DropdownContent } from "../../customs/atoms/Dropdown"
import SkeletonTrackCard from "../Skeletons/SkelentonTrackCard"
import SoundWave from "./SoundWave"
import ToggleAddToQueueButton from "./ToggleAddToQueueButton"
import ToggleLikeButton from "./ToggleLikeButton"

const TrackCardWrapper = tw.div`group
						grid 
						min-h-[60px]
						grid-cols-[5%,40%,20%,20%,5%]
						items-center
						justify-between
						gap-0 
						rounded-lg 
						p-1 
						hover:bg-neutral/20
						sm:grid-cols-[10%,80%,10%]
						sm:text-sm
						md:grid-cols-[10%,80%,10%]
						lg:grid-cols-[10%,80%,10%]
						sm:[&>:not(:first-child):not(:nth-child(2)):not(:last-child)]:hidden
						md:[&>:not(:first-child):not(:nth-child(2)):not(:last-child)]:hidden
						lg:[&>:not(:first-child):not(:nth-child(2)):not(:last-child)]:hidden`

const TrackCard = ({ index, track, isPlaylistCreator }) => {
    const location = useLocation()
    const params = useParams()
    const [isCurrentTrack, setIsCurrentTrack] = useState(false)
    const { playState, setPlayState, setTrackToEditPlaylist } = useContext(AppContext)
    const { currentTrack } = useSelector((state) => state.queue)
    const trackCardRef = useRef(null)
    const isScrollToView = useRenderOnScroll(trackCardRef)
    const isPlaylistPage = useMemo(() => location.pathname.includes("playlist"), [location])
    const dispatch = useDispatch()
    const [removeTrackFromPlaylist] = useEditTrackListMutation()

    useEffect(() => {
        setIsCurrentTrack(currentTrack?._id === track?._id)
    }, [currentTrack, playState])

    const togglePlay = (track) => {
        if (!isCurrentTrack) {
            dispatch(setCurrentTrack(track))
            setPlayState(true)
            return
        }
        setPlayState(!playState)
    }

    const handleRemoveFromPlaylist = async (track) => {
        try {
            await removeTrackFromPlaylist({ id: params.id, payload: { track: track._id } })
            toast.info("Removed track from this playlist!")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div ref={trackCardRef}>
            {isScrollToView ? (
                <TrackCardWrapper className={`${isCurrentTrack && "group bg-neutral"}`} ref={trackCardRef}>
                    <div role="cell" className="relative text-center">
                        <SoundWave track={track} isPlaying={isCurrentTrack && playState} />
                        {!(isCurrentTrack && playState) && <span className="w-full group-hover:hidden">{index}</span>}
                        <Button
                            shape="circle"
                            color="success"
                            className="hidden text-xl group-hover:inline-flex sm:text-base sm:btn-sm"
                            onClick={() => togglePlay(track)}>
                            {isCurrentTrack && playState ? <BsPauseFill /> : <BsPlayFill />}
                        </Button>
                    </div>
                    <div role="cell" className="flex items-center gap-2">
                        {<img src={track?.thumbnail || track?.alternativeThumbnail} className="h-14 w-14 rounded-md sm:h-12 sm:w-12" loading="lazy" />}
                        <div className="sm:text-sm">
                            <h6 className="truncate font-medium capitalize">{track?.title}</h6>
                            <p className="text-base-content/50">
                                {Array.isArray(track.artists) ? (
                                    track.artists.map((artist, index) => (
                                        <Link key={artist._id} to={`/artist/${artist?._id}`} className="hover:link">
                                            {(index ? ", " : "") + artist.name}
                                        </Link>
                                    ))
                                ) : (
                                    <Link to={`/user/${track?.creator?._id}`}>{track?.creator?.username}</Link>
                                )}
                            </p>
                        </div>
                    </div>

                    <div>{track.album?.title ?? ""}</div>

                    <time className="flex items-center gap-2">
                        <BsClock /> {timer(track?.duration)}
                    </time>

                    <div role="cell" className="relative">
                        <Dropdown gap={6} position="bottom-end">
                            <Button role="none" size="sm" shape="square" color="transparent" tabIndex={0}>
                                <BsThreeDots />
                            </Button>
                            <DropdownContent tabIndex={0}>
                                <Menu className="bg-base-200">
                                    <MenuItem>
                                        <ToggleLikeButton track={track} />
                                    </MenuItem>
                                    <MenuItem>
                                        <ToggleAddToQueueButton track={track} />
                                    </MenuItem>
                                    <MenuItem onClick={() => setTrackToEditPlaylist(track)}>
                                        <label htmlFor="playlist-list-modal">
                                            <BsPlus /> Add to playlist
                                        </label>
                                    </MenuItem>
                                    {isPlaylistPage && isPlaylistCreator && (
                                        <MenuItem>
                                            <label onClick={() => handleRemoveFromPlaylist(track)}>
                                                <HiMinus /> Remove from this playlist
                                            </label>
                                        </MenuItem>
                                    )}
                                    <MenuItem>
                                        <a href={track?.downloadUrl} className="truncate">
                                            <BsDownload /> Download
                                        </a>
                                    </MenuItem>
                                </Menu>
                            </DropdownContent>
                        </Dropdown>
                    </div>
                </TrackCardWrapper>
            ) : (
                <SkeletonTrackCard />
            )}
        </div>
    )
}

export default TrackCard
