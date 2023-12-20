import React, { forwardRef, useContext, createContext, useMemo } from "react";

export const FormContext = createContext(false)

const Form = forwardRef(({children, ...restProps}, ref) => {
    return (
        <form ref={ref} {...restProps}>
            {children}
        </form>
    )
})

const Control = ({as = "input", className = "", plaintext = false, id="", type = "text", ...restProps}, ref) => {
    let Component = ["input","textarea"].find(asAllowed => asAllowed === as) ? as : "input"

    const { controlId } = useContext(FormContext)

    let elementId = controlId ? controlId : id

    let computedClassName = (plaintext ? "sg-form-control-plaintext" : "sg-form-control") + (className != "" ? " "+className : "") + (type == "color" ? " sg-form-control-color" : "")

    return (
        <Component ref={ref} id={elementId} type={type} className={computedClassName} {...restProps} />
    )
}
Form.Control = forwardRef(Control)

const Select = ({children, className, id, ...restProps}, ref) => {
    const { controlId } = useContext(FormContext)

    let elementId = controlId ? controlId : id

    return (
        <select ref={ref} className={`sg-form-select${className ? " "+className : ""}`} id={elementId} {...restProps}>
            {children}
        </select>
    )
}
Form.Select = forwardRef(Select)

const Group = ({children, className, controlId, ...restProps}, ref) => {
    const context = useMemo(() => {
        return {controlId: controlId}
    })
    return (
        <div ref={ref} className={`sg-from-group${className ? " "+className : ""}`}>
            <FormContext.Provider value={context} {...restProps}>
                    {children}
         </FormContext.Provider>
        </div>
    )
}
Form.Group = forwardRef(Group)

const Label = ({children, className, htmlFor}, ref) => {
    const { controlId } = useContext(FormContext)

    let elementHtmlFor = htmlFor ? htmlFor : controlId
    return (
        <label ref={ref} htmlFor={elementHtmlFor} className={`sg-form-label${className ? " "+className : ""}`}>
            {children}
        </label>
    )
}
Form.Label = forwardRef(Label)

// <Form.Check className="mb-3" type="checkbox" id="remember me checkbox" label="Remember me" onChange={event => handleChange(event, "remember")}/>
const Check = ({ 
        classNameContainer, containerRef, containerId, style,
        classNameLabel, labelRef, label, labelId,
        className, type, id, controlId, reverse=false, checkStyle, ...restProps 
    } , ref) => {
    
    let elementId = controlId ? controlId : id
    let typeComputed = type === "switch" ? "checkbox" :  type

    return (
        <div ref={containerRef} id={containerId} style={style} className={`sg-form-check${reverse ? "-reverse":""}${classNameContainer ? " "+classNameContainer : ""}${type === "switch" ? " sg-form-switch":""}`}>
            {reverse ?
                <>
                    <input ref={ref} type={typeComputed} id={elementId} className={`sg-form-check-input${className ? " "+className : ""}`} {...restProps} />
                    <label ref={labelRef} id={labelId} htmlFor={elementId}className={`sg-form-check-label${classNameLabel ? " "+classNameLabel : ""}`}>{label}</label>
                </> :
                <>
                    <label ref={labelRef} id={labelId} htmlFor={elementId}className={`sg-form-check-label${classNameLabel ? " "+classNameLabel : ""}`}>{label}</label>
                    <input ref={ref} type={typeComputed} id={elementId} className={`sg-form-check-input${className ? " "+className : ""}`} style={checkStyle} {...restProps} />
                </>
            }
        </div>
    )
}
Form.Check = forwardRef(Check)

export default Form