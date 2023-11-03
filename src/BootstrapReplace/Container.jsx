import React, { forwardRef } from "react"


const Container = ({children, className, fluid, ...restProps}, ref) => {
    let fluidPrefix = "sg-container"
    let fluidSuffix = typeof fluid === "string" ? `-${fluid}` : '-fluid'
    return (
        <div className={`${fluid ? fluidPrefix+fluidSuffix : fluidPrefix} ${className}`} {...restProps}>
            {children}
        </div>
    )
}

export default forwardRef(Container)