import Grid from "@/components/customs/Grid"
import AlbumCard from "./AlbumCard"

const AlbumList = ({ data }) => {
   return (
      <Grid space-x={10} breakpoints={{ sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}>
         {Array.isArray(data) && data.map((album) => <AlbumCard key={album?._id} albumData={album} />)}
      </Grid>
   )
}

export default AlbumList
