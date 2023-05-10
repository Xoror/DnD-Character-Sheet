import React, { useState, useCallback, useRef, useEffect } from "react";
import "./ScrollBar.css";

const SCROLL_BOX_MIN_HEIGHT = 20    

export const ScrollBar = ({children, className, ...restProps}) => {
    const [hovering, setHovering] = useState(false)
    const [scrollBoxHeight, setScrollBoxHeight] = useState(SCROLL_BOX_MIN_HEIGHT)
    const [scrollBoxTop, setScrollBoxTop] = useState(0)

    const handleMouseOver = useCallback(() => {
        setHovering(true)
    }, [])
    const handleMouseOut = useCallback(() => {
        setHovering(false)
    }, [])
    const handleScroll = useCallback(() => {
        if(!scrollHostRef) {
            return
        }
        const scrollHostElement = scrollHostRef.current
        const { scrollHeight } = scrollHostElement
        const clientHeight = window.innerHeight
        const scrollTop = window.scrollY
        if(scrollBoxTop === 0) {
            const scrollBoxPercentage = clientHeight/scrollHeight
            const scrollbarHeight = Math.max((clientHeight)*scrollBoxPercentage, SCROLL_BOX_MIN_HEIGHT)
            setScrollBoxHeight(scrollbarHeight)
        }

        let newTop = (parseInt(scrollTop, 10) )*(scrollHeight/clientHeight) // / parseInt(scrollHeight, 10))*clientHeight
        
        //console.log(scrollBoxTop, newTop, scrollBoxHeight, scrollTop, scrollHeight, clientHeight)
        //console.log(clientHeight - scrollBoxHeight)
        newTop = Math.min(newTop, scrollHeight - scrollBoxHeight)
        if (newTop > scrollHeight - scrollBoxHeight) {
            newTop = scrollHeight - scrollBoxHeight
        }
        setScrollBoxTop(newTop)
    }, [scrollBoxTop, scrollBoxHeight])
    useEffect(() => {
        const scrollHostElement = scrollHostRef.current
        const clientHeight = window.innerHeight
        const { scrollHeight } = scrollHostElement
        const scrollBoxPercentage = clientHeight/scrollHeight
        const scrollbarHeight = Math.max((clientHeight)*scrollBoxPercentage, SCROLL_BOX_MIN_HEIGHT)
        setScrollBoxHeight(scrollbarHeight)
        
        window.addEventListener("scroll", handleScroll, true)
        window.addEventListener("resize", handleScroll, true)
        return function cleanup() {
            window.removeEventListener("scroll", handleScroll, true)
            window.removeEventListener("resize", handleScroll, true)
        }
    }, [handleScroll])
    const scrollHostRef = useRef()
    return(
        <div className={"scrollhost-container"}>
            <div ref={scrollHostRef} className={`scrollhost ${className}`} {...restProps}>
                {children}
                <div 
                    onMouseOver={handleMouseOver} 
                    onMouseOut={handleMouseOut} 
                    className={"scroll-bar"} 
                    style={{backgroundColor: "#1a1e21", opacity: hovering ? 1 : 0.5}}
                >
                    <div className={"scroll-thumb"} style={{height: scrollBoxHeight, top: scrollBoxTop}}>

                    </div>
                </div>
            </div>
        </div>
    )
}