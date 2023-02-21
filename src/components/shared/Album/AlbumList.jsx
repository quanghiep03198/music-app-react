import AlbumCard from "./AlbumCard"

const AlbumList = ({ data }) => {
    return (
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6">
            {Array.isArray(data) && data.map((album) => <AlbumCard key={album?._id} albumData={album} />)}
        </div>
    )
}

export default AlbumList
