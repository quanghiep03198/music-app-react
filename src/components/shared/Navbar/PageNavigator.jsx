import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import Button from "../../customs/@core/Button"
import Tooltip from "../../customs/@core/Tooltip"

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
