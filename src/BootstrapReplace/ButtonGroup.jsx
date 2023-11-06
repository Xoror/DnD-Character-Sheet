import React, { forwardRef } from "react"


const ButtonGroup = ({ children, className, vertical=false, ...restProps}, ref) => {
    return (
        <div ref={ref} role="group" className={`sg-button-group${vertical ? "-vertical" : ""}${className ? " "+className : ""}`} {...restProps}>
            {children}
        </div>
    )
}

export default forwardRef(ButtonGroup)