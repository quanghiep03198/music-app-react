import React from "react"
import tw from "tailwind-styled-components"

const Button = tw.button`
            btn
            ${(props) => {
                switch (props.shape) {
                    case "circle":
                        return "btn-circle"
                    case "square":
                        return "btn-square"
                    case "pill":
                        return "rounded-full"
                    default:
                        return ""
                }
            }}
            ${(props) => {
                switch (props.size) {
                    case "sm":
                        return "btn-sm"
                    case "md":
                        return "btn-md"
                    case "lg":
                        return "btn-lg"
                    case "wide":
                        return "btn-wide"
                    case "block":
                        return "btn-block"
                    case "responsive":
                        return ""
                    default:
                        return "btn-md"
                }
            }}
            ${(props) => (props.outline ? "btn-outline" : "")}
            ${(props) => {
                switch (props.color) {
                    case "success":
                        return "btn-success"
                    case "error":
                        return "btn-error"
                    case "info":
                        return "btn-info"
                    case "primary":
                        return "btn-primary"
                    case "secondary":
                        return "btn-secondary"
                    case "accent":
                        return "btn-accent"
                    case "ghost":
                        return "btn-ghost"
                    case "transparent":
                        return "btn-ghost hover:bg-transparent"
                    default:
                        return ""
                }
            }}
        `

export default Button
