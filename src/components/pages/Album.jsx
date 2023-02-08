import { useFetchSingleAlbumQuery } from "@/app/services/albumApi";
import Button from "@/components/customs/atoms/Button";
import ErrorBoundary from "@/components/customs/ErrorBoundary";
import TrackList from "@/components/shared/Track/TrackList";
import { AppContext } from "@/context/AppProvider";
import { useContext } from "react";
import { BsPauseFill, BsPlayFill, BsThreeDots } from "react-icons/bs";

import { Link, useParams } from "react-router-dom";
import HeroBanner from "../customs/atoms/HeroBanner";
import DefaultThumbnail from "/images/default-thumbnail.png";
import { setCurrentPlaylist } from "@/app/slices/queueSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "../customs/atoms/Dropdown";

const AlbumPage = () => {
   const { id } = useParams();
   const { data } = useFetchSingleAlbumQuery(id);
   console.log("album:>>", data);
   const { playState, setPlayState } = useContext(AppContext);
   const currentPlaylist = useSelector((state) => state.queue?.currentPlaylist);
   const dispatch = useDispatch();
   const togglePlayPlaylist = () => {
      if (data.album._id && data.album._id !== currentPlaylist) {
         dispatch(
            setCurrentPlaylist({
               tracks: data.tracks,
               playlistId: data.album._id,
            }),
         );
      }
      setPlayState(!playState);
   };
   return (
      <ErrorBoundary>
         <HeroBanner heroImageUrl={data?.album?.image || DefaultThumbnail}>
            <div className="flex flex-col gap-4">
               <h1 className="text-6xl font-bold sm:text-4xl md:text-4xl ">{data?.album?.title}</h1>
               <p className="flex items-center gap-4 text-lg sm:text-sm">
                  {Array.isArray(data?.tracks) ? data?.tracks?.length : 0} tracks
               </p>

               <Link className="font-semibold text-base-content hover:link">{data?.album?.artist?.name}</Link>

               <p className="text-base-content/50">
                  Relased at{" "}
                  <span className="font-semibold text-base-content">
                     {new Date(data?.album?.releaseDate).toLocaleDateString()}
                  </span>
               </p>
            </div>
         </HeroBanner>
         <section className="flex items-center gap-3">
            <Button shape="circle" color="success" className="text-xl sm:text-sm" onClick={togglePlayPlaylist}>
               {playState ? <BsPauseFill /> : <BsPlayFill />}
            </Button>
            <Dropdown>
               <Button color="transparent" className="text-xl" tabIndex={0}>
                  <BsThreeDots />
               </Button>
            </Dropdown>
         </section>
         <TrackList data={data?.tracks} />
      </ErrorBoundary>
   );
};

export default AlbumPage;
