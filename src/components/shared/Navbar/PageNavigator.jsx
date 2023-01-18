import React from "react";
import Tooltip from "../Atomics/Tooltip";
import tw from "tailwind-styled-components";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import Button from "../Atomics/Button";
const PageNavigatorWrapper = tw.div`flex items-center gap-3 sm:hidden`;

const PageNavigator = () => {
	return (
		<PageNavigatorWrapper>
			<Tooltip dataTip={"Go back"} position="tooltip-bottom">
				<Button color="ghost" shape="circle" size="sm" className="text-2xl" onClick={history.go(-1)}>
					<BsArrowLeftShort />
				</Button>
			</Tooltip>
			<Tooltip dataTip={"Go forward"} position="tooltip-bottom">
				<Button color="ghost" shape="circle" size="sm" className="text-2xl" onClick={history.go(1)}>
					<BsArrowRightShort />
				</Button>
			</Tooltip>
		</PageNavigatorWrapper>
	);
};

export default PageNavigator;
