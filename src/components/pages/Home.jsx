import tw from "tailwind-styled-components";
import TrackList from "../shared/Track/TrackList";

import { LoadingWrapper } from "@/App";
import { useFetchAlbumsQuery } from "@/app/services/albumApi";
import { useFetchArtistsQuery } from "@/app/services/artistApi";
import { useFetchUserPlaylistsQuery } from "@/app/services/playlistApi";
import { useFetchTracksQuery } from "@/app/services/trackApi";
import useRenderOnScroll from "@/hooks/useRenderOnScroll";
import { Fragment, useRef } from "react";
import Loading from "../customs/atoms/Loading";
import Typography from "../customs/atoms/Typography";
import AlbumSlider from "../shared/Album/AlbumSlider";
import ArtistSlider from "../shared/Artist/ArtistSlider";
import PlaylistSlider from "../shared/Playlist/PlaylistSlider";
import SkeletonCard from "../shared/Skeletons/SkeletonCard";
import SkeletonSlider from "../shared/Skeletons/SkeletonSlider";

export const PageContent = tw.div`flex flex-col gap-10 items-stretch h-full`;

const HomePage = () => {
   const fetchTracksResponse = useFetchTracksQuery({
      skip: 0,
      limit: 5,
   });

   const fetchPlaylistsResponse = useFetchUserPlaylistsQuery({
      id: import.meta.env.VITE_ADMIN_ID,
      query: { skip: 0, limit: 10 },
   });

   const fetchArtistsResponse = useFetchArtistsQuery({ skip: 0, limit: 10 });
   const fetchAlbumsResponse = useFetchAlbumsQuery({
      skip: 0,
      limit: 10,
   });

   return (
      <>
         <section className="pb-10">
            <Typography tranform="capitalize" size="2xl">
               most popular
            </Typography>
            <TrackList data={fetchTracksResponse.data} status={{ isFetching: fetchTracksResponse.isFetching }} />
         </section>

         <section>
            <Typography tranform="capitalize" size="2xl">
               Bass Station mixes
            </Typography>
            <PlaylistSlider
               data={fetchPlaylistsResponse.data}
               status={{ isFetching: fetchPlaylistsResponse.isFetching }}
            />
         </section>

         <section>
            <Typography tranform="capitalize" size="2xl">
               artists you also like
            </Typography>
            <ArtistSlider data={fetchArtistsResponse.data} status={{ isFetching: fetchArtistsResponse.isFetching }} />
         </section>

         <section>
            <Typography tranform="capitalize" size="2xl">
               new albums
            </Typography>
            <AlbumSlider data={fetchAlbumsResponse.data} status={{ isFetching: fetchAlbumsResponse.isFetching }} />
         </section>
      </>
   );
};

export default HomePage;
