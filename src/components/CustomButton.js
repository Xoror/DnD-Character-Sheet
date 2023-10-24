import React from "react"

import "./CustomButton.scss"

export const Button = (props) => {
    const {variant, children, ...rest} = props
    return(
        <button className={`button-${variant}`} {...rest}>
            {children}
        </button>
    )
}