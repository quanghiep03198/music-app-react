import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

const Card = tw.div`rounded-box relative flex w-full flex-col gap-3 bg-base-200 p-5 shadow-xl duration-300 hover:bg-base-300 sm:p-3`;
const CardLinkTitle = tw.a`truncate text-xl font-medium text-base-content hover:link sm:text-base`;
const CardTogglePlayButton = tw.button`btn-success btn-circle btn absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-xl opacity-0 duration-500 group-hover:opacity-100`;
const CardImageMask = tw.div`mask-square mx-auto h-[224px] max-w-full`;
const CardImage = tw.img`mx-auto max-h-full max-w-full object-cover object-center group-hover:cursor-pointer`;
const CardBody = tw.div`group flex flex-col gap-3`;
const CardDetail = tw.span`text-base-content/75 hover:link sm:text-sm`;

const PlaylistCard = ({ playlist }) => {
	return (
		<Card>
			<Link to={`/playlist/${playlist?._id}`} className="group relative max-w-full">
				<CardImageMask>
					<CardImage src="./img/default-thumbnail.png" alt="playlist image" loading="lazy" />
				</CardImageMask>
				<CardTogglePlayButton>
					<BsPlayFill />
				</CardTogglePlayButton>
			</Link>
			<CardBody>
				<Link to={`/playlist/${playlist?._id}`}>
					<CardLinkTitle>{playlist?.title}</CardLinkTitle>
				</Link>
				<CardDetail>
					Created at: <span className="text-base-content">{createDate}</span>
				</CardDetail>
			</CardBody>
		</Card>
	);
};

export default PlaylistCard;
