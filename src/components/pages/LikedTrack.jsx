import { useFetchTrackCollectionQuery } from "@/app/services/collectionApi"
import Avatar from "@/components/customs/atoms/Avatar"
import Button from "@/components/customs/atoms/Button"
import { Figure } from "@/components/customs/atoms/Card"
import { Dropdown, DropdownContent } from "@/components/customs/atoms/Dropdown"
import HeroBanner from "@/components/customs/atoms/HeroBanner"
import { Menu, MenuItem } from "@/components/customs/atoms/Menu"
import ErrorBoundary from "@/components/customs/ErrorBoundary"
import TrackList from "@/components/shared/Track/TrackList"
import { AppContext } from "@/context/AppProvider"
import { Fragment, useContext } from "react"
import { BsPauseFill, BsPencil, BsPlayFill, BsThreeDots, BsX } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import LikedTracksListImage from "/images/liked-track-image.png"

const LikedTrack = () => {
    const { playState } = useContext(AppContext)
    const dispatch = useDispatch()
    const { data } = useFetchTrackCollectionQuery()
    console.log("track collection:>>>>", data)
    const { currentPlaylist } = useSelector((state) => state.queue)
    const { userInfo } = useSelector((state) => state.auth)
    const togglePlayPlaylist = () => {
        if (data._id && data._id !== currentPlaylist) {
            dispatch(setCurrentPlaylist(data))
        }
        setPlayState(!playState)
    }
    return (
        <div className="flex flex-col gap-10">
            <div className="group relative">
                <HeroBanner heroImageUrl={LikedTracksListImage}>
                    <h1 className="text-6xl font-bold first-letter:uppercase sm:text-2xl">liked tracks</h1>
                    <div className="mb-6 flex items-center gap-2">
                        <Avatar size="xs">
                            <img src={userInfo?.avatar} alt="" />
                        </Avatar>
                        <span className="font-medium">{userInfo?.username}</span>
                        <strong>-</strong>
                        <p className="my-2 text-lg sm:text-sm">{0} tracks</p>
                    </div>
                    <Button shape="circle" color="success" className="text-xl sm:text-base" onClick={togglePlayPlaylist}>
                        {playState ? <BsPauseFill /> : <BsPlayFill />}
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
            </div>

            <TrackList data={data} />
        </div>
    )
}

export default LikedTrack
