import React, { forwardRef } from "react"


const Col = ({children, as = "div", className = "", ...restProps}, ref) => {
    const Component = as
    const defaultBreakpoints = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
    const defaultMinBreakpoint = 'xs';
    let classes = ""
    let spans = ""
    let spansArray = []
    defaultBreakpoints.forEach(breakpoint => {
        const propValue = restProps[breakpoint]
        delete restProps[breakpoint]
        let span
        let offset
        let order
        if (typeof propValue === "object" && propValue != null) {
            ({ span, offset, order} = propValue)
        } else {
            span = propValue
        }
        const breakpointString = breakpoint !== defaultMinBreakpoint ? `-${breakpoint}` : ''
        if (span) {
            spans += span === true ? ` sg-col${breakpointString}` : ` sg-col${breakpointString}-${span}`
            spansArray.push(span === true ? ` sg-col${breakpointString}` : ` sg-col${breakpointString}-${span}`)
        }
        if (order != null) {
            classes += ` order${breakpointString}-${order}`
        }
        if (offset != null) {
            classes += ` offset${breakpointString}-${offset}`
        }
    })
    let finalClasses = className + classes + spans
    finalClasses += !spansArray.length ? " sg-col" : ""
    return (
        <Component ref={ref} className={finalClasses} {...restProps}>
            {children}
        </Component>
    )
}

export default forwardRef(Col)