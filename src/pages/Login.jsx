import { useLoginWithEmailMutation } from "@/redux/api/authApi"
import Button from "@/components/customs/@core/Button"
import ErrorBoundary from "@/components/customs/ErrorBoundary"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { FaFacebookSquare } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Logo from "/images/logo.png"
import instance from "@/config/axios.config"
import { popup } from "popup-tools"
import { loginWithGoogle } from "@/redux/reducers/authSlice"
import { useDispatch } from "react-redux"

const LoginPage = () => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({ shouldUnregister: true })
    const emailRef = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginWithEmailMutation()
    useEffect(() => {
        emailRef.current.focus()
        emailRef.current.scrollIntoView({ behavior: "smooth" })
    }, [])

    const googleLoginWithPopup = () => {
        popup(import.meta.env.VITE_BASE_URL + "/auth/google/login", "Continue with Google account", { width: 500, height: 500 }, (err, user) => {
            if (err) {
                return
            }
            if (user && user instanceof Object) {
                console.log(user)
                toast.success("Logged in successfully!")
                dispatch(loginWithGoogle(user))
                navigate("/")
            }
        })
    }
    const { ref } = register("email")

    const onSubmit = async (data) => {
        try {
            const user = await login(data).unwrap()
            console.log(user)
            toast.success("Logged in successfully!")
            navigate("/")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col xl:flex-row-reverse xxl:flex-row-reverse">
                <div className="flex flex-col items-center justify-center text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6 text-xl sm:text-base xxl:truncate">
                        Millions of songs are waiting for you. Login to experience more and more interesting features
                    </p>
                </div>
                <div className="card glass w-full max-w-sm flex-shrink-0 shadow-2xl">
                    <div className="card-body">
                        <img src={Logo} className=" max-w-full object-cover text-center" />
                        <div className="form-control gap-2">
                            <Button type="submit" size="block" className="gap-2" onClick={googleLoginWithPopup}>
                                <FcGoogle /> Continue with Google account
                            </Button>

                            <form action="">
                                <Button type="submit" size="block" className="gap-2">
                                    <FaFacebookSquare className="text-[#3b5998]" />
                                    Continue with Facebook account
                                </Button>
                            </form>
                        </div>
                        <ErrorBoundary>
                            <div className="divider">Or</div>
                            <form onSubmit={handleSubmit(onSubmit)} action={import.meta.env.VITE_BASE_URL + "/login"}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="email"
                                        className="input-bordered input"
                                        {...register("email", {
                                            required: "Provide an email!",
                                            pattern: {
                                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                                message: "Email is invalid"
                                            }
                                        })}
                                        ref={(e) => {
                                            ref(e)
                                            emailRef.current = e
                                        }}
                                    />

                                    {errors.email && <small className="error-message">{errors.email?.message}</small>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="password"
                                        className="input-bordered input"
                                        {...register("password", {
                                            required: true
                                        })}
                                    />
                                    {errors.password && <small className="error-message">Provide a password!</small>}
                                    <label className="label">
                                        <Link to="/forgot-password" className="link-hover label-text-alt link">
                                            Forgot password?
                                        </Link>
                                        <Link to="/register" className="link-hover label-text-alt link">
                                            Create new account
                                        </Link>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <Button color="success" className={`text-lg ${isLoading && "loading"}`}>
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
