import { storage } from "@/config/firebase.config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"
import { toast } from "react-toastify"

export const IMAGE_DIR = "pictures/"
export const MUSIC_DIR = "music/"

const useFirebaseUpload = () => {
    const [isUploading, setIsUploading] = useState(false)
    const [isError, setIsError] = useState(false)

    return {
        upload: async (dirname, file) => {
            try {
                if (!file) {
                    toast.error("Provide a file!")
                    return
                }
                const storageRef = ref(storage, dirname + file?.name)
                await uploadBytes(storageRef, file)
                setIsUploading(true)
                const dowloadURL = await getDownloadURL(storageRef)
                setIsUploading(false)
                return dowloadURL
            } catch (error) {
                console.log(error.message)
                setIsUploading(false)
                setIsError(true)
                toast.error("Failed to upload file!")
            }
        },
        isUploading,
        isError
    }
}
export default useFirebaseUpload
