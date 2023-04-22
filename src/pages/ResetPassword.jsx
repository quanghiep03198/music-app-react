import axios from "axios"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Button from "../components/customs/@core/Button"
import ErrorBoundary from "../components/customs/ErrorBoundary"
import Logo from "/images/logo.png"

const ResetPassword = () => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()

    const navigate = useNavigate()
    const { ref } = register("verifyCode")
    const verifyCodeRef = useRef(null)

    const onSubmit = async (data) => {
        try {
            const token = sessionStorage.getItem("accessToken")
            const response = await axios.post("/reset-password", data, {
                headers: { Authorization: "Bearer" + " " + token }
            })
            if (response.status === 403) {
                toast.error(response.message)
                return
            }
            sessionStorage.removeItem("accessToken")
            toast.success("Reset password successfully!")
            navigate("/login")
        } catch (error) {
            toast.error("Opps! Something went wrong!")
        }
    }

    if (!token) return <Navigate to="/" replace />
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
                                            <span className="label-text">Verify Code</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="email"
                                            className="input-bordered input"
                                            {...register("verifyCode", {
                                                required: "Provide an verify code!"
                                            })}
                                            ref={(e) => {
                                                ref(e)
                                                verifyCodeRef.current = e
                                            }}
                                        />

                                        {errors.verifyCode && <small className="error-message">{errors.verifyCode?.message}</small>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">New Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="input-bordered input"
                                            {...register("password", {
                                                required: "Provide a password",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must have at least 6 characters"
                                                }
                                            })}
                                        />
                                        {errors.password && <small className="error-message">{errors.password?.message}</small>}
                                    </div>
                                    <div className="form-control mt-6">
                                        <Button color="success" className="text-lg capitalize">
                                            reset password
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

export default ResetPassword
