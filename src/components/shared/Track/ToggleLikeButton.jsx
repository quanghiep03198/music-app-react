import { useFetchTrackCollectionQuery, useUpdateTrackCollectionMutation } from "@/redux/api/collectionApi"
import ErrorBoundary from "@/components/customs/ErrorBoundary"
import React, { Fragment, useCallback, useState } from "react"
import { useEffect } from "react"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const ToggleLikeButton = ({ track }) => {
    const [isLiked, setIsLiked] = useState(false)
    const authenticated = useSelector((state) => state.auth?.authenticated)
    const trackCollection = useSelector((state) => state.collections?.tracks)
    const [updateTrackCollection] = useUpdateTrackCollectionMutation()

    useEffect(() => {
        if (!authenticated) {
            setIsLiked(false)
        }
        if (Array.isArray(trackCollection) && authenticated) {
            let isLiked = trackCollection.some((item) => item._id === track._id)
            setIsLiked(isLiked)
        }
    }, [trackCollection, authenticated])

    const handleUpdateTrackColleciton = async (track) => {
        try {
            if (!authenticated) {
                toast.info("You have to login first!")
                return
            }
            await updateTrackCollection(track)
            setIsLiked(!isLiked)
            !isLiked ? toast.success("Added track to your library") : toast.info("Removed track from your library")
        } catch (error) {}
    }

    return (
        <ErrorBoundary>
            <a role="button" className="truncate" onClick={() => handleUpdateTrackColleciton(track)}>
                {isLiked ? (
                    <Fragment>
                        <BsHeartFill className="text-success" /> Remove from your library
                    </Fragment>
                ) : (
                    <Fragment>
                        <BsHeart /> Save to your library
                    </Fragment>
                )}
            </a>
        </ErrorBoundary>
    )
}

export default ToggleLikeButton
