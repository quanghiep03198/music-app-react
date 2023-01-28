import { useFetchTrackCollectionQuery } from "@/app/api/collectionApi"
import Avatar from "@/components/customs/Atomics/Avatar"
import Button from "@/components/customs/Atomics/Button"
import { Figure } from "@/components/customs/Atomics/Card"
import {
    Dropdown,
    DropdownContent
} from "@/components/customs/Atomics/Dropdown"
import { Menu, MenuItem } from "@/components/customs/Atomics/Menu"
import TrackList from "@/components/shared/Track/TrackList"
import { AppContext } from "@/context/AppProvider"
import { Fragment, useContext } from "react"
import {
    BsPauseFill,
    BsPencil,
    BsPlayFill,
    BsThreeDots,
    BsX
} from "react-icons/bs"
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
        <Fragment>
            <section className="group relative">
                <div className="hero glass place-content-start rounded-lg sm:place-content-center ">
                    <div className="hero-content flex-row sm:flex-col md:flex-col xl:gap-6 xxl:gap-10">
                        <Figure mask="square">
                            <img
                                src={LikedTracksListImage}
                                className="max-w-[240px] rounded-lg shadow-2xl "
                            />
                        </Figure>
                        <div className="sm:self-start">
                            <h1 className="text-5xl font-bold first-letter:uppercase sm:text-2xl">
                                liked tracks
                            </h1>
                            <p className="my-2 mb-6 text-lg sm:text-sm">
                                {0} tracks
                            </p>
                            <div className="flex items-center gap-2">
                                <Avatar size="xs">
                                    <img src={userInfo?.avatar} alt="" />
                                </Avatar>
                                <strong>{userInfo?.username}</strong>
                            </div>
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
                                    <BsPencil /> Edit playlist
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a role="menuitem" className="text-error">
                                    <BsX className="text-xl" /> Delete this
                                    playlist
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
            <TrackList data={data} />
        </Fragment>
    )
}

export default LikedTrack
