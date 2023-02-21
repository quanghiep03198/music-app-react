import PlaylistCard from "./PlaylistCard"

const PlaylistList = ({ data, status }) => {
    return (
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6">
            {Array.isArray(data) && data.map((playlist) => <PlaylistCard isFetching={status?.isFetching} key={playlist?._id} data={playlist} />)}
        </div>
    )
}

export default PlaylistList
