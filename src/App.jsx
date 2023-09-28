import { Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ErrorBoundary from "./components/error/ErrorBoundary"
import Router from "./router/Routes"

function App() {
   return (
      <ErrorBoundary>
         <Router />

         <ToastContainer
            hideProgressBar={true}
            transition={Slide}
            autoClose={1000}
            limit={1}
            toastClassName={() => `alert`}
            position="top-center"
            closeButton={false}
         />
      </ErrorBoundary>
   )
}

export default App
