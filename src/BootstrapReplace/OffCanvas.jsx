import React, { createContext, useContext, useEffect, useMemo, useState, forwardRef } from "react"
import { createPortal } from "react-dom"

import CloseButton from "./CloseButton"
import Button from "./CustomButton"

import maintainDisabled from "ally.js/src/maintain/disabled"
import maintainTabFocus from "ally.js/src/maintain/tab-focus"
import maintainHidden from "ally.js/src/maintain/hidden"
import whenKey from "ally.js/src/when/key"
import queryFirstTabbable from "ally.js/src/query/first-tabbable"

const OffcanvasContext = createContext(false)

const Offcanvas = forwardRef(({
        children, 
        size, 
        show, 
        backdrop = "static", 
        onHide = "none",
        backdropClassName = "",
        dialogClassName = "",
        contentClassName= "",
        placement="start",
        id,
        ...restProps 
    }, ref) => {
    const [showOffcanvas, setShowOffcanvas] = useState(false)
    const [disabledHandle, setDisabledHandle] = useState(undefined)
    const [tabFocusHandle, setTabFocusHandle] = useState(undefined)
    const [keyHandle, setKeyHandle] = useState(undefined)
    const [focusedElementBeforeDialog, setFocusedElementBeforeDialog] = useState(undefined)
    const [hiddenHandle, setHiddenHandle] = useState(undefined)
    const [closeButtonClicked, setCloseButtonClicked] = useState(false)

    const typeCheck = typeof(show) === "boolean" && typeof(onHide) === "function" ? undefined : {show: typeof(show) === "boolean", onHide: typeof(onHide) === "function"}
    if(typeCheck) {
        console.error(
            !typeCheck.show ? "The variable 'show' must be used and must be a boolean used to decide when to show the offCanvas!" : null,
            !typeCheck.onHide ? "The variable 'onHide' must be used and must be a function which is used to set 'show' as the offCanvas gets closed!" : null
        )
    }

    useEffect(() => {
        let bodyTest = document.body
        if(show && !showOffcanvas) {
            console.log("if 1")
            openOffcanvas(bodyTest)
        } else if (!show && showOffcanvas) {
            console.log("if 2")
            closeDialog()
        } else if (show && showOffcanvas) {
            console.log("if 3")
            document.getElementsByClassName("sg-offCanvas-content")[0].classList.add("sg-slide-in")
        }
    }, [show, showOffcanvas])
    const openOffcanvas = (bodyTest) => {
        bodyTest.classList.add("sg-offCanvas-open")
        setShowOffcanvas(show)
    }
    const closeDialog = () => {
        let backdrop = document.getElementById("sg-offCanvas-backdrop")
        backdrop.classList.add("fadeOut")
        let offCanvas = document.getElementById("sg-offCanvas")
        offCanvas.classList.add("fadeOut")
        document.getElementsByClassName("sg-offCanvas-content")[0].classList.remove("sg-slide-in")
        if(!closeButtonClicked && onHide != "none") {
            onHide()
        } else {setCloseButtonClicked(false)}
    }

    //disable all elements that aren't in the offCanvas
    useEffect(() => {
        let offCanvasDialog = document.getElementById("sg-offCanvas")
        const keyPress = () => {
            closeDialog()
        }

        if(offCanvasDialog != null && showOffcanvas) {
            setDisabledHandle(maintainDisabled({
                filter: offCanvasDialog,
            }))
            setTabFocusHandle(maintainTabFocus({
                context: offCanvasDialog
            }))
            setKeyHandle(whenKey({
                escape: keyPress,
            }))
            let firstFocus = queryFirstTabbable({
                context: offCanvasDialog,
                defaultToContext: true,
            })
            setFocusedElementBeforeDialog(document.activeElement)
            firstFocus.focus()
            setHiddenHandle(maintainHidden({
                filter: offCanvasDialog,
              }))
        }

        if(disabledHandle && !showOffcanvas) {
            disabledHandle.disengage()
            tabFocusHandle.disengage()
            keyHandle.disengage()
            focusedElementBeforeDialog.focus()
            hiddenHandle.disengage()
        }
    }, [showOffcanvas])

    useEffect(() => {
        document.addEventListener("animationend", (event) => {
            if(event.animationName === "fadeOut") {
                if(!show) {
                    setShowOffcanvas(false)
                    document.body.classList.remove("sg-offCanvas-open")
                }
            }
        })
        document.addEventListener("click", (event) => {
            if(event.target.id === "sg-offCanvas") {
                onMouseClick(event)
            }
        })
        return function cleanup() {
            document.removeEventListener("animationend", (event) => {
                console.log(event);
            })
            document.removeEventListener("click", onMouseClick)
        }
    }, [])
    const onMouseClick = (event) => {
        if( (backdrop === "static" || backdrop === true) && backdrop != null) {
            let dialog = document.getElementsByClassName("sg-offCanvas-content")[0]
            dialog.classList.add("sg-offCanvas-static")
            setTimeout(() => {
                dialog.classList.remove("sg-offCanvas-static");
              }, "200");
            return
        }
        let bodyTest = document.body
        
        closeDialog()
    }
    const computePlacement = (placement) => {
        switch (placement) {
            case "start":
                return "sg-offcanvas-start"
            case "end":
                return "sg-offcanvas-end"
            case "top":
                return "sg-offcanvas-top"
            case "bottom":
                return "sg-offcanvas-bottom"
        }
    }
    
    const onHideMemo = useMemo(() => {
        return {
            onHide: closeDialog,
            setCloseButtonClicked: setCloseButtonClicked
        }
    })
    return (
        showOffcanvas ? 
         createPortal(
            <>
                <div id="sg-offCanvas-backdrop" className={`fadeIn sg-offCanvas-backdrop${backdropClassName === "" ? "": " " + backdropClassName}`}></div>
                <div id="sg-offCanvas" className={`fadeIn sg-offCanvas`} tabIndex="-1">
                    <div role="dialog" className={`sg-offCanvas-dialog${dialogClassName === "" ? "": " " + dialogClassName}`} {...restProps} >
                        <div ref={ref} className={`sg-offCanvas-content${contentClassName === "" ? "": " " + contentClassName} ${computePlacement(placement)}`}>
                            <OffcanvasContext.Provider value={onHideMemo}>
                                {!typeCheck ?
                                    children :
                                    <>
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title>
                                                An Error ocurred!
                                            </Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>
                                            <p>
                                                {!typeCheck.show ? "The variable 'show' must be used and must be a boolean used to decide when to show the offCanvas!" : null}
                                                {!typeCheck.onHide ? "The variable 'onHide' must be used and must be a function which is used to set 'show' as the offCanvas gets closed!" : null}
                                            </p>
                                        </Offcanvas.Body>
                                        <Offcanvas.Footer>
                                            <Button variant="danger" type="button" onClick={closeDialog}>
                                                Close
                                            </Button>
                                        </Offcanvas.Footer>
                                    </>
                                }
                            </OffcanvasContext.Provider>
                        </div>
                    </div>
                </div>
            </>
            , document.body)
        : null
    )
})


const Header = forwardRef(({as, className = "", children, closeButton = false, onClick = "none", ...restProps}, ref) => {
    let validAs = ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "div"
    const { onHide, setCloseButtonClicked} = useContext(OffcanvasContext)
    const onCloseButtonClick = (event) => {
        if(onClick != "none") {
            onClick(event)
            setCloseButtonClicked(true)
            return
        }
        onHide(event)
    }

    return (
        <Component ref={ref} className={`sg-offCanvas-header ${className}`} {...restProps}>
            {children}
            {closeButton ? <CloseButton variant onClick={onCloseButtonClick}/> : null}
        </Component>
    )
})
Offcanvas.Header = Header;

const Body = ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-offCanvas-body ${className}`} {...restProps}>
            {children}
        </div>
    )
}
Offcanvas.Body = forwardRef(Body);
/*
const Footer = ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-offCanvas-footer ${className}`} {...restProps}>
            {children}
        </div>
    )
}
Offcanvas.Footer = forwardRef(Footer);
*/
const Title = ({children, className, ...restProps}, ref) => {
    return (
        <h4 ref={ref} className={`sg-offCanvas-title ${className}`} {...restProps}>
            {children}
        </h4>
    )
}
Offcanvas.Title = forwardRef(Title);

export default Offcanvas