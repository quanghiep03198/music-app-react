import { Card } from "@/components/customs/Atomics/Card"
import { Link } from "react-router-dom"
import Logo from "/images/logo.png"

const GenreCard = ({ data }) => {
    return (
        <Link to={`/genres/${data?._id}`}>
            <div className="mask-square">
                <Card className=" h-60 max-w-full bg-[url('/images/vinyl.png')] bg-left-top bg-no-repeat hover:cursor-pointer">
                    <h3 className="text-2xl font-semibold text-base-content hover:link sm:text-xl">{data?.name}</h3>
                    <img src={Logo} className="absolute bottom-2 left-2 max-w-[96px] object-cover" />
                </Card>
            </div>
        </Link>
    )
}

export default GenreCard
