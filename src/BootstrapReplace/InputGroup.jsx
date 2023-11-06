import React, { forwardRef } from "react";

const InputGroup = forwardRef(({children, className,  ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-input-group${className ? " "+className : ""}`} {...restProps}>
            {children}
        </div>
    )
})

const Text = ({children, className, ...restProps}, ref) => {
    return (
        <span ref={ref} className={`sg-input-group-text${className ? " "+className : ""}`} {...restProps}>
            {children}
        </span>
    )
}
InputGroup.Text = forwardRef(Text)

export default InputGroup