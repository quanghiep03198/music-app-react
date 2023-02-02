import axios from "axios"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Button from "../customs/atoms/Button"
import ErrorBoundary from "../customs/ErrorBoundary"
import Logo from "/images/logo.png"

const ForgotPassword = () => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()
    const emailRef = useRef(null)
    const navigate = useNavigate()
    const { ref } = register("email")
    useEffect(() => {
        emailRef.current.scrollIntoView({ behavior: "smooth" })
    })

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/forgot-password", data)
            if (response.status === 404) {
                toast.error(response.message)
                return
            }
            sessionStorage.setItem("token", response.token)
            toast.info("Check your email to get verify code!")
            navigate("/reset-password")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <div className="card glass w-full max-w-sm flex-shrink-0 shadow-2xl">
                        <div className="card-body text-left">
                            <img src={Logo} className=" max-w-full object-cover text-center" />

                            <ErrorBoundary>
                                <form onSubmit={handleSubmit(onSubmit)}>
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

                                    <div className="form-control mt-6">
                                        <Button color="success" className="text-lg capitalize">
                                            Continue
                                        </Button>
                                    </div>
                                </form>
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
