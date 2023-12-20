import React, { useEffect, useRef, useState, cloneElement } from "react";
import { createPortal } from "react-dom";

const setPosition = (referenceElement, overlayElement, position, arrowElement, isArrow=false) => {
    let body = document.body
    let refCurrent = referenceElement.current
    let overlayCurrent = overlayElement.current
    let elementComputedPositionStyle = getComputedStyle(refCurrent)["position"]

    let refTop = refCurrent.getBoundingClientRect().top - (elementComputedPositionStyle != "fixed" ?body.getBoundingClientRect().top:0)
    let refOffsetTop = refCurrent.offsetHeight
    let refLeft = refCurrent.getBoundingClientRect().left - (elementComputedPositionStyle != "fixed" ?body.getBoundingClientRect().left:0)
    let refOffsetLeft = refCurrent.offsetWidth

    let overlayHeight = overlayCurrent.clientHeight
    let overlayWidth = overlayCurrent.clientWidth

    const correctPosition = (position, offset, boundary) => {
        if(overlayCurrent.getBoundingClientRect()[position]<= boundary) {
            return offset
        }
        else {
            return tempPos[position]
        }
    }
    let arrowWidth = 0
    let arrowHeight = 0
    if(!isArrow) {
        arrowHeight = arrowElement.clientHeight - 1
        arrowWidth = arrowElement.clientWidth - 1
    }

    let tempPos
    switch(position) {
        case "top": 
            tempPos = { top: refTop - overlayHeight - arrowHeight, left: refLeft + refOffsetLeft/2 - overlayWidth/2 }
            tempPos.right = correctPosition("right", 12, 0)
            tempPos.left = correctPosition("left", 0, 0)
            return tempPos
        case "right":
            tempPos = { top: refTop + refOffsetTop/2 - overlayHeight/2, left: refLeft + refCurrent.offsetWidth + arrowWidth}
            //tempPos.bottom = correctPosition("bottom", window.scrollY + window.innerHeight, 0)
            //tempPos.top = correctPosition("top", window.scrollY, 48)
            return tempPos
        case "bottom":
            tempPos = { top: refTop + refOffsetTop  + arrowHeight, left: refLeft + refOffsetLeft/2 - overlayWidth/2 }
            tempPos.right = correctPosition("right", 12, 0)
            tempPos.left = correctPosition("left", 0, 0)
            return tempPos
        case "left":
            tempPos = { top: refTop + refOffsetTop/2 - overlayHeight/2, left: refLeft - overlayWidth - arrowWidth}
           // tempPos.bottom = correctPosition("bottom", window.scrollY + window.innerHeight, 0)
            //tempPos.top = correctPosition("top", window.scrollY, 48)
            return tempPos
        default:
            return { top: refTop - overlayHeight, left: refLeft + refOffsetLeft/2 - overlayWidth/2 }
    }
}

const updateAutoPosition = (autoPositionRef, positionRef, overlayRef, arrowRef) => {
    let topDistance = positionRef.current.getBoundingClientRect().top
    let bottomDistance = window.innerHeight - positionRef.current.getBoundingClientRect().bottom
    let leftDistance = positionRef.current.getBoundingClientRect().left
    let rightDistance = window.innerWidth - positionRef.current.getBoundingClientRect().right

    let totalOverlayWidth = overlayRef.current.clientWidth + arrowRef.current.clientWidth + 48
    let totalOverlayHeight = overlayRef.current.clientHeight + arrowRef.current.clientHeight + 48
    //console.log(autoPositionRef.current, positionRef.current, overlayRef.current, arrowRef.current)
    if(autoPositionRef.current === "top") {
        if(topDistance <= totalOverlayHeight) {

            if(rightDistance <= totalOverlayWidth) {
                return "left"
            }
            else if(leftDistance <= totalOverlayWidth) {
                return "right"
            }
            else {
                return "top"
            }
        }
    } else if(autoPositionRef.current === "bottom") {
        if(bottomDistance <= totalOverlayHeight) {
            if(rightDistance <= totalOverlayWidth) {
                return "left"
            }
            else if(leftDistance <= totalOverlayWidth) {
                return "right"
            }
            else {
                return "bottom"
            }
        }
    } else if(autoPositionRef.current === "left" || autoPositionRef.current === "right") {
        if(topDistance >= totalOverlayHeight) {
            return "top"
        } else if(topDistance < totalOverlayHeight/2) {
            return "bottom"
        } else if(bottomDistance < totalOverlayHeight/2) {
            return autoPositionRef.current === "left" ? "left":"right"
        }
    }
    return autoPositionRef.current
}

const OverlayTrigger = ({children, overlay, show, onToggle, position="auto", trigger="click", defaultShow=false}) => {
    const positionRef = useRef()
    const overlayRef = useRef()
    const arrowRef = useRef()
    const [arrowPosition, setArrowPosition] = useState("")
    const [overlayPosition, setOverlayPosition] = useState("")
    const [internalShow, setInternalShow] = useState(defaultShow)
    const internalShowRef = useRef(internalShow)
    const setInternalShowRef = (updatedValue) => {
        internalShowRef.current = updatedValue
        setInternalShow(updatedValue)
    }

    //const positionsList = ["top", "right", "bottom", "left"]
    const [autoPosition, setAutoPosition] = useState(position === "auto" ? "top" : position)
    const autoPositionRef = useRef(autoPosition)
    const setAutoPositionRef = (updatedValue) => {
        autoPositionRef.current = updatedValue
        setAutoPosition(updatedValue)
    }

    const [isHovering, setIsHovering] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [firstClick, setFirstClick] = useState(true)
    const triggerArray = Array.isArray(trigger) ? trigger : [trigger]

    const positionSetter = (positionRef, overlayRef, arrowRef) => {
        if(overlayRef.current) {
            if(true) {
                setOverlayPosition( setPosition(positionRef, overlayRef, autoPositionRef.current, arrowRef.current) )
                setArrowPosition( setPosition(positionRef, arrowRef, autoPositionRef.current, arrowRef.current, true) )
            }
        }
    }
    const handleScroll = () => {
        
        if(internalShowRef.current && position === "auto") {
            let updatedPosition = updateAutoPosition(autoPositionRef, positionRef, overlayRef, arrowRef)
            setAutoPositionRef(updatedPosition)
            let body = document.body
            //console.log(positionRef.current.offsetTop, overlayRef.current.offsetTop)
        }
    }
    const resizeHandler = () => {
        positionSetter(positionRef, overlayRef, arrowRef)
        if(!internalShowRef.current && position === "auto") {
            //setAutoPosition(detectAutoPostition(overlayRef, autoPositionRef))
        }
    }

    /* Event handler funtions */
    const onClick = (event) => {
        //console.log("click")
        if(isFocused && firstClick) {
            //this is needed in case both "focus" and "click" are triggers, otherwise there's weird behaviour
            setFirstClick(false) 
            return
        }
        setInternalShowRef(!internalShow)
        onToggle(!internalShow)
    }
    const onHover = (event) => {
        if(!isHovering) {
            setIsHovering(true)
            onToggle(true)
        }
    }
    const onFocus = (event) => {
        //console.log("focus")
        setInternalShowRef(true)
        setIsFocused(true)
        onToggle(true)
    }
    const onBlur = (event) => {
        //console.log("blur")
        if(isHovering) {
            setIsHovering(false)
        } else if(isFocused) {
            setIsFocused(false)
            setFirstClick(true)
        }
        setInternalShowRef(false)
        onToggle(false)
    }

    useEffect(() => {
        if(overlayRef.current && show) {
            positionSetter(positionRef, overlayRef, arrowRef)
            if(position === "auto") {
                let updatedPosition = updateAutoPosition(autoPositionRef, positionRef, overlayRef, arrowRef)
                setAutoPositionRef(updatedPosition)
            }
        }
        if(positionRef.current && overlayPosition === "") {
            let body = document.body
            let elementComputedPositionStyle = getComputedStyle(positionRef.current)["position"]
            //console.log(positionRef.current.getBoundingClientRect().top - body.getBoundingClientRect().top)
            setOverlayPosition({
                top: positionRef.current.getBoundingClientRect().top - (elementComputedPositionStyle != "fixed" ?body.getBoundingClientRect().top:0), 
                left: positionRef.current.getBoundingClientRect().left - (elementComputedPositionStyle != "fixed" ?body.getBoundingClientRect().left:0)
            })
            setArrowPosition({
                top: positionRef.current.getBoundingClientRect().top - (elementComputedPositionStyle != "fixed" ?body.getBoundingClientRect().top:0), 
                left: positionRef.current.getBoundingClientRect().left - (elementComputedPositionStyle != "fixed" ?body.getBoundingClientRect().left:0)
            })
        }
        setInternalShowRef(show)
    },[show, overlayRef, positionRef, autoPosition])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", resizeHandler)
        return function cleanup() {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", resizeHandler)
        }
    }, [])

    const checkRefPositionStyle = (positionRef) => {
        let elementComputedPositionStyle = getComputedStyle(positionRef.current)["position"]
        if(elementComputedPositionStyle === "fixed") {
            return "fixed"
        } else if(elementComputedPositionStyle === "sticky") {
            return "sticky"
        } else {
            return "absolute"
        }
    }
    return (
        <div style={{display:"static"}}>
            {cloneElement(children, {
                ref: positionRef,
                onClick: triggerArray.find(trigger => trigger === "click") ? onClick : null,
                onMouseOver: triggerArray.find(trigger => trigger === "hover") ? onHover : null,
                onMouseLeave: triggerArray.find(trigger => trigger === "hover") ? onBlur : null,
                onFocus: triggerArray.find(trigger => trigger === "focus") ? onFocus : null,
                onBlur: triggerArray.find(trigger => trigger === "focus") ? onBlur : null,
            })}
            {show ? createPortal(
                <>
                    {cloneElement(overlay, {
                        ref: overlayRef,
                        style: { maxWidth:"100%", maxHeight:"100%", position:checkRefPositionStyle(positionRef), top:overlayPosition.top, left:overlayPosition.left, zIndex:"1010", ...overlay.props.style,}
                    })}
                    <div
                        id="sg-overlay-arrow" ref={arrowRef}
                        className={`sg-overlay-arrow${autoPosition ? " overlay-position-"+autoPosition : ""}`} 
                        style={{position:checkRefPositionStyle(positionRef), top:arrowPosition.top, left:arrowPosition.left,}}>
                    </div>
                    
                </>
            , document.body) : null}
        </div>
    )
}

export default OverlayTrigger