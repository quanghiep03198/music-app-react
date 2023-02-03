import React, { useEffect, useState } from "react"
import { BsPersonPlus, BsPersonPlusFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import Swap from "../../customs/atoms/Swap"
import tw from "tailwind-styled-components"
import { Card, CardBody, CardTitle, Figure } from "../../customs/atoms/Card"
import AlternativeLogo from "/images/alt-logo.png"
import Button from "@/components/customs/atoms/Button"
import { useFetchArtistsCollectionQuery, useUpdateArtistsCollectionMutation } from "@/app/services/collectionApi"
import { useSelector } from "react-redux"
import Tooltip from "@/components/customs/atoms/Tooltip"
import { toast } from "react-toastify"

const Overlay = tw.div`absolute top-0 right-0 left-0 bottom-0 flex h-full w-full items-center justify-center bg-black/50 opacity-0 duration-300 group-hover:opacity-100`

const ArtistCard = ({ artistData }) => {
    const authenticated = useSelector((state) => state.auth.authenticated)
    const { data } = useFetchArtistsCollectionQuery(undefined, { skip: !authenticated })
    const [updateArtistCollection, { isLoading }] = useUpdateArtistsCollectionMutation()
    const [isFollowed, setIsFollowed] = useState(false)
    useEffect(() => {
        let isLikedState = Array.isArray(data) ? data?.find((artist) => artist._id === artistData._id) !== undefined : false
        setIsFollowed(isLikedState)
    }, [data])

    const handleToggleFollowArtist = async (artist) => {
        try {
            const response = await updateArtistCollection(artist)
            if (response.status === 401) {
                throw new Error(response.message)
            }
            setIsFollowed(!isFollowed)
            !isFollowed ? toast.success(`You've followed ${artist.name}`) : toast.info(`You've unfollowed ${artist.name}`)
        } catch (error) {
            toast.info(error.message)
        }
    }
    return (
        <Card>
            {/* card image */}
            <Figure mask="circle">
                <Overlay>
                    <Swap
                        swapon={
                            <Tooltip data-tip="Unfollow">
                                <BsPersonPlusFill className="text-3xl text-success" />
                            </Tooltip>
                        }
                        swapoff={
                            <Tooltip data-tip="Follow">
                                <BsPersonPlusFill className="text-3xl text-neutral-content" />
                            </Tooltip>
                        }
                        onChange={() => handleToggleFollowArtist(artistData)}
                        checked={isFollowed}
                    />
                </Overlay>
                <img
                    src={artistData?.avatar}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = AlternativeLogo
                    }}
                    loading="lazy"
                />
            </Figure>
            {/* card body */}
            <CardBody>
                <label className="label p-0">
                    <Link to={`/artist/${artistData._id}`}>
                        <CardTitle>{artistData.name}</CardTitle>
                    </Link>
                </label>
                <p className="truncate text-base-content/50 sm:text-sm">{artistData.desc ?? "Artist"}</p>
            </CardBody>
        </Card>
    )
}

export default ArtistCard
