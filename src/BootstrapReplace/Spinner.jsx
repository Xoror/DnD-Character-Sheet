import React, { forwardRef } from "react";

const Spinner = ({size="1em", color="white", label, className, controlId, ...restProps}, ref) => {
    return (
        <>
            <div aria-labelledby={controlId} role="status" ref={ref} className={`sg-spinner${className ? " "+className : ""}`} style={{width:"1em", height:"1em", borderColor:{color}}} {...restProps}></div>
            <label id={controlId} className="sg-visually-hidden">{label}</label>
        </>
    )
}

export default forwardRef(Spinner)