import React from "react";

import "./Card.scss"

const Card = ({children, className, ...restProps}) => {
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
        <div className={"sg-card" + " " + className} {...restProps}>
            {subComponents.map(subComponent => subComponent)}
        </div>
    )
}

const Header = ({as, className, children, ...restProps}) => {
    let validAs = ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "div"
    return (
        <Component className={`sg-card-header ${className}`} {...restProps}>
            {children}
        </Component>
    )
}
Card.Header = Header;

const Body = ({children, className, ...restProps}) => {
    children = children.length ? children.filter(child => child != null && child != "") : children
    let subComponents = []
    React.Children.forEach(children, (child) => {
        subComponents.push(child)
    })
    return (
        <div className={`sg-card-body ${className}`} {...restProps}>
            {subComponents.map(subComponent => subComponent)}
        </div>
    )
}
Card.Body = Body;

const Title = ({as, className, children, ...restProps}) => {
    let validAs = ["h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "h5"
    return (
        <Component className={className} {...restProps}>
            {children}
        </Component>
    )
}
Card.Title = Title;

const Text = ({children, className, ...restProps}) => {
    return (
        <p className={`sg-card-text ${className}`} {...restProps}>
            {children}
        </p>
    )
}
Card.Text = Text;

const Footer = ({children, className, ...restProps}) => {
    return (
        <div className={`sg-card-footer ${className}`} {...restProps}>
            {children}
        </div>
    )
}
Card.Footer = Footer;

export default Card