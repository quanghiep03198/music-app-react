import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ErrorBoundary from "../../components/error/ErrorBoundary"
import Logo from "/images/logo.png"
import { Button, Card, Form, Hero } from "react-daisyui"

const RegisterPage = () => {
   const {
      register,
      formState: { errors },
      handleSubmit
   } = useForm()
   const emailRef = useRef(null)
   const navigate = useNavigate()
   const { ref } = register("email")
   const [isLoading, setIsLoading] = useState(false)
   useEffect(() => {
      emailRef.current.scrollIntoView({ behavior: "smooth" })
   })

   const onSubmit = async (data) => {
      try {
         setIsLoading(true)
         const response = await axios.post("/register", data)
         if (response.status === 400) {
            toast.error(response.message)
            setIsLoading(false)
            return
         }
         toast.info("Check your email to get activating account link!")
         setIsLoading(false)
         navigate("/login")
      } catch (error) {
         toast.error("Opps! Something went wrong!")
      }
   }
   return (
      <Hero className="min-h-screen bg-base-200">
         <Hero.Content className="text-center">
            <div className="max-w-md">
               <Card className="card glass w-full max-w-sm flex-shrink-0 shadow-2xl">
                  <Card.Body className="text-left">
                     <img src={Logo} className=" max-w-full object-cover text-center" />

                     <ErrorBoundary>
                        <Form onSubmit={handleSubmit(onSubmit)}>
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
                              <Button color="success" className={`text-lg capitalize ${isLoading && "loading"}`}>
                                 Create new account
                              </Button>
                           </div>
                        </Form>
                     </ErrorBoundary>
                  </Card.Body>
               </Card>
            </div>
         </Hero.Content>
      </Hero>
   )
}

export default RegisterPage
