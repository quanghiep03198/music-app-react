import Swap from "@/components/customs/Atomics/Swap"
import React from "react"
import { memo } from "react"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useSelector } from "react-redux"

const ToggleLikeTrackButton = () => {
    const { currentTrack } = useSelector((state) => state.queue)
    return (
        <Swap
            swapOff={<BsHeart />}
            swapOn={<BsHeartFill className="text-accent" />}
            onChange={() => console.log(currentTrack)}
        />
    )
}

export default memo(ToggleLikeTrackButton)
