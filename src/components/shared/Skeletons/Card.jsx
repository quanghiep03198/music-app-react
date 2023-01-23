import {
    Card,
    CardBody,
    CardTextSkeleton,
    CardTitleSkeleton,
    FigureSkeleton
} from "../../customs/Atomics/Card"

const CardSkeleton = ({ mask }) => (
    <Card>
        <FigureSkeleton mask={mask} />
        <CardBody>
            <CardTitleSkeleton />
            <CardTextSkeleton />
        </CardBody>
    </Card>
)

export default CardSkeleton
