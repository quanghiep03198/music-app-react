import tw from "tailwind-styled-components"
import ErrorBoundary from "../components/customs/ErrorBoundary"
import TrackList from "../components/shared/Track/TrackList"

import AlbumSlider from "../components/shared/Album/AlbumSlider"
import ArtistSlider from "../components/shared/Artist/ArtistSlider"
import PlaylistSlider from "../components/shared/Playlist/PlaylistSlider"
import { useFetchTracksQuery } from "@/app/redux/api/trackApi"
import { useDispatch, useSelector } from "react-redux"
import { Suspense, useEffect } from "react"
import { setCurrentTrack } from "@/app/redux/slice/queueSlice"
import Loading from "../components/customs/Atomics/Loading"

export const Typography = tw.h1`text-2xl font-semibold first-letter:uppercase mb-3`
export const PageContent = tw.div`flex flex-col gap-10 items-stretch`

const HomePage = () => {
    const { data } = useFetchTracksQuery({ skip: 0, limit: 5 })
    const { currentTrack } = useSelector((state) => state.queue)
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentTrack === null) {
            if (Array.isArray(data)) dispatch(setCurrentTrack(data[0]))
        }
    }, [])
    return (
        <>
            <section>
                <Typography>most popular</Typography>
                <Suspense fallback={<Loading />}>
                    <TrackList data={data} />
                </Suspense>
            </section>

            <section>
                <Typography className="!normal-case">
                    Bass Station mixes
                </Typography>
                <Suspense fallback={<Loading />}>
                    <PlaylistSlider />
                </Suspense>
            </section>

            <section>
                <Typography>artists you also like</Typography>
                <Suspense fallback={<Loading />}>
                    <ArtistSlider />
                </Suspense>
            </section>

            <section>
                <Typography>new albums</Typography>
                <Suspense fallback={<Loading />}>
                    <AlbumSlider />
                </Suspense>
            </section>
        </>
    )
}

export default HomePage
