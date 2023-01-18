import { useId } from "react";
import { BsSearch } from "react-icons/bs";
import Button from "../Atomics/Button";

const SearchBox = () => {
	const id = useId();

	return (
		<form className="flex items-center gap-1 rounded-full border border-neutral bg-base-200 px-2 ">
			<Button type="button" shape="circle" size="sm" color="transparent" className="text-lg">
				<BsSearch />
			</Button>
			<input
				type="search"
				className={`input input-sm rounded-full bg-transparent focus:outline-none`}
				id={id}
				placeholder="Search ..."
			/>
		</form>
	);
};

export default SearchBox;
