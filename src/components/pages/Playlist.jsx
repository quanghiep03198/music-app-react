import { useDeleteUserPlaylistMutation, useFetchSinglePlaylistQuery } from "@/app/services/playlistApi";
import { setCurrentPlaylist } from "@/app/slices/queueSlice";
import { Dropdown, DropdownContent } from "@/components/customs/atoms/Dropdown";
import HeroBanner from "@/components/customs/atoms/HeroBanner";
import { Menu, MenuItem } from "@/components/customs/atoms/Menu";
import { useContext } from "react";
import { BsPauseFill, BsPencil, BsPlayFill, BsThreeDots, BsTrash, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../customs/atoms/Button";
import TrackList from "../shared/Track/TrackList";
import { AppContext } from "../../context/AppProvider";
import DefaultThumbnail from "/images/default-album-image.png";

const Playlist = () => {
   const { id } = useParams();
   const { data, isFetching } = useFetchSinglePlaylistQuery(id);
   const { playState, setPlayState } = useContext(AppContext);
   const { currentPlaylist } = useSelector((state) => state.queue);
   const { credential } = useSelector((state) => state.auth);
   const [deletePlaylist] = useDeleteUserPlaylistMutation();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const togglePlayPlaylist = () => {
      if (data?._id && data?._id !== currentPlaylist) {
         dispatch(setCurrentPlaylist({ playlistId: data._id, tracks: data }));
      }
      setPlayState(!playState);
   };

   const handleDeletePlaylist = (id) => {
      deletePlaylist(id)
         .then(() => {
            navigate("/");
         })
         .catch((error) => console.log(error.message));
   };

   return (
      <div className="flex h-screen flex-col gap-10">
         <section className="group relative">
            <HeroBanner heroImageUrl={data?.thumbnail !== "" ? data?.thumbnail : DefaultThumbnail}>
               <small className="first-letter:uppercase">{data?.public ? "public playlist" : "private playlist"}</small>
               <h1 className="text-6xl font-bold sm:text-4xl md:text-4xl ">{data?.title}</h1>
               <p className="sm:text-sm">{data?.tracks?.length || 0} tracks</p>
               <p>
                  <span>Created by </span>
                  <Link className="font-bold text-base-content hover:link">{data?.creator?.username}</Link>
               </p>
            </HeroBanner>
         </section>

         <section className="flex items-center gap-3">
            <Button shape="circle" color="success" className="text-xl sm:text-base" onClick={togglePlayPlaylist}>
               {playState && currentPlaylist === data?._id ? <BsPauseFill /> : <BsPlayFill />}
            </Button>
            <Dropdown position="bottom-right">
               <Button color="transparent" className="text-xl" tabIndex={0}>
                  <BsThreeDots />
               </Button>
               <DropdownContent tabIndex={0}>
                  <Menu className="bg-neutral">
                     <MenuItem>
                        <a role="menuitem">
                           <BsPencil /> Edit playlist
                        </a>
                     </MenuItem>
                     {credential === data?.creator?._id && (
                        <MenuItem onClick={() => handleDeletePlaylist(id)}>
                           <a role="menuitem">
                              <BsTrash className="text-xl" /> Delete this playlist
                           </a>
                        </MenuItem>
                     )}
                  </Menu>
               </DropdownContent>
            </Dropdown>
         </section>

         {Array.isArray(data?.tracks) && <TrackList data={data?.tracks} status={{ isFetching: isFetching }} />}
      </div>
   );
};

export default Playlist;
