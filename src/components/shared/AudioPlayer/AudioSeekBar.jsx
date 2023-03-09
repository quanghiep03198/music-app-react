import ErrorBoundary from "@/components/customs/ErrorBoundary"
import { AppContext } from "@/context/AppProvider"
import { timer } from "@/utils/formatter"
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Range from "../../customs/@core/Range"

const AudioSeekBar = ({ audioRef }) => {
    const [intervalState, setIntervalState] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const { currentTrack } = useSelector((state) => state.queue)
    const { playState } = useContext(AppContext)

    useEffect(() => {
        if (playState) {
            const currentInterval = setInterval(() => {
                setCurrentTime(audioRef.current.currentTime)
            }, 1)
            setIntervalState(currentInterval)
        } else {
            clearInterval(intervalState)
        }
    }, [playState, currentTrack])

    const getCurrentDuration = (e) => {
        audioRef.current.currentTime = e.target.value
        setCurrentTime(e.target.value)
    }

    return (
        <ErrorBoundary>
            <div className="flex min-w-full items-center justify-center gap-3 ">
                <span>{timer(currentTime)}</span>
                <Range type={"range"} value={currentTime} max={currentTrack?.duration} onChange={getCurrentDuration} />
                <span>{currentTrack?.duration ? timer(currentTrack?.duration) : timer(0)}</span>
            </div>
        </ErrorBoundary>
    )
}

export default AudioSeekBar
