import React, { forwardRef } from "react"

const CloseButton = ({className, variant = false, ...restProps}, ref) => {
    return (
        <button className={`sg-button-close${variant ? " sg-button-close-white" : ""} ${className}`} {...restProps}>
            <span className="sg-close-visually-hidden-label">Close</span>
        </button>
    )
}

export default forwardRef(CloseButton)