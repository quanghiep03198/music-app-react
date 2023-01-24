import Button from "@/components/customs/Atomics/Button"
import { Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { FaFacebookSquare } from "react-icons/fa"
import Logo from "/images/logo.png"
const LoginPage = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col xl:flex-row-reverse xxl:flex-row-reverse">
                <div className="flex flex-col items-center justify-center text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6 text-xl sm:text-base xxl:truncate">
                        Millions of songs are waiting for you. Login to
                        experience more and more interesting features
                    </p>
                </div>
                <div className="card glass w-full max-w-sm flex-shrink-0 shadow-2xl">
                    <div className="card-body">
                        <img
                            src={Logo}
                            className=" max-w-full object-cover text-center"
                        />
                        <div className="form-control gap-2">
                            <Button size="block" className="gap-2">
                                <FcGoogle /> Continue with Google account
                            </Button>
                            <Button size="block" className="gap-2">
                                <FaFacebookSquare className="text-[#3b5998]" />
                                Continue with Facebook account
                            </Button>
                        </div>
                        <div className="divider">Or</div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="email"
                                className="input-bordered input"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="text"
                                placeholder="password"
                                className="input-bordered input"
                            />
                            <label className="label">
                                <Link
                                    to="/forgot-password"
                                    className="link-hover label-text-alt link"
                                >
                                    Forgot password?
                                </Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <Button color="success" className="text-lg">
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
