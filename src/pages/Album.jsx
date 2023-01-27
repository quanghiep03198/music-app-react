import { useFetchSingleAlbumQuery } from "@/app/api/albumApi"
import Button from "@/components/customs/Atomics/Button"
import {
    Dropdown,
    DropdownContent
} from "@/components/customs/Atomics/Dropdown"
import { Menu, MenuItem } from "@/components/customs/Atomics/Menu"
import ErrorBoundary from "@/components/customs/ErrorBoundary"
import TrackList from "@/components/shared/Track/TrackList"
import { AppContext } from "@/context/AppProvider"
import timer from "@/utils/timer"
import React from "react"
import { useContext } from "react"
import {
    BsClock,
    BsHeart,
    BsPauseFill,
    BsPencil,
    BsPlayFill,
    BsThreeDots
} from "react-icons/bs"

import { MdPlaylistAdd } from "react-icons/md"
import { Link, useParams } from "react-router-dom"
import DefaultThumbnail from "/images/default-thumbnail.png"

const AlbumPage = () => {
    const { id } = useParams()
    const { data } = useFetchSingleAlbumQuery(id)
    console.log("album:>>", data)
    const { playState, setPlayState } = useContext(AppContext)
    const togglePlayPlaylist = () => {
        if (data._id && data._id !== currentPlaylist) {
            dispatch(setCurrentPlaylist(data))
        }
        setPlayState(!playState)
    }
    return (
        <ErrorBoundary>
            <section className="group relative">
                <div className="hero glass place-content-start rounded-lg ">
                    <div className="hero-content flex-row sm:flex-col md:flex-col xl:gap-6 xxl:gap-10">
                        <img
                            src={
                                data?.album?.image !== ""
                                    ? data?.album?.image
                                    : DefaultThumbnail
                            }
                            className="max-w-[240px] rounded-lg shadow-2xl sm:max-w-[180px]"
                        />
                        <div className="sm:self-start">
                            <h1 className="text-5xl font-bold sm:text-2xl">
                                {data?.album?.title}
                            </h1>
                            <p className="my-2 flex items-center gap-4 text-lg sm:text-sm">
                                {Array.isArray(data?.tracks)
                                    ? data?.tracks?.length
                                    : 0}{" "}
                                tracks
                            </p>
                            <p className="my-4">
                                <Link className="font-semibold text-base-content hover:link">
                                    {data?.album?.artist?.name}
                                </Link>
                            </p>
                            <p className="text-base-content/50">
                                Relased at{" "}
                                <span className="font-semibold text-base-content">
                                    {new Date(
                                        data?.album?.releaseDate
                                    ).toLocaleDateString()}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <Dropdown
                    className="absolute top-1 right-1"
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
                                    <BsHeart /> Save to your library
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a role="menuitem">
                                    <MdPlaylistAdd className="text-xl" /> Add to
                                    queue
                                </a>
                            </MenuItem>
                        </Menu>
                    </DropdownContent>
                </Dropdown>
                <Button
                    shape="circle"
                    color="success"
                    className="absolute bottom-4 right-4 text-xl"
                    onClick={togglePlayPlaylist}
                >
                    {playState ? <BsPauseFill /> : <BsPlayFill />}
                </Button>
            </section>
            <section>
                <TrackList data={data?.tracks} />
            </section>
        </ErrorBoundary>
    )
}

export default AlbumPage
