import Grid from "@/components/customs/Grid"
import GenreCard from "./GenreCard"

const GenreList = ({ data, status }) => {
   return (
      <Grid space-x={10} breakpoints={{ sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}>
         {Array.isArray(data) && data.map((genre) => <GenreCard key={genre._id} data={genre} />)}
      </Grid>
   )
}

export default GenreList
