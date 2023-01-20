import React from "react"
import { BsPlayFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import Button from "../../customs/Atomics/Button"
import { Card, CardBody, Figure } from "../../customs/Atomics/Card"

const AlbumCard = ({ album }) => {
    return (
        <Card>
            <Figure shape="square">
                <img
                    src={album?.image}
                    loading="lazy"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = "/images/default-album-image.png"
                    }}
                />
                <Button
                    shape="circle"
                    color="success"
                    className="absolute bottom-2 right-2 translate-y-2 text-xl opacity-0 group-hover:translate-y-0 group-hover:opacity-100 sm:text-base sm:btn-sm"
                >
                    <BsPlayFill />
                </Button>
            </Figure>
            <CardBody>
                <Link
                    to={`/album/${album?._id}`}
                    className="card-title hover:link sm:text-base"
                >
                    {album?.title}
                </Link>
                <Link
                    to={`/artist/${album.artist?._id}`}
                    className="text-base-content/50 hover:link sm:text-sm"
                >
                    {album.artist?.name}
                </Link>
            </CardBody>
        </Card>
    )
}

export default AlbumCard
