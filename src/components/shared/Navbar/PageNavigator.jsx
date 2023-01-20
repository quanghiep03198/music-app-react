import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
import Button from "../../customs/Atomics/Button"
import Tooltip from "../../customs/Atomics/Tooltip"

const PageNavigator = () => {
    return (
        <div className="flex items-center gap-3 sm:hidden">
            <Tooltip dataTip={"Go back"} position="tooltip-bottom">
                <Button
                    color="ghost"
                    shape="circle"
                    size="sm"
                    className="text-2xl"
                >
                    <BsArrowLeftShort />
                </Button>
            </Tooltip>
            <Tooltip dataTip={"Go forward"} position="tooltip-bottom">
                <Button
                    color="ghost"
                    shape="circle"
                    size="sm"
                    className="text-2xl"
                >
                    <BsArrowRightShort />
                </Button>
            </Tooltip>
        </div>
    )
}

export default PageNavigator
