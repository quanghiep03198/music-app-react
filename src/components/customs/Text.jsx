import tw from "tailwind-styled-components"

const Text = tw.h1`font-semibold sm:text-2xl mb-6

${(props) => {
   switch (props.fontWeight) {
      case "thin":
         return "font-thin"
      case "extra-light":
         return "font-extra-light"
      case "light":
         return "font-light"
      case "normal":
         return "font-normal"
      case "medium":
         return "font-medium"
      case "semibold":
         return "font-semibold"
      case "bold":
         return "font-bold"
      case "extra-bold":
         return "font-extrabold"
      default:
         return "font-medium"
   }
}}


${(props) => {
   switch (props.align) {
      case "left":
         return "text-left"
      case "right":
         return "text-left"
      case "center":
         return "text-center"
      case "justify":
         return "text-justify"
      default:
         return "text-left"
   }
}}

${(props) => {
   switch (props.size) {
      case "xs":
         return "text-xs"
      case "sm":
         return "text-xs"
      case "base":
         return "text-base"
      case "lg":
         return "text-lg"
      case "xl":
         return "text-xl"
      case "2xl":
         return "text-2xl"
      case "3xl":
         return "text-3xl"
      case "4xl":
         return "text-4xl"
      case "5xl":
         return "text-5xl"
      case "6xl":
         return "text-6xl"
      case "7xl":
         return "text-7xl"

      default:
         break
   }
}}

${(props) => {
   switch (props.transform) {
      case "normal":
         return "normal-case"
      case "uppercase":
         return "uppercase"
      case "lowercase":
         return "lowercase"
      case "capitalize":
         return "capitalize"
      default:
         return "capitalize"
   }
}}
`

export default Text
