import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import Button from "../../customs/Atomics/Button"
import Tooltip from "../../customs/Atomics/Tooltip"

const PageNavigator = () => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center gap-3 sm:hidden">
            <Tooltip dataTip={"Go back"} position="tooltip-bottom">
                <Button
                    color="ghost"
                    shape="circle"
                    size="sm"
                    className="text-2xl"
                    onClick={() => navigate(-1)}
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
                    onClick={() => navigate(1)}
                >
                    <BsArrowRightShort />
                </Button>
            </Tooltip>
        </div>
    )
}

export default PageNavigator
