import Typography from "@/components/customs/Typography"
import { AppContext, ModalActionEnum } from "@/context/AppProvider"
import { useCreatePlaylistMutation } from "@/providers/api/playlistApi"
import { useContext, useId, useRef } from "react"
import { Button, FileInput, Form, Input, Modal, Toggle } from "react-daisyui"
import { useForm } from "react-hook-form"
import { BsCameraFill, BsX } from "react-icons/bs"
import { toast } from "react-toastify"
import tw from "tailwind-styled-components"
import DefaultPlaylistImage from "/images/default-thumbnail.png"

const CreatePlaylistModal = () => {
   const { register, formState: errors, handleSubmit, reset } = useForm()
   const [createNewPlaylist, { isLoading }] = useCreatePlaylistMutation()
   const { modalStates, handleToggleModal } = useContext(AppContext)
   const imageRef = useRef(null)
   const id = useId()

   const getCurrentImage = (e) => {
      const url = URL.createObjectURL(e.target.files[0])
      imageRef.current.src = url
   }

   const handleCloseModal = () => {
      reset()
      handleToggleModal({ type: ModalActionEnum.TOGGLE_CREATE_PLAYLIST_MODAL })
      imageRef.current.src = DefaultPlaylistImage
   }

   const onSubmit = async (data) => {
      try {
         const form = new FormData()
         if (data.thumbnail.length > 0) form.append("thumbnail", data.thumbnail[0])
         form.append("title", data.title)
         form.append("public", data.public)
         await createNewPlaylist(form)
         toast.success("Created new playlist !")
      } catch (error) {
         toast.error("Failed to create playlist !")
      } finally {
         handleCloseModal()
      }
   }

   return (
      <Modal open={modalStates.createPlaylistModalState} onClickBackdrop={handleCloseModal}>
         <Button color="ghost" shape="circle" className="absolute right-2 top-2" onClick={handleCloseModal}>
            <BsX className="text-lg" />
         </Button>
         <Form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <Form.Control className="self-center">
               <Typography className="text-center">Choose an image</Typography>
               <ImageFieldControl className="group">
                  <ImageFieldControl.Image src={DefaultPlaylistImage} alt="" ref={imageRef} />
                  <ImageFieldControl.Label htmlFor={id}>
                     <ImageFieldControl.Icon />
                  </ImageFieldControl.Label>
                  <ImageFieldControl.Input type="file" id={id} {...register("thumbnail", { required: false, onChange: (e) => getCurrentImage(e) })} />
               </ImageFieldControl>
               <FileInput
                  type="file"
                  id={id}
                  className="invisible absolute"
                  {...register("thumbnail", { required: false, onChange: (e) => getCurrentImage(e) })}
               />
            </Form.Control>
            <Form.Control>
               <Label htmlFor="" className="label">
                  <Label.Text>Playlist's title</Label.Text>
               </Label>

               <Input
                  type="text"
                  bordered
                  placeholder="Title"
                  {...register("title", {
                     required: "Provide a title!",
                     minLength: {
                        value: 3,
                        message: "Playlist's title should have at least 6 characters!"
                     }
                  })}
               />
               {errors.title && <small className="error-message">{errors.title?.message}</small>}
            </Form.Control>
            <Form.Control>
               <Label htmlFor="status">
                  <Label.Text>Make it public</Label.Text>
                  <Toggle id="status" color="success" {...register("public")} />
               </Label>
            </Form.Control>

            <Button type="submit" loading={isLoading} color="success" size="md" className="text-lg font-semibold">
               Save
            </Button>
         </Form>
      </Modal>
   )
}

Form.Control = tw.div`form-control`
const ImageFieldControl = tw.div`mask-square relative rounded-xl`
ImageFieldControl.Image = tw.img`h-[200px] w-[200px] object-contain`
ImageFieldControl.Label = tw.label`absolute top-0 h-[200px] w-[200px] group-hover:bg-black/50 group-hover:duration-500`
ImageFieldControl.Icon = tw(
   BsCameraFill
)`absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-2 text-4xl text-success opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 group-hover:duration-500`
ImageFieldControl.Input = tw.input`invisible absolute`
const Label = tw.label`label`
Label.Text = tw.span`label-text`

export default CreatePlaylistModal
