import React, { useId } from "react";
import { BsSearch } from "react-icons/bs";
import tw from "tailwind-styled-components";
const Form = tw.form`sm:hidden md:hidden`;
const SearchBoxWrapper = tw.div`flex justify-start items-center px-3 py-1 border border-base-content/50 rounded-full text-base-content  w-[-webkit-fill-available] min-w-[24rem]`;
const SearchInput = tw.input`input input-sm bg-transparent focus:outline-none w-[-webkit-fill-available] text-base-content`;
const SearchBox = () => {
	const id = useId();
	return (
		<Form>
			<SearchBoxWrapper className="">
				<label htmlFor={id}>
					<BsSearch />
				</label>
				<SearchInput type="search" placeholder="Find a track, artist, album . . ." />
				<button className="hidden" type="submit" id={id}>
					<BsSearch />
				</button>
			</SearchBoxWrapper>
		</Form>
	);
};

export default SearchBox;
