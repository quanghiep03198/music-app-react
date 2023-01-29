import { useFetchTrackCollectionQuery } from "@/app/services/collectionApi"
import Swap from "@/components/customs/Atomics/Swap"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { memo } from "react"
import { set } from "react-hook-form"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useSelector } from "react-redux"

const ToggleLikeTrackButton = () => {
    const currentTrack = useSelector((state) => state.queue.currentTrack)
    const { authenticated } = useSelector((state) => state.auth)
    const { data } = useFetchTrackCollectionQuery(undefined, { skip: !authenticated })
    const [isLiked, setIsLiked] = useState(false)
    useEffect(() => {
        console.log("collection:>>", data)
        if (Array.isArray(data)) {
            let isExistedInLibrary = data?.find((track) => track._id === currentTrack._id) !== undefined

            setIsLiked(isExistedInLibrary)
        }
    }, [])
    return <Swap checked={isLiked} swapOff={<BsHeart />} swapOn={<BsHeartFill className="text-success" />} onChange={() => console.log(currentTrack)} />
}

export default memo(ToggleLikeTrackButton)
