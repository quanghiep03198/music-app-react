import { setCurrentTrack } from "@/app/slices/queueSlice"
import { AppContext } from "@/context/AppProvider"
import { useContext, useEffect, useState } from "react"
import { BsPauseCircle, BsPlayCircle, BsShuffle, BsSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import tw from "tailwind-styled-components"
import Button from "../../customs/atoms/Button"
import Swap from "../../customs/atoms/Swap"

const RepeatIcon = tw.i`bi bi-repeat`

const AudioButtonGroup = ({ audioRef }) => {
    const { currentTrack, nextup } = useSelector((state) => state.queue)
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [loopState, setLoopState] = useState(false)
    const [shuffleState, setShuffleState] = useState(false)
    const { playState, setPlayState } = useContext(AppContext)
    const dispatch = useDispatch()

    useEffect(() => {
        audioRef.current.addEventListener("ended", () => {
            handleChangeTrack(1)
        })
    })

    // loop
    const handleToggleLoop = (e) => {
        setLoopState(e.target.checked)
        audioRef.current.loop = e.target.checked
    }

    // shuffle play
    const handleToggleShuffle = (e) => {
        setShuffleState(e.target.checked)
    }

    // using closure to memorize newIndex variable
    const changeTrack = () => {
        let newIndex
        return function (increasedValue) {
            if (shuffleState) {
                newIndex = Math.floor(Math.random() * nextup.length)
                let currentIndex = nextup.findIndex((track) => track._id === currentTrack._id)
                while (currentIndex === newIndex) {
                    newIndex = Math.floor(Math.random() * nextup.length)
                }
            } else {
                newIndex = currentTrackIndex + increasedValue
                if (newIndex < 0) newIndex = nextup.length - 1
                if (newIndex > nextup.length - 1) newIndex = 0
            }
            setCurrentTrackIndex(newIndex)
            dispatch(setCurrentTrack(nextup[newIndex]))
            dispatch(setPlayState(true))
        }
    }

    const handleChangeTrack = changeTrack()

    return (
        <div className="flex items-center">
            <Swap
                swapon={<BsShuffle className="text-success" />}
                swapoff={<BsShuffle />}
                tw="text-xl w-fit"
                checked={shuffleState}
                onChange={handleToggleShuffle}
            />
            <Button color="transparent" className="text-2xl" onClick={() => handleChangeTrack(-1)}>
                <BsSkipBackwardFill />
            </Button>
            <Swap
                swapoff={<BsPlayCircle />}
                swapon={<BsPauseCircle />}
                tw="swap-rotate btn btn-ghost btn-circle hover:bg-transparent text-4xl w-fit"
                checked={playState}
                onChange={(e) => setPlayState(e.target.checked)}
            />
            <Button color="transparent" className="text-2xl" onClick={() => handleChangeTrack(1)}>
                <BsSkipForwardFill />
            </Button>
            <Swap
                swapon={<RepeatIcon className="text-success" />}
                swapoff={<RepeatIcon className="text-base-content" />}
                tw="text-xl w-fit"
                checked={loopState}
                onChange={handleToggleLoop}
            />
        </div>
    )
}

export default AudioButtonGroup
