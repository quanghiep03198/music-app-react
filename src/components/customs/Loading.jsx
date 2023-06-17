import tw from "tailwind-styled-components"

const Loading = tw.div`loading-spinner ${(props) => {
   switch (props.size) {
      case "xs":
         return "loading-spinner-xs"
      case "sm":
         return "loading-spinner-sm"
      case "md":
         return "loading-spinner-md"
      case "lg":
         return "loading-spinner-lg"
      default:
         return "loading-spinner-sm"
   }
}}`
export default Loading
