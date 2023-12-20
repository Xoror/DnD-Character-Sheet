import React, { forwardRef } from "react"


const Card = forwardRef(({children, className, ...restProps}, ref) => {
    let subComponentList = Object.keys(Card);
    let subComponents = []
    let childs = children.length === undefined ? children :  children.filter(child => child != null && child != "")
   
    subComponentList.forEach((key) => {
        React.Children.forEach(childs, (child) => (
            child.type.name === key ? subComponents.push(child) : null
        ))
    })
    if(subComponents.length === 0) {
        subComponents = [childs]
    }
    //console.log(subComponents)

    return (
        <div ref={ref} className={"sg-card" + " " + className} {...restProps}>
            {subComponents.map(subComponent => subComponent)}
        </div>
    )
})

const Header = forwardRef(({as, className, children, ...restProps}, ref) => {
    let validAs = ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "div"
    return (
        <Component ref={ref} className={`sg-card-header ${className}`} {...restProps}>
            {children}
        </Component>
    )
})
Card.Header = Header

const Body = ({children, className, ...restProps}, ref) => {
    children = children.length ? children.filter(child => child != null && child != "") : children
    let subComponents = []
    React.Children.forEach(children, (child) => {
        subComponents.push(child)
    })
    return (
        <div ref={ref} className={`sg-card-body ${className}`} {...restProps}>
            {subComponents.map(subComponent => subComponent)}
        </div>
    )
}
Card.Body = forwardRef(Body)

const Title = forwardRef(({as, className, children, ...restProps}, ref) => {
    let validAs = ["h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "h5"
    return (
        <Component ref={ref} className={className} {...restProps}>
            {children}
        </Component>
    )
})
Card.Title = Title

const Text = ({children, className, ...restProps}, ref) => {
    return (
        <p ref={ref} className={`sg-card-text ${className}`} {...restProps}>
            {children}
        </p>
    )
}
Card.Text = forwardRef(Text)

const Footer = ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-card-footer ${className}`} {...restProps}>
            {children}
        </div>
    )
}
Card.Footer = forwardRef(Footer)

export default Card