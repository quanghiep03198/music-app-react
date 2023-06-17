import Typography from "@/components/customs/Typography"
import { AppContext, ModalActionEnum } from "@/context/AppProvider"
import useFirebaseUpload from "@/hooks/useFirebaseUpload"
import { useFetchArtistsQuery } from "@/providers/api/artistApi"
import { useFetchAllGenresQuery } from "@/providers/api/genreApi"
import { useCreateTrackMutation } from "@/providers/api/trackApi"
import { Fragment, useContext, useRef, useState } from "react"
import { Button, FileInput, Form, Input, Modal, Select } from "react-daisyui"
import { useForm } from "react-hook-form"
import { BsCameraFill, BsX } from "react-icons/bs"
import { toast } from "react-toastify"
import tw from "tailwind-styled-components"
import DefaultPlaylistImage from "/images/default-album-image.png"

const UploadTrackModal = () => {
   const { modalStates, handleToggleModal } = useContext(AppContext)
   const { register, formState: errors, handleSubmit, reset } = useForm()
   const [createNewTrack, { isLoading }] = useCreateTrackMutation()
   const { data: artists } = useFetchArtistsQuery({ skip: 0, limit: 100 })
   const { data: genres } = useFetchAllGenresQuery(undefined)
   const trackThumbnailRef = useRef(null)
   const closeModalButtonRef = useRef(null)
   const audioRef = useRef(null)
   const { upload, isUploading, isError } = useFirebaseUpload()
   const [duration, setDuration] = useState(0)

   // show preview thumbnail
   const getCurrentImage = (e) => {
      const url = URL.createObjectURL(e.target.files[0])
      trackThumbnailRef.current.src = url
   }

   // close modal
   const handleCloseModal = () => {
      handleToggleModal({ type: ModalActionEnum.TOGGLE_UPLOAD_MODAL })
      reset()
      trackThumbnailRef.current.src = DefaultPlaylistImage
   }

   // get song duration
   const setCurrentUploadFile = async (e) => {
      audioRef.current.src = URL.createObjectURL(e.target.files[0])
      audioRef.current.preload = "metadata"
      const duration = await new Promise((resolve) => {
         audioRef.current.addEventListener("loadedmetadata", () => {
            resolve(audioRef.current.duration)
         })
      })
      setDuration(duration)
   }

   // upload file
   const onSubmit = async (data) => {
      try {
         data.thumbnail = data.thumbnail.length > 0 ? await upload("pictures/", data.thumbnail[0]) : undefined
         const downloadUrl = await upload("music/", data.file[0])

         const response = await createNewTrack({
            thumbnail: data.thumbnail,
            title: data.title,
            downloadUrl: downloadUrl,
            trackSrc: downloadUrl,
            duration: duration
         })
         closeModalButtonRef.current.click()
         toast.success("Created new playlist!")
      } catch (error) {
         return await Promise.reject(error)
      }
   }

   return (
      <Fragment>
         <audio className="hidden" ref={audioRef} />
         <Modal open={modalStates.uploadModalState} onClickBackdrop={handleCloseModal}>
            <Button shape="circle" color="ghost" className="absolute right-2 top-2" onClick={handleCloseModal} ref={closeModalButtonRef}>
               <BsX />
            </Button>
            <Modal.Body>
               <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                  <Form.Control className="self-center">
                     <Typography className="text-center">Choose an image</Typography>
                     <ImageFieldControl className="group">
                        <ImageFieldControl.Image src={DefaultPlaylistImage} alt="" ref={trackThumbnailRef} />
                        <ImageFieldControl.Label htmlFor="track-thumbnail">
                           <ImageFieldControl.Icon />
                        </ImageFieldControl.Label>
                        <ImageFieldControl.Input
                           type="file"
                           id="track-thumbnail"
                           {...register("thumbnail", { required: false, onChange: (e) => getCurrentImage(e) })}
                        />
                     </ImageFieldControl>
                  </Form.Control>
                  <Form.Control>
                     <Input
                        type="text"
                        placeholder="Title"
                        className="input-bordered"
                        {...register("title", {
                           required: "Provide a title!",
                           minLength: {
                              value: 3,
                              message: "Track's title should have at least 6 characters!"
                           }
                        })}
                     />
                     {errors.title && <small className="error-message">{errors.title?.message}</small>}
                  </Form.Control>
                  <Form.Control>
                     <Select className="select-bordered select">
                        <Select.Option>-- Pick a genre --</Select.Option>
                        {Array.isArray(genres) &&
                           genres.map((genre) => (
                              <Select.Option key={genre._id} value={genre._id}>
                                 {genre.name}
                              </Select.Option>
                           ))}
                     </Select>
                  </Form.Control>
                  <Form.Control>
                     <Select className="select-bordered select">
                        <Select.Option value="">-- Tribute to an artist --</Select.Option>
                        {Array.isArray(artists) &&
                           artists.map((artist) => (
                              <Select.Option key={artist._id} value={artist._id}>
                                 {artist.name}
                              </Select.Option>
                           ))}
                     </Select>
                  </Form.Control>
                  <Form.Control>
                     <FileInput
                        type="file"
                        className="file:btn"
                        {...register("file", {
                           required: "Provide a file!"
                        })}
                        onChange={(e) => setCurrentUploadFile(e)}
                     />
                     {errors.file && <small className="error-message">{errors.file?.message}</small>}
                  </Form.Control>

                  <Form.Control>
                     <Button isLoading={isUploading} color="success" className="text-lg">
                        Save
                     </Button>
                  </Form.Control>
               </Form>
            </Modal.Body>
         </Modal>
      </Fragment>
   )
}

Form.Control = tw.div`flex flex-col gap-px`
const ImageFieldControl = tw.div`mask-square relative rounded-xl`
ImageFieldControl.Image = tw.img`h-[200px] w-[200px] object-contain`
ImageFieldControl.Label = tw.label`absolute top-0 h-[200px] w-[200px] group-hover:bg-black/50 group-hover:duration-500`
ImageFieldControl.Icon = tw(
   BsCameraFill
)`absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-2 text-4xl text-success opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 group-hover:duration-500`
ImageFieldControl.Input = tw.input`invisible absolute`

export default UploadTrackModal
