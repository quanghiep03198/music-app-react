import React, { useEffect, useRef } from "react"
import Logo from "/images/logo.png"
import ErrorBoundary from "../customs/ErrorBoundary"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Button from "../customs/atoms/Button"
import { useState } from "react"
import { toast } from "react-toastify"

const RegisterPage = () => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()
    const emailRef = useRef(null)
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const { ref } = register("email")
    useEffect(() => {
        emailRef.current.scrollIntoView({ behavior: "smooth" })
    })

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/register", data)
            console.log(response)
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
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="password"
                                            className="input-bordered input"
                                            {...register("password", {
                                                required: true,
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must have at least 6 characters!"
                                                }
                                            })}
                                        />
                                        {errors.password && <small className="error-message">Provide a password!</small>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">What should we call you?</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input-bordered input"
                                            {...register("username", {
                                                required: "Provide your name!",
                                                minLength: { value: 3, message: "Your name must have at least 3 characters!" }
                                            })}
                                        />
                                        {errors.username && <small className="error-message">{errors.username?.message}</small>}
                                    </div>
                                    <label className="label justify-start gap-2">
                                        <span className="label-text-alt">Already have an account?</span>
                                        <Link to="/login" className="link-hover label-text-alt link">
                                            Login
                                        </Link>
                                    </label>
                                    <div className="form-control mt-6">
                                        <Button color="success" className="text-lg capitalize">
                                            Create new account
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

export default RegisterPage
