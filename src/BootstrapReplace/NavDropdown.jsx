import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import Dropdown, { Toggle, Menu, Item, Divider, DropdownContext } from "./Dropdown";

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

const NavDropdownContextProvider = ({children, value, ...restProps}) => {
    return (
        <DropdownContext.Provider value={value} {...restProps}>
            {children}
        </DropdownContext.Provider>
    )
}

//Dropdown.defaultProps = { show:false,  drop:"down", align:"start", autoClose:true }

const NavDropdown = forwardRef((
        {
            children, className, onSelect, onToggle, controlID, toggleProps, title, menuProps,
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
    const controlIDcomputed = controlID ? controlID : "nav-dropdown-"+nanoid()
    const contextValue  = useMemo(() => ({
        align, 
        drop, 
        showInternal: show != "default" && onToggle ? show : showInternal, 
        handleToggle: show != "default" && onToggle ? onToggle : internalOnToggle, 
        placement, 
        directionClasses, 
        controlID: controlIDcomputed, 
        activeDescendant, 
        setActiveDescendant
    }), [align, drop, show, showInternal, onToggle, internalOnToggle, placement, directionClasses, controlID, activeDescendant, setActiveDescendant])
    
    return (
        <div test="true" id={controlID+"-wrapper"} ref={ref} className={`sg-dropdown${className? " "+className:""} sg-nav-item`} {...restProps} >
            <NavDropdownContextProvider value={contextValue}>
                <Dropdown.Toggle navDropdown={true} {...toggleProps}>
                    {title}
                </Dropdown.Toggle>
                <NavDropdown.Menu {...menuProps}>
                    {children}
                </NavDropdown.Menu>
            </NavDropdownContextProvider>
        </div>
    )
})

NavDropdown.Toggle = Dropdown.Toggle//forwardRef(Toggle)
NavDropdown.Menu = Dropdown.Menu//forwardRef(Menu)
NavDropdown.Item = Dropdown.Item//forwardRef(Item)
NavDropdown.Divider = Dropdown.Divider//forwardRef(Divider)

export default NavDropdown