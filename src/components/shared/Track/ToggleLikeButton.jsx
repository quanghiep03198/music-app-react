import { useFetchTrackCollectionQuery, useUpdateTrackCollectionMutation } from "@/app/services/collectionApi"
import ErrorBoundary from "@/components/customs/ErrorBoundary"
import React, { Fragment, useState } from "react"
import { useEffect } from "react"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const ToggleLikeButton = ({ track }) => {
    const [isLiked, setIsLiked] = useState(false)
    const { authenticated } = useSelector((state) => state.auth)
    const { data } = useFetchTrackCollectionQuery(undefined, { skip: !authenticated })
    const [updateTrackCollection] = useUpdateTrackCollectionMutation()

    useEffect(() => {
        if (!authenticated) {
            setIsLiked(false)
        }
        if (Array.isArray(data) && authenticated) {
            let isLiked = data.find((item) => item._id === track._id) !== undefined
            setIsLiked(isLiked)
        }
    }, [data, authenticated])

    const handleUpdateTrackColleciton = async (track) => {
        try {
            if (!authenticated) {
                toast.info("You have to login first!")
                return
            }
            const response = await updateTrackCollection(track)
            if (!response) {
                throw new Error("Failed to update track colleciton!")
            }
            setIsLiked(!isLiked)
            !isLiked ? toast.success("Added track to your library") : toast.info("Removed track from your library")
        } catch (error) {
            console.log(error.message)
        }
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
