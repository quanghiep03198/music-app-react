import { Card, CardBody, SkeletonTextCard, SkeletonCardTitle, SkeletonImage } from "../../customs/@core/Card"

const SkeletonCard = (props) => (
    <Card skeleton="true">
        <div
            className={`${() => {
                switch (props.mask) {
                    case "square":
                        return "aspect-square"
                    case "circle":
                        return "rounded-full"
                    default:
                        return "aspect-square"
                }
            }}`}>
            <SkeletonImage />
        </div>
        <CardBody>
            <SkeletonCardTitle />
            <SkeletonTextCard />
        </CardBody>
    </Card>
)

export default SkeletonCard
