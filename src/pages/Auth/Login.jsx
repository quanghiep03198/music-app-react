import useLocalStorage from "@/hooks/useLocalStorage"
import { useLoginWithEmailMutation } from "@/providers/api/authApi"
import { loginWithGoogle } from "@/providers/reducers/authSlice"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useEffect, useRef } from "react"
import { Button, Card, Divider, Form, Hero, Input } from "react-daisyui"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import tw from "tailwind-styled-components"
import Logo from "/images/logo.png"
import { Paths } from "@/config/paths.config"

const LoginPage = () => {
   const {
      register,
      formState: { errors },
      handleSubmit
   } = useForm({ shouldUnregister: true })
   const emailRef = useRef(null)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { ref } = register("email")
   const [login, { isLoading }] = useLoginWithEmailMutation()
   const [_accessToken, setAccessToken] = useLocalStorage("access_token", null)
   const [_uid, setUID] = useLocalStorage("uid", null)

   useEffect(() => {
      emailRef.current.focus()
      emailRef.current.scrollIntoView({ behavior: "smooth" })
   }, [])

   const googleLoginWithPopup = useGoogleLogin({
      onSuccess: async (response) => {
         try {
            const configs = {
               headers: { Authorization: response.token_type + " " + response.access_token }
            }
            const { data } = await axios.get(import.meta.env.VITE_BASE_URL + "/auth/google/login", configs)
            setAccessToken(data?.accessToken)
            setUID(data?.uid)
            dispatch(loginWithGoogle(data))
            toast.success("Logged in successfully")
            navigate("/")
         } catch (error) {
            toast.error("Failed to login!")
         }
      },
      onError: () => toast.error("Failed to login!")
   })

   const onSubmit = async (data) => {
      try {
         const user = await login(data).unwrap()
         setAccessToken(user?.accessToken)
         setUID(user?.uid)
         toast.success("Logged in successfully!")
         navigate("/")
      } catch (error) {
         toast.error(error.message)
      }
   }

   return (
      <Hero className="h-screen">
         <Hero.Content className="flex-col xl:flex-row-reverse">
            <Hero.Caption>
               <h1 className="text-5xl font-bold">Login now!</h1>
               <p className="py-6 text-xl sm:text-base xxl:whitespace-normal">
                  Millions of songs are waiting for you. Login to experience more and more interesting features
               </p>
            </Hero.Caption>
            <Card className="glass max-w-md">
               <Card.Body>
                  <Image src={Logo} />
                  <Button type="submit" size="block" className="gap-2" onClick={googleLoginWithPopup}>
                     <FcGoogle /> Continue with Google account
                  </Button>
                  <Divider className="divider">Or</Divider>
                  <Form onSubmit={handleSubmit(onSubmit)} className="items-stretch">
                     <Form.Control>
                        <Form.Label title="Email" />

                        <Input
                           type="text"
                           placeholder="email"
                           className="input-bordered"
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
                     </Form.Control>
                     <Form.Control>
                        <Form.Label title="Password" />
                        <Input
                           type="password"
                           placeholder="password"
                           className="input-bordered input"
                           {...register("password", {
                              required: true
                           })}
                        />
                        {errors.password && <small className="error-message">Provide a password!</small>}
                        <Label>
                           <Link to={Paths.FORGOT_PASSWORD} className="link-hover label-text-alt link">
                              Forgot password?
                           </Link>
                           <Link to={Paths.REGISTER} className="link-hover label-text-alt link">
                              Create new account
                           </Link>
                        </Label>
                     </Form.Control>
                     <Form.Control className="mt-6">
                        <Button color="success" loading={isLoading}>
                           Login
                        </Button>
                     </Form.Control>
                  </Form>
               </Card.Body>
            </Card>
         </Hero.Content>
      </Hero>
   )
}

const Image = tw.img`max-w-full object-cover text-center`
const Label = tw.label`label`
Hero.Caption = tw.div`flex flex-col items-center justify-center text-center lg:text-left`
Form.Control = tw.div`flex flex-col gap-px`

export default LoginPage
