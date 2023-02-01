import { useFetchTrackCollectionQuery, useUpdateTrackCollectionMutation } from "@/app/services/collectionApi"
import Swap from "@/components/customs/atoms/Swap"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { memo } from "react"
import { set } from "react-hook-form"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const ToggleLikeTrackButton = () => {
    const currentTrack = useSelector((state) => state.queue.currentTrack)
    const { authenticated } = useSelector((state) => state.auth)
    const { data } = useFetchTrackCollectionQuery(undefined, {
        skip: !authenticated
    })
    const [isLiked, setIsLiked] = useState(false)
    const [updateTrackCollection] = useUpdateTrackCollectionMutation()
    useEffect(() => {
        if (!authenticated) setIsLiked(false)
        if (Array.isArray(data)) {
            let isLiked = data.find((track) => track._id === currentTrack._id) !== undefined
            setIsLiked(isLiked)
        }
    }, [data, authenticated])
    const toggleLikeTrack = async (track) => {
        try {
            if (!authenticated) {
                toast.info("You have to login first!")
                return
            }
            const res = await updateTrackCollection(track).unwrap()
            if (!res) {
                toast.error("Cannot update track collection")
                return
            }
            setIsLiked(!isLiked)
            !isLiked ? toast.success("Added track to your library") : toast.info("Removed track from your library")
        } catch (error) {
            console.log(error.message)
        }
    }
    return <Swap swapOff={<BsHeart />} swapOn={<BsHeartFill className="text-success" />} checked={isLiked} onChange={() => toggleLikeTrack(currentTrack)} />
}

export default memo(ToggleLikeTrackButton)
