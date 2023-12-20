import React, { createContext, forwardRef, useCallback, useContext, useEffect, useMemo, useState } from "react";


const getDropdownMenuPlacement = (alignEnd, dropDirection, isRTL=false) => {
    const topStart = isRTL ? 'top-end' : 'top-start';
    const topEnd = isRTL ? 'top-start' : 'top-end';
    const bottomStart = isRTL ? 'bottom-end' : 'bottom-start';
    const bottomEnd = isRTL ? 'bottom-start' : 'bottom-end';
    const leftStart = isRTL ? 'right-start' : 'left-start';
    const leftEnd = isRTL ? 'right-end' : 'left-end';
    const rightStart = isRTL ? 'left-start' : 'right-start';
    const rightEnd = isRTL ? 'left-end' : 'right-end';
    let placement = alignEnd ? bottomEnd : bottomStart;
    if (dropDirection === 'up') 
        {
            placement = alignEnd ? topEnd : topStart
        }
    else if (dropDirection === 'end') {
        placement = alignEnd ? rightEnd : rightStart
    } else if (dropDirection === 'start') {
        placement = alignEnd ? leftEnd : leftStart
    } else if (dropDirection === 'down-centered') {
        placement = 'bottom'
    } else if (dropDirection === 'up-centered') {
        placement = 'top'
    }
    return placement;
}
const isEventOnMenu = (event, controlID = "") => {
    let element = event.target
    let condition = true
    let eventIsOnMenu = false
    while(condition) {
        if(element.id != controlID+"-menu") {
            element = element.parentElement
        }
        else {
            eventIsOnMenu = true
            condition = false
        }


        if(element.id === "root") {
            condition = false
            eventIsOnMenu = false
        }
    }
    return eventIsOnMenu
}

export const DropdownContext = createContext(null)
const DropdownContextProvider = ({children, value, ...restProps}) => {
    return (
        <DropdownContext.Provider value={value}>
            {children}
        </DropdownContext.Provider>
    )
}

//Dropdown.defaultProps = { show:false,  drop:"down", align:"start", autoClose:true }

const Dropdown = forwardRef((
        {
            children, className, onSelect, onToggle, controlID,
            drop="down", align="start", autoClose=true, show="default", ...restProps
        }, ref) => {
    const [showInternal, setShowInternal] = useState(show==="default" ? false : show)
    const [activeDescendant, setActiveDescendant] = useState({case:""})

    const internalOnToggle = useCallback((event) => {
        event.stopPropagation()
        console.log("internal")
        setShowInternal(prev => !prev)
    }, [])

    const alignEnd = align === "end"
    const placement = getDropdownMenuPlacement(alignEnd, drop )

    const directionClasses = {
        down: "dropdown",
        'down-centered': `dropdown-center`,
        up: 'dropup',
        'up-centered': 'dropup-center dropup',
        end: 'dropend',
        start: 'dropstart'
    };
    
    const contextValue  = useMemo(() => ({
        align, 
        drop, 
        showInternal: show != "default" && onToggle ? show : showInternal, 
        handleToggle: show != "default" && onToggle ? onToggle : internalOnToggle, 
        placement, 
        directionClasses, 
        controlID, 
        activeDescendant, 
        setActiveDescendant
    }), [align, drop, show, showInternal, onToggle, internalOnToggle, placement, directionClasses, controlID, activeDescendant, setActiveDescendant])
    
    
    return (
        <div id={controlID+"-wrapper"} ref={ref} className={`sg-dropdown${className? " "+className:""}`} {...restProps} >
            <DropdownContextProvider value={contextValue}>
                {children}
            </DropdownContextProvider>
        </div>
    )
})

export const Toggle = ({children, className, navDropdown=false, as="button", variant="primary", ...restProps}, ref) => {
    const { controlID, handleToggle, setActiveDescendant, showInternal } = useContext(DropdownContext)
    const Component = as
    const handleKeyPress = (event) => {
        let flag = false
        switch (event.key) {
            case "ArrowDown":
                flag = true
                if(showInternal) {
                    setActiveDescendant(prev => ({case:"next"}))
                }
                else {
                    handleToggle(event)
                    setActiveDescendant(prev => ({case:"first"}))
                }
                break
            case "ArrowUp":
                flag = true
                if(showInternal) {
                    setActiveDescendant(prev => ({case:"previous"}))
                } else {
                    handleToggle(event)
                    setActiveDescendant(prev => ({case:"last"}))
                }
                break
            case "Home":
                flag = true
                if(showInternal) {
                    setActiveDescendant(prev => ({case:"first"}))
                }
                break
            case "End":
                flag = true
                if(showInternal) {
                    setActiveDescendant(prev => ({case:"last"}))
                }
                break
            case "Escape":
                flag = true
                if(showInternal) {
                    handleToggle(event)
                }
                break
            case "Enter":
            case " ":
                if(showInternal) {
                    flag = true
                    const activeElement = document.querySelector(".sg-dropdown-item-visual-focus")
                    activeElement.click()
                    handleToggle(event)
                    break
                }
                else {
                    setActiveDescendant(prev => ({case:"first"}))
                    break
                }
        }
        if(flag) {
            event.stopPropagation()
            event.preventDefault()
        }
    }
    const handleClick = (event) => {
        //console.log(isEventOnMenu(event, controlID))
        if(!showInternal) return
        if(event.target.id === controlID) return

        if(!isEventOnMenu(event, controlID)) {
            handleToggle(event)
        }
        else if(isEventOnMenu(event, controlID)) {
            handleToggle(event)
            console.log("clickedy-click")
            const toggleElement = document.getElementById(controlID)
            toggleElement.focus()
        }
    }
    useEffect(() => {
        const toggleElement = document.getElementById(controlID)
        toggleElement.addEventListener("keydown", handleKeyPress, true)
        document.addEventListener("mouseup", handleClick, true)
        return function cleanup() {
            toggleElement.removeEventListener("keydown", handleKeyPress, true)
            document.removeEventListener("mouseup", handleClick, true)
        }
    }, [handleKeyPress, controlID])

    const toggleButtonClick = (event) => {
        handleToggle(event)
        if(!showInternal) {
            setActiveDescendant(prev => ({case:"first"}))
        }
    }
    let classNamesComputed = `sg-button sg-button${variant ? "-"+variant:"-primary"} sg-dropdown-toggle${className ? " "+className:""}`
    if (Component === "a" || navDropdown) {
        classNamesComputed = `sg-nav-dropdown-toggle sg-dropdown-toggle${className ? " "+className:""}`
    }
    return (
        <Component tabIndex="0" type="button" aria-haspopup="true" aria-controls={controlID+"-menu"} aria-expanded={showInternal} id={controlID}
            ref={ref} className={classNamesComputed} 
            onClick={event => toggleButtonClick(event)} {...restProps}
        >
            {children}
        </Component>
    )
}
Dropdown.Toggle = forwardRef(Toggle)

export const Menu = ({children, className, ...restProps}, ref) => {
    const { controlID, showInternal, activeDescendant } = useContext(DropdownContext)
    
    useEffect(() => {
        
        if(showInternal) {
            const menu = document.getElementById(controlID+"-menu")
            const menuChildren = document.getElementById(controlID+"-menu").children
            const menuChildrenLast = menuChildren.length - 1
            const elementWithVisualFocus = document.querySelector(".sg-dropdown-item-visual-focus")
            let currentIndex = 0, currentChild = menuChildren[0].children[0]
            if(elementWithVisualFocus != null) {
                for(let i=0; i<menuChildren.length; i++) {
                    if(menuChildren[i] === elementWithVisualFocus.parentElement) {
                        currentIndex = i
                    }
                }
                elementWithVisualFocus.classList.remove("sg-dropdown-item-visual-focus")
            }
            //console.log(currentIndex)
            switch (activeDescendant.case) {
                case "first":
                    currentChild = menuChildren[0].children[0]
                    currentIndex = 0
                    break
                case "last":
                    currentChild = menuChildren[menuChildrenLast].children[0]
                    currentIndex = menuChildrenLast
                    break
                case "next":
                    currentIndex = currentIndex === menuChildrenLast ? 0 : currentIndex + 1
                    currentChild = menuChildren[currentIndex].children[0]
                    break
                case "previous":
                    currentIndex = currentIndex === 0 ? menuChildrenLast : currentIndex - 1
                    currentChild = menuChildren[currentIndex].children[0]
                    break
            }
            menu.setAttribute("aria-activedescendant", currentChild.id)
            menuChildren[currentIndex].children[0].classList.add("sg-dropdown-item-visual-focus")
        } else {
            const menu = document.getElementById(controlID+"-menu")
            menu.setAttribute("aria-activedescendant", "")
        }
    }, [controlID, showInternal, activeDescendant])

    const handleMouseOver = (event) => {
        const target = event.target
        let active=target.classList.contains("sg-dropdown-item-visual-focus")
        
        if(active) {
            return
        } else {
            document.querySelector(".sg-dropdown-item-visual-focus").classList.remove("sg-dropdown-item-visual-focus")
            target.classList.add("sg-dropdown-item-visual-focus")
        }
    }
    useEffect(() => {
        const menu = document.getElementById(controlID+"-menu")
        for (let child of menu.children) {
            child.addEventListener("mouseover", handleMouseOver, true)
        }
        return function cleanup() {
            for (let child of menu.children) {
                child.removeEventListener("mouseover", handleMouseOver, true)
            }
        }
    }, [])

    return (
        <ul id={controlID+"-menu"} role="menu" tabIndex="-1" 
            aria-labelledby={controlID} aria-activedescendant={activeDescendant} aria-expanded={showInternal}
            ref={ref} className={`sg-dropdown-list${className ? " "+className:""}${showInternal ? " show":""}`}
            {...restProps}
        >
            {children}
        </ul>
    )
}
Dropdown.Menu = forwardRef(Menu)

export const Item = ({children, as="button", className, ...restProps}, ref) => {
    const Component = as
    return (
        <li role="none">
            <Component role="menuitem" tabIndex="-1" ref={ref} className={`sg-dropdown-item${className ? " "+className:""}`} {...restProps}>
                {children}
            </Component >
        </li>
    )
}
Dropdown.Item = forwardRef(Item)

export const Divider = ({className="", ...restProps}, ref) => {
    return (
        <hr className={`.sg-dropdown-divider${className}`} {...restProps}></hr>
    )
}
Dropdown.Divider = forwardRef(Divider)


export default Dropdown