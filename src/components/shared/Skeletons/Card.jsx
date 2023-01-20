import {
    Card,
    CardBody,
    CardTextSkeleton,
    CardTitleSkeleton,
    FigureSkeleton
} from "../../customs/Atomics/Card"

const CardSkeleton = () => (
    <Card>
        <FigureSkeleton />
        <CardBody>
            <CardTitleSkeleton />
            <CardTextSkeleton />
        </CardBody>
    </Card>
)

export default CardSkeleton
