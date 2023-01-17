import React from "react";
import { BsPersonPlus, BsPersonPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swap from "../Atomics/Swap";
import tw from "tailwind-styled-components";

const CardWrapper = tw.div` rounded-box relative flex max-h-[500px] max-w-xs flex-col items-stretch justify-between gap-3 overflow-hidden bg-base-200 p-5 shadow-lg duration-300 hover:cursor-grab hover:bg-base-300`;
const ToggleFollowButton = tw.div`absolute top-0 right-0 left-0 bottom-0 flex h-full w-full items-center justify-center rounded-full bg-black/50 opacity-0 duration-300 group-hover:opacity-100`;
const CardImageWrapper = tw.div`group relative z-20 self-center`;
const CardImage = tw.img`max-h-52 max-w-full rounded-full object-cover object-center sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-44 lg:w-44 xl:h-48 xl:w-48 xxl:h-52 xxl:w-52`;
const CardBody = tw.div`flex flex-col gap-3`;
const CardTitle = tw.span`self-start truncate text-lg font-medium text-base-content hover:link sm:text-base`;
const CardDescription = tw.p`self-start text-base text-base-content/75 sm:text-sm`;

const ArtistCard = ({ artistData }) => {
	return (
		<CardWrapper>
			{/* card image */}
			<CardImageWrapper>
				<ToggleFollowButton>
					<Swap
						swapOff={<BsPersonPlusFill className="text-2xl" />}
						swapOn={<BsPersonPlusFill className="text-2xl text-success" />}
					/>
				</ToggleFollowButton>
				<CardImage src={artistData.avatar} loading="lazy" />
			</CardImageWrapper>
			{/* card body */}
			<CardBody>
				<Link to={`/artist/${artistData._id}`}>
					<CardTitle>{artistData.name}</CardTitle>
				</Link>
				<CardDescription>{artistData.desc ?? "Artist"}</CardDescription>
			</CardBody>
		</CardWrapper>
	);
};

export default ArtistCard;
