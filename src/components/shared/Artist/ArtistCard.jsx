import React from "react"
import { BsPersonPlus, BsPersonPlusFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import Swap from "../../customs/Atomics/Swap"
import tw from "tailwind-styled-components"
import { Card, CardBody, CardTitle, Figure } from "../../customs/Atomics/Card"
import AlternativeLogo from "/images/alt-logo.png"

const Overlay = tw.div`absolute top-0 right-0 left-0 bottom-0 flex h-full w-full items-center justify-center bg-black/50 opacity-0 duration-300 group-hover:opacity-100`

const ArtistCard = ({ artistData }) => {
    return (
        <Card>
            {/* card image */}
            <Figure mask="circle">
                <Overlay>
                    <Swap
                        swapOff={<BsPersonPlusFill className="text-2xl" />}
                        swapOn={
                            <BsPersonPlusFill className="text-2xl text-success" />
                        }
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
                <Link to={`/artist/${artistData._id}`}>
                    <CardTitle>{artistData.name}</CardTitle>
                </Link>
                <p className="text-base-content/50 sm:text-sm">
                    {artistData.desc ?? "Artist"}
                </p>
            </CardBody>
        </Card>
    )
}

export default ArtistCard
