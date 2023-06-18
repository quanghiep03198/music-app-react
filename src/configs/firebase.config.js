// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const app = initializeApp({
   apiKey: "AIzaSyA5iFe7_o0tKML96WOdJaB53nPX9NLXehQ",
   authDomain: "music-app-cdef5.firebaseapp.com",
   projectId: "music-app-cdef5",
   storageBucket: "music-app-cdef5.appspot.com",
   messagingSenderId: "959727931499",
   appId: "1:959727931499:web:2e123c3a54f37bb458e12e",
   measurementId: "G-6DJ286CL1G"
})

export const storage = getStorage(app)
export const auth = getAuth(app)
export default app
