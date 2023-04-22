import { addToQueue, removeFromQueue } from "@/redux/reducers/queueSlice"
import { Fragment, useEffect, useState } from "react"
import { BiPlus } from "react-icons/bi"
import { HiOutlineMinus } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

const ToggleAddToQueueButton = ({ track }) => {
    const [isInQueue, setIsInQueue] = useState(false)
    const { nextup } = useSelector((state) => state.queue)
    const dispatch = useDispatch()

    useEffect(() => {
        let existedInQueue = nextup.some((item) => item._id === track._id)
        setIsInQueue(existedInQueue)
    }, [nextup])

    const handleToggleAddToQueue = (track) => {
        if (isInQueue) {
            dispatch(removeFromQueue(track))
            toast.info("Removed from queue!")
        } else {
            dispatch(addToQueue(track))
            toast.success("Added to queue!")
        }
        setIsInQueue(!isInQueue)
    }
    return (
        <a role="button" className="truncate" onClick={() => handleToggleAddToQueue(track)}>
            {isInQueue ? (
                <Fragment>
                    <HiOutlineMinus /> Remove from queue
                </Fragment>
            ) : (
                <Fragment>
                    <BiPlus /> Add to queue
                </Fragment>
            )}
        </a>
    )
}

export default ToggleAddToQueueButton
