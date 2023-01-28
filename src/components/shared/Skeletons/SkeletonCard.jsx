import {
    Card,
    CardBody,
    CardTextSkeleton,
    CardTitleSkeleton,
    Figure,
    SkeletonFigure,
    SkeletonImage
} from "../../customs/Atomics/Card"

const CardSkeleton = ({ mask }) => (
    <Card skeleton="true">
        <SkeletonFigure mask={mask || "square"}>
            <SkeletonImage />
        </SkeletonFigure>
        <CardBody>
            <CardTitleSkeleton />
            <CardTextSkeleton />
        </CardBody>
    </Card>
)

export default CardSkeleton
