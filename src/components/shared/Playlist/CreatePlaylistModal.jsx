import { useCreatePlaylistMutation } from "@/app/services/playlistApi"
import Button from "@/components/customs/atoms/Button"
import { Figure } from "@/components/customs/atoms/Card"
import Typography from "@/components/customs/atoms/Typography"
import useFirebaseUpload from "@/hooks/useFirebaseUpload"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { BsCamera, BsCameraFill, BsX } from "react-icons/bs"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import DefaultPlaylistImage from "/images/default-album-image.png"

const CreatePlaylistModal = () => {
    const { register, formState: errors, handleSubmit, reset } = useForm()
    const creator = useSelector((state) => state.auth?.credential)
    const [createNewPlaylist, { isLoading }] = useCreatePlaylistMutation()

    const imageRef = useRef(null)
    const closeModalButtonRef = useRef(null)

    const { upload, isUploading, isError } = useFirebaseUpload()
    const getCurrentImage = (e) => {
        const url = URL.createObjectURL(e.target.files[0])
        imageRef.current.src = url
    }

    const resetForm = () => {
        reset()
        imageRef.current.src = DefaultPlaylistImage
    }
    const onSubmit = async (data) => {
        try {
            const thumbnail = data.thumbnail.length > 0 ? await upload("pictures/", data.thumbnail[0]) : undefined
            await createNewPlaylist({ thumbnail: thumbnail, title: data.title })
            closeModalButtonRef.current.click()
            toast.success("Created new playlist!")
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>
            <input type="checkbox" id="create-playlist-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label
                        htmlFor="create-playlist-modal"
                        className="btn-sm btn-circle btn absolute right-2 top-2"
                        onClick={resetForm}
                        ref={closeModalButtonRef}
                    >
                        <BsX />
                    </label>
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control self-center">
                            <Typography className="text-center">Choose an image</Typography>
                            <div className="group mask-square relative rounded-xl">
                                <img src={DefaultPlaylistImage} alt="" className="h-[200px] w-[200px] object-contain" ref={imageRef} />

                                <label htmlFor="file" className="absolute top-0 h-[200px] w-[200px] group-hover:bg-black/50 group-hover:duration-500">
                                    <BsCameraFill className="absolute top-1/2 left-1/2 -translate-x-1/2  translate-y-2 text-4xl text-success opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 group-hover:duration-500" />
                                </label>
                            </div>
                            <input
                                type="file"
                                id="file"
                                className="invisible absolute"
                                {...register("thumbnail", { required: false, onChange: (e) => getCurrentImage(e) })}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="" className="label">
                                <span className="label-text">Playlist's title</span>
                            </label>

                            <input
                                type="text"
                                className="input-bordered input"
                                {...register("title", {
                                    required: "Provide a title!",
                                    minLength: {
                                        value: 3,
                                        message: "Playlist's title should have at least 6 characters!"
                                    }
                                })}
                            />
                            {errors.title && <small className="error-message">{errors.title?.message}</small>}
                        </div>
                        <div className="form-control">
                            <Button isLoading={isUploading} color="success">
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default CreatePlaylistModal
