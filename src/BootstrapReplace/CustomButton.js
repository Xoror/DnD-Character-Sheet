import React, { forwardRef } from "react"

const Button = (props, ref) => {
    const {variant, children, className, ...rest} = props
    let variants = ["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"] //["red", "blue", "yellow", "green", "purple"]
    let variantTest = variants.find(variantTest => variantTest === variant) ? variant : "primary"
    return(
        <button className={`sg-button sg-button-${variantTest}${className == undefined ? "" : " "+className}`} {...rest}>
            {children}
        </button>
    )
}

export default forwardRef(Button)