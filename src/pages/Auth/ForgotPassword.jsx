import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Button, Card, Form, Hero, Input } from "react-daisyui"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Logo from "/images/logo.png"
import tw from "tailwind-styled-components"

const ForgotPassword = () => {
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
         const response = await axios.post("/forgot-password", data)
         if (response.status === 404) {
            toast.error(response.message)
            return
         }
         setIsLoading(false)
         sessionStorage.setItem("accessToken", response.token)
         toast.info("Check your email to get verify code!")
         navigate("/reset-password")
      } catch (error) {
         toast.error("Opps something went wrong!")
      }
   }
   return (
      <Hero className="min-h-screen bg-base-200">
         <Hero.Content className="hero-content text-center">
            <div className="max-w-md">
               <div className="glass card w-full max-w-sm flex-shrink-0 shadow-2xl">
                  <Card className="card-body text-left">
                     <Image src={Logo} />

                     <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Control className="form-control">
                           <Label className="label">
                              <Label.Text className="label-text">Email</Label.Text>
                           </Label>
                           <Input
                              type="text"
                              placeholder="email"
                              bordered
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

                        <Form.Control className="form-control mt-6">
                           <Button color="success" className="text-lg capitalize">
                              Continue
                           </Button>
                        </Form.Control>
                     </Form>
                  </Card>
               </div>
            </div>
         </Hero.Content>
      </Hero>
   )
}

const Image = tw.img`max-w-full object-cover text-center`
const Label = tw.label`label`
Label.Text = tw.span`label-text`
Form.Control = tw.div`form-control`

export default ForgotPassword
