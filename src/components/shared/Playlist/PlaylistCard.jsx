import { BsPlayFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import Button from "../../customs/Atomics/Button"
import { Card, CardBody, CardTitle, Figure } from "../../customs/Atomics/Card"

const PlaylistCard = ({ playlist }) => {
    return (
        <Card>
            <Link
                to={`/playlist/${playlist?._id}`}
                className="group relative max-w-full"
            >
                <Figure mask="square">
                    <img
                        src={playlist?.image}
                        alt="playlist image"
                        loading="lazy"
                    />
                </Figure>
                <Button
                    shape="circle"
                    color="success"
                    className="sm:text-md absolute bottom-2 right-2 translate-y-2 text-xl opacity-0 duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:btn-sm"
                >
                    <BsPlayFill />
                </Button>
            </Link>
            <CardBody>
                <Link to={`/playlist/${playlist?._id}`} className="hover:link">
                    <CardTitle>{playlist?.title}</CardTitle>
                </Link>
                <p className="text-base-content/50 sm:text-sm">
                    Created at:{" "}
                    {playlist.createdAt &&
                        new Date(playlist.createdAt).toLocaleDateString()}
                </p>
            </CardBody>
        </Card>
    )
}

export default PlaylistCard
