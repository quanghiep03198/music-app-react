import React from "react"
import Logo from "/images/logo.png"

const Footer = () => {
   return (
      <footer className=" bg-base-300 p-10 text-base-content">
         <div className="footer mx-auto max-w-7xl">
            <div>
               <img src={Logo} alt="" className="max-w-[10rem] -translate-x-4 object-contain" />
               <p>Copyright © 2023 - All right reserved</p>
            </div>
            <div>
               <span className="footer-title">Services</span>
               <a className="link-hover link">Branding</a>
               <a className="link-hover link">Design</a>
               <a className="link-hover link">Marketing</a>
               <a className="link-hover link">Advertisement</a>
            </div>
            <div>
               <span className="footer-title">Company</span>
               <a className="link-hover link">About us</a>
               <a className="link-hover link">Contact</a>
               <a className="link-hover link">Jobs</a>
               <a className="link-hover link">Press kit</a>
            </div>
            <div>
               <span className="footer-title">Legal</span>
               <a className="link-hover link">Terms of use</a>
               <a className="link-hover link">Privacy policy</a>
               <a className="link-hover link">Cookie policy</a>
            </div>
         </div>
      </footer>
   )
}

export default Footer
