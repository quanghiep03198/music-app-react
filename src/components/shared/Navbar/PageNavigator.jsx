import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import Button from "../../customs/atoms/Button"
import Tooltip from "../../customs/atoms/Tooltip"

const PageNavigator = () => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center gap-3 sm:hidden">
            <Tooltip data-tip="Go back" position="bottom">
                <Button shape="circle" color="ghost" size="sm" className="text-2xl" onClick={() => navigate(-1)}>
                    <BsArrowLeftShort />
                </Button>
            </Tooltip>
            <Tooltip data-tip="Go forward" position="bottom">
                <Button shape="circle" color="ghost" size="sm" className="text-2xl" onClick={() => navigate(1)}>
                    <BsArrowRightShort />
                </Button>
            </Tooltip>
        </div>
    )
}

export default PageNavigator
