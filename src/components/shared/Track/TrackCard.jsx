import { setCurrentTrack } from "@/app/slices/queueSlice"
import { Menu, MenuItem } from "@/components/customs/atoms/Menu"
import { AppContext } from "@/context/AppProvider"
import useRenderOnScroll from "@/hooks/useRenderOnScroll"
import { formatNumber, timer } from "@/utils/formatter"
import { useContext, useEffect, useRef, useState } from "react"
import { BsClock, BsDownload, BsPauseFill, BsPlayFill, BsThreeDots } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Button from "../../customs/atoms/Button"
import { Dropdown, DropdownContent } from "../../customs/atoms/Dropdown"
import SoundWave from "./SoundWave"
import ToggleAddToQueueButton from "./ToggleAddToQueueButton"
import ToggleLikeButton from "./ToggleLikeButton"

const TrackCard = ({ index, track }) => {
    const [isCurrentTrack, setIsCurrentTrack] = useState(false)
    const { playState, setPlayState } = useContext(AppContext)
    const { currentTrack } = useSelector((state) => state.queue)
    const trackCardRef = useRef(null)
    const isScrollToView = useRenderOnScroll(trackCardRef)
    const dispatch = useDispatch()

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

    return (
        <div className={`track-card group min-h-[60px] gap-2 p-1 hover:bg-neutral/50 sm:text-sm ${isCurrentTrack && "group bg-neutral"}`} ref={trackCardRef}>
            <>
                <div role="cell" className="relative text-center">
                    <SoundWave track={track} isPlaying={isCurrentTrack && playState} />
                    {!(isCurrentTrack && playState) && <span className="w-full group-hover:hidden">{index}</span>}
                    <Button
                        shape="circle"
                        color="success"
                        className="hidden text-xl group-hover:inline-flex sm:text-base sm:btn-sm"
                        onClick={() => togglePlay(track)}
                    >
                        {isCurrentTrack && playState ? <BsPauseFill /> : <BsPlayFill />}
                    </Button>
                </div>
                <div role="cell" className="flex items-center gap-2">
                    <img src={track?.thumbnail} className="h-14 w-14 rounded-md sm:h-12 sm:w-12" loading="lazy" />
                    <div className="sm:text-sm">
                        <h6 className="truncate font-medium">{track?.title}</h6>
                        <p className="text-base-content/50">
                            {Array.isArray(track.artists) &&
                                track.artists.map((artist) => (
                                    <Link key={artist._id} to={`/artist/${artist?._id}`}>
                                        {artist.name}
                                    </Link>
                                ))}
                        </p>
                    </div>
                </div>
                <div role="cell">
                    <span>{track.album?.title ?? ""}</span>
                </div>
                <div role="cell">
                    <time className="flex items-center gap-2">
                        <BsPlayFill /> {formatNumber(track?.listen)}
                    </time>
                </div>
                <div role="cell">
                    <div className="flex items-center gap-2">
                        <BsClock /> {timer(track?.duration)}
                    </div>
                </div>
                <div role="cell">
                    <Dropdown gap={6} position="bottom-end">
                        <Button role="none" size="sm" shape="square" color="transparent" tabIndex={0}>
                            <BsThreeDots />
                        </Button>
                        <DropdownContent tabIndex={0}>
                            <Menu className="bg-base-300">
                                <MenuItem>
                                    <ToggleLikeButton track={track} />
                                </MenuItem>

                                <MenuItem>
                                    <ToggleAddToQueueButton track={track} />
                                </MenuItem>
                                <MenuItem>
                                    <a href={track?.downloadUrl} className="truncate">
                                        <BsDownload /> Download
                                    </a>
                                </MenuItem>
                            </Menu>
                        </DropdownContent>
                    </Dropdown>
                </div>
            </>
        </div>
    )
}

export default TrackCard
