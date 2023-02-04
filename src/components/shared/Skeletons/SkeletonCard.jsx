import { Card, CardBody, CardTextSkeleton, CardTitleSkeleton, SkeletonImage } from "../../customs/atoms/Card"

const SkeletonCard = ({ mask }) => (
    <Card skeleton="true">
        <div className="mask-square">
            <SkeletonImage />
        </div>
        <CardBody>
            <CardTitleSkeleton />
            <CardTextSkeleton />
        </CardBody>
    </Card>
)

export default SkeletonCard
