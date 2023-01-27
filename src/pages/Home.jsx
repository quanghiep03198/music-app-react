import tw from "tailwind-styled-components"
import TrackList from "../components/shared/Track/TrackList"

import { useFetchTracksQuery } from "@/app/api/trackApi"
import AlbumSlider from "../components/shared/Album/AlbumSlider"
import ArtistSlider from "../components/shared/Artist/ArtistSlider"
import PlaylistSlider from "../components/shared/Playlist/PlaylistSlider"

export const Typography = tw.h1`text-2xl font-semibold first-letter:uppercase mb-3`
export const PageContent = tw.div`flex flex-col gap-10 items-stretch`

const HomePage = () => {
    const { data } = useFetchTracksQuery({ skip: 0, limit: 5 })

    return (
        <>
            <section className="pb-10">
                <Typography>most popular</Typography>
                <TrackList data={data} />
            </section>

            <section>
                <Typography className="!normal-case">
                    Bass Station mixes
                </Typography>
                <PlaylistSlider />
            </section>

            <section>
                <Typography>artists you also like</Typography>
                <ArtistSlider />
            </section>

            <section>
                <Typography>new albums</Typography>
                <AlbumSlider />
            </section>
        </>
    )
}

export default HomePage
