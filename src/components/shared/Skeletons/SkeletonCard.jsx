import { Card, CardBody, CardTextSkeleton, CardTitleSkeleton, SkeletonImage } from "../../customs/atoms/Card"

const CardSkeleton = ({ mask }) => (
    <Card skeleton="true">
        <SkeletonImage></SkeletonImage>
        <CardBody>
            <CardTitleSkeleton />
            <CardTextSkeleton />
        </CardBody>
    </Card>
)

export default CardSkeleton
