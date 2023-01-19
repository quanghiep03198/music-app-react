import { Card, CardBody, CardTextSkeleton, CardTitleSkeleton, FigureSkeleton } from "../Atomics/Card";

const CardSkeleton = () => (
	<Card>
		<FigureSkeleton />
		<CardBody>
			<CardTitleSkeleton />
			<CardTextSkeleton />
		</CardBody>
	</Card>
);

export default CardSkeleton;
