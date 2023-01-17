import React from "react";
import { BsPlayFill } from "react-icons/bs";
import Button from "../Atomics/Button";

const AlbumCard = ({ imageUrl, title, typography = "" }) => {
	return (
		<div className="card bg-base-100 shadow-xl sm:w-36 md:w-48 lg:w-52 xl:w-72 xxl:w-80">
			<figure>
				<img src={imageUrl} loading="lazy" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{title}</h2>
				<p>{typography}</p>
				<div className="card-actions justify-end">
					<Button circle="true" success="true" className="sm:btn-sm">
						<BsPlayFill />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AlbumCard;
