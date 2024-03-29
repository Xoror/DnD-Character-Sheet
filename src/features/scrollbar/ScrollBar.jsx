import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { debounce } from "lodash"

import "./ScrollBar.css";
import { useLocation } from "react-router-dom";

const SCROLL_BOX_MIN_HEIGHT = 20    

export const ScrollBar = ({children, className, ...restProps}) => {
    const location = useLocation()

    const [hovering, setHovering] = useState(false)
    const [scrollBoxHeight, setScrollBoxHeight] = useState(SCROLL_BOX_MIN_HEIGHT)
    const [scrollBoxTop, setScrollBoxTop] = useState(0)
    const [lastScrollThumbPosition, setLastScrollThumbPosition] = useState(0)
    const [isDragging, setDragging] = useState(false)

    function getBodyPadding() {
        let bodyPadding = window.getComputedStyle(document.body).padding
        let bodyPaddingArray = bodyPadding.split(" ")
        bodyPaddingArray = bodyPaddingArray.map(padding => {
            return parseFloat(padding.replace("px",""))
        })
        return bodyPaddingArray
        //return Number(getComputedStyle(document.body, "").fontSize.match(/(\d+)px/)[1]);
    }
    const handleDocumentMouseUp = useCallback(event => {
        if(isDragging) {
            event.preventDefault()
            setDragging(false)
        }
    }, [isDragging])
    const handleDocumentMouseMove = useCallback(event => {
        if(isDragging) {
            event.preventDefault()
            event.stopPropagation()
            const scrollHostElement = scrollHostRef.current
            const { scrollHeight } = scrollHostElement
            const clientHeight = window.innerHeight - getBodyPadding()[0]
            let deltaY = event.clientY - lastScrollThumbPosition
            let percentage = deltaY*(scrollHeight/clientHeight)
            setLastScrollThumbPosition(event.clientY)
            window.scrollBy({left: 0, top: percentage, behavior: "instant"})// Math.min(window.scrollY+percentage, scrollHeight - clientHeight))
        }
    }, [isDragging, lastScrollThumbPosition])
    const handleScrollThumbMouseDown = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        setLastScrollThumbPosition(event.clientY)
        setDragging(true)
    }, [])

    const handleMouseOver = useCallback(() => {
        setHovering(true)
    }, [])
    const handleMouseOut = useCallback(() => {
        setHovering(false)
    }, [])
    const handleScrollClick = useCallback((event) => {
        event.preventDefault()
        event.stopPropagation()
        let pointerY = event.clientY
        let scrolling = window.innerHeight - getBodyPadding()[0]
        if(pointerY < scrollBoxTop) {
            window.scrollBy({top: -scrolling, left: 0, behavior: "smooth"})
        }
        else if(pointerY > scrollBoxTop + scrollBoxHeight) {
            window.scrollBy({top: scrolling, left: 0, behavior: "smooth"})
        }
    }, [scrollBoxTop, scrollBoxHeight])
    const handleScroll = useCallback(() => {
        if(!scrollHostRef) {
            return
        }
        const scrollHostElement = scrollHostRef.current
        const { scrollHeight } = scrollHostElement
        const clientHeight = window.innerHeight - getBodyPadding()[0]
        const scrollTop = window.scrollY
        if(scrollBoxTop === 0) {
            const scrollBoxPercentage = clientHeight/scrollHeight
            const scrollbarHeight = Math.max((clientHeight)*scrollBoxPercentage, SCROLL_BOX_MIN_HEIGHT)
            setScrollBoxHeight(scrollbarHeight)
        }

        let newTop = (parseInt(scrollTop, 10) )*(clientHeight/scrollHeight) // / parseInt(scrollHeight, 10))*clientHeight
        
        newTop = Math.min(newTop, scrollHeight - scrollBoxHeight)
        if (newTop > scrollHeight - scrollBoxHeight) {
            newTop = scrollHeight - scrollBoxHeight
        }
        setScrollBoxTop(newTop)
    }, [scrollBoxTop, scrollBoxHeight])

    const debouncedHandleScroll = useMemo(
		() => debounce(handleScroll, 1)
	, [handleScroll])

    useEffect(() => {
        console.log(getBodyPadding()[0])
        const scrollHostElement = scrollHostRef.current
        const clientHeight = window.innerHeight - getBodyPadding()[0]
        const { scrollHeight } = scrollHostElement
        const scrollBoxPercentage = clientHeight/scrollHeight
        const scrollbarHeight = Math.max((clientHeight)*scrollBoxPercentage, SCROLL_BOX_MIN_HEIGHT)
        setScrollBoxHeight(scrollbarHeight)
    }, [setScrollBoxHeight, location])

    useEffect(() => {
        const scrollHostElement = scrollHostRef.current
        const clientHeight = window.innerHeight - getBodyPadding()[0]
        const { scrollHeight } = scrollHostElement
        const scrollBoxPercentage = clientHeight/scrollHeight
        const scrollbarHeight = Math.max((clientHeight)*scrollBoxPercentage, SCROLL_BOX_MIN_HEIGHT)
        setScrollBoxHeight(scrollbarHeight)
        
        window.addEventListener("scroll", debouncedHandleScroll, true)
        window.addEventListener("resize", debouncedHandleScroll, true)
        return function cleanup() {
            window.removeEventListener("scroll", debouncedHandleScroll, true)
            window.removeEventListener("resize", debouncedHandleScroll, true)
        }
    }, [debouncedHandleScroll])

    useEffect(() => {
        //this is handle the dragging on scroll-thumb
        document.addEventListener("mousemove", handleDocumentMouseMove);
        document.addEventListener("mouseup", handleDocumentMouseUp);
        document.addEventListener("mouseleave", handleDocumentMouseUp);
        return function cleanup() {
          document.removeEventListener("mousemove", handleDocumentMouseMove);
          document.removeEventListener("mouseup", handleDocumentMouseUp);
          document.removeEventListener("mouseleave", handleDocumentMouseUp);
        };
      }, [handleDocumentMouseMove, handleDocumentMouseUp]);
    const scrollHostRef = useRef()
    return(
        <div id="scrollhost-container" className={"scrollhost-container"}>
            <div ref={scrollHostRef} className={`scrollhost ${className}`} {...restProps}>
                {children}
                <div
                    onClick={handleScrollClick} 
                    onMouseOver={handleMouseOver} 
                    onMouseOut={handleMouseOut} 
                    className={"scroll-bar"} 
                    style={{backgroundColor: "#1a1e21", opacity: hovering ? 1 : 0.5, height: (window.innerHeight - getBodyPadding()[0]),
                            zIndex: "99", position: "fixed", top:"3em"
                        }}
                >
                    <div className={"scroll-thumb"} style={{height: scrollBoxHeight, top: scrollBoxTop}} onMouseDown={handleScrollThumbMouseDown}>

                    </div>
                </div>
            </div>
        </div>
    )
}