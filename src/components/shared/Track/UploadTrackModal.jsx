import { useFetchAllGenresQuery } from "@/redux/api/genreApi"
import { useCreateTrackMutation } from "@/redux/api/trackApi"
import ErrorBoundary from "@/components/customs/ErrorBoundary"
import Button from "@/components/customs/@core/Button"
import Typography from "@/components/customs/@core/Typography"
import useFirebaseUpload from "@/hooks/useFirebaseUpload"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { BsCameraFill, BsX } from "react-icons/bs"
import { toast } from "react-toastify"
import DefaultPlaylistImage from "/images/default-album-image.png"
import { useFetchArtistsQuery } from "@/redux/api/artistApi"

const UploadTrackModal = () => {
    const { register, formState: errors, handleSubmit, reset } = useForm()
    const [createNewTrack, { isLoading }] = useCreateTrackMutation()
    const { data: artists } = useFetchArtistsQuery({ skip: 0, limit: 100 })
    const { data: genres } = useFetchAllGenresQuery(undefined)
    const trackThumbnailRef = useRef(null)
    const closeModalButtonRef = useRef(null)
    const audioRef = useRef(null)
    const { upload, isUploading, isError } = useFirebaseUpload()
    const [duration, setDuration] = useState(0)

    const getCurrentImage = (e) => {
        const url = URL.createObjectURL(e.target.files[0])
        trackThumbnailRef.current.src = url
    }

    const resetForm = () => {
        reset()
        trackThumbnailRef.current.src = DefaultPlaylistImage
    }
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
        <ErrorBoundary>
            <input type="checkbox" id="upload-track-modal" className="modal-toggle" />
            <div className="modal">
                <div className="invisible-scroll modal-box max-w-sm">
                    <audio className="hidden" ref={audioRef} />
                    <label htmlFor="upload-track-modal" className="btn-sm btn-circle btn absolute right-2 top-2" onClick={resetForm} ref={closeModalButtonRef}>
                        <BsX />
                    </label>
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control self-center">
                            <Typography className="text-center">Choose an image</Typography>
                            <div className="group mask-square relative rounded-xl">
                                <img src={DefaultPlaylistImage} alt="" className="h-[200px] w-[200px] object-contain" ref={trackThumbnailRef} />

                                <label
                                    htmlFor="track-thumbnail"
                                    className="absolute top-0 h-[200px] w-[200px] group-hover:bg-black/50 group-hover:duration-500">
                                    <BsCameraFill className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 text-4xl text-success opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 group-hover:duration-500" />
                                </label>
                            </div>
                            <input
                                type="file"
                                id="track-thumbnail"
                                className="invisible absolute"
                                {...register("thumbnail", { required: false, onChange: (e) => getCurrentImage(e) })}
                            />
                        </div>
                        <div className="form-control relative">
                            <input
                                type="text"
                                className="input-bordered input"
                                placeholder="Title"
                                {...register("title", {
                                    required: "Provide a title!",
                                    minLength: {
                                        value: 3,
                                        message: "Track's title should have at least 6 characters!"
                                    }
                                })}
                            />
                            {errors.title && <small className="error-message">{errors.title?.message}</small>}
                        </div>
                        <div className="form-control">
                            <select className="select-bordered select">
                                <option>-- Pick a genre --</option>
                                {Array.isArray(genres) &&
                                    genres.map((genre) => (
                                        <option key={genre._id} value={genre._id}>
                                            {genre.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <select name="" id="" className="select-bordered select">
                                <option value="">-- Tribute to an artist --</option>
                                {Array.isArray(artists) &&
                                    artists.map((artist) => (
                                        <option key={artist._id} value={artist._id}>
                                            {artist.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <input
                                type="file"
                                className="file:btn "
                                {...register("file", {
                                    required: "Provide a file!"
                                })}
                                onChange={(e) => setCurrentUploadFile(e)}
                            />
                            {errors.file && <small className="error-message">{errors.file?.message}</small>}
                        </div>

                        <div className="form-control">
                            <Button isLoading={isUploading} color="success" className="text-lg">
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default UploadTrackModal
