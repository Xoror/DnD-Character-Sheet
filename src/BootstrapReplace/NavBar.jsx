import React, { createContext, forwardRef, useMemo } from "react";

export const navbarContext = createContext(null)
const NavbarContextProvider = ({children, value}) => {
    return (
        <navbarContext.Provider value={value}>
            {children}
        </navbarContext.Provider>
    )
}

const Navbar = forwardRef(({children, className, ...restProps}, ref) => {
    let navbarPrefix
    const navbarContext = useMemo(() => {
        navbarPrefix = "sg-navbar-"
    }, [navbarPrefix])

    return (
        <nav ref={ref} className={`sg-navbar${className ? " "+className:""}`} {...restProps}>
            <NavbarContextProvider value={navbarContext}>
                {children}
            </NavbarContextProvider>
        </nav>
    )
})

const Brand = ({children, className, href, as="a", ...restProps}, ref) => {
    const Component = as || (href ? 'a' : 'span')
    return (
        <Component ref={ref} className={`sg-navbar-brand${className ? " "+className:""}`} {...restProps} >
            {children}
        </Component>
    )
}
Navbar.Brand = forwardRef(Brand)
const Text = ({children, className, as="span", ...restProps}, ref) => {
    const Component = as
    return (
        <Component ref={ref} className={`sg-navbar-text${className ? " "+className:""}`} {...restProps}>
            {children}
        </Component>
    )
}
Navbar.Text = forwardRef(Text)

export default Navbar