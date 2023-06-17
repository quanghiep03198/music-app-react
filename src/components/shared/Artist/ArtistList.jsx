import Grid from "@/components/customs/Grid"
import SkeletonCard from "../Skeletons/SkeletonCard"
import ArtistCard from "./ArtistCard"

const ArtistList = ({ data, status }) => {
   return (
      <Grid space-x={10} breakpoints={{ sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}>
         {Array.isArray(data) && data.map((artist) => <ArtistCard isFetching={status.isFetching} key={artist?._id} artistData={artist} />)}
      </Grid>
   )
}

export default ArtistList
