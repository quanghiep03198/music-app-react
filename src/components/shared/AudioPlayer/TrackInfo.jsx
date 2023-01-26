import instance from "@/app/axios/instance"
import { setCurrentTrack } from "@/app/redux/slice/queueSlice"
import { useEffect } from "react"
import { useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import tw from "tailwind-styled-components"

const TrackInfoWrapper = tw.div`flex basis-1/4 items-center gap-4 sm:flex-1 md:flex-1`
const Thumbnail = tw.img`h-16 w-16 sm:h-12 sm:w-12 rounded-md`
const Title = tw.h5`truncate font-semibold text-base-content`

const TrackInfo = () => {
    const { currentTrack } = useSelector((state) => state.queue)
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentTrack === null) {
            instance
                .get("/tracks?limit=-1")
                .then((track) => dispatch(setCurrentTrack(track)))
                .catch((error) => console.log(error.message))
        }
    }, [])

    return (
        <TrackInfoWrapper>
            <Thumbnail src={currentTrack?.thumbnail} />
            <div>
                <Title>{currentTrack?.title}</Title>
                <p>
                    {Array.isArray(currentTrack?.artists) &&
                        currentTrack.artists
                            .map((artist) => artist.name)
                            .join(", ")}
                </p>
            </div>
        </TrackInfoWrapper>
    )
}

export default TrackInfo
