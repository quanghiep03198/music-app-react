import { Card, CardBody, SkeletonTextCard, SkeletonCardTitle, SkeletonImage } from "../../customs/atoms/Card";

const SkeletonCard = ({ mask }) => (
   <Card skeleton="true">
      <div
         className={`${() => {
            switch (mask) {
               case "square":
                  return "aspect-square";
               case "circle":
                  return "rounded-full";
               default:
                  return "aspect-square";
            }
         }}`}>
         <SkeletonImage />
      </div>
      <CardBody>
         <SkeletonCardTitle />
         <SkeletonTextCard />
      </CardBody>
   </Card>
);

export default SkeletonCard;
