import React, { forwardRef } from "react"

const Row = ({children, className = "", as = "div", ...restProps}, ref) => {
    const Component = as
    const defaultBreakpoints = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
    const defaultMinBreakpoint = 'xs';
    let classes = ""
    defaultBreakpoints.forEach(breakpoint => {
        const propValue = restProps[breakpoint]
        delete restProps[breakpoint]
        let cols
        if (propValue != null && typeof propValue === 'object') {
          ({ cols } = propValue)
        } else {
          cols = propValue
        }
        const breakpointString = breakpoint !== defaultMinBreakpoint ? `-${breakpoint}` : ''
        if (cols != null) {
            classes += (` sg-row-cols${breakpointString}-${cols}`)
        }
      })
    return (
    <Component ref={ref} className={`sg-row ${className}${classes}`} {...restProps}>
        {children}
    </Component>
    )
}

export default forwardRef(Row)