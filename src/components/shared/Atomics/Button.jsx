import React from "react";
import tw from "tailwind-styled-components";

const Button = tw.button`
            btn
            ${(props) => (props.primary ? "btn-primary" : "")}
            ${(props) => (props.success ? "btn-success" : "")}
            ${(props) => (props.error ? "btn-error" : "")}
            ${(props) => (props.warning ? "btn-warning" : "")}
            ${(props) => (props.ghost ? "btn-ghost" : "")}
            ${(props) => (props.circle ? "btn-circle" : "")}
            ${(props) => (props.size ? props.size : "btn-md")}
            ${(props) => (props.outline ? "btn-outline" : "")}
        `;

export default Button;
