import React, { createContext, useContext, useEffect, useMemo, useState, forwardRef } from "react"
import { createPortal } from "react-dom"

import CloseButton from "./CloseButton"
import Button from "./CustomButton"

import maintainDisabled from "ally.js/src/maintain/disabled"
import maintainTabFocus from "ally.js/src/maintain/tab-focus"
import maintainHidden from "ally.js/src/maintain/hidden"
import whenKey from "ally.js/src/when/key"
import queryFirstTabbable from "ally.js/src/query/first-tabbable"

const ModalContext = createContext(false)

const Modal = forwardRef(({
        children, 
        size = "md", 
        show, 
        backdrop = "No", 
        onHide,
        backdropClassName = "",
        dialogClassName = "",
        contentClassName= "",
        id,
        ...restProps 
    }, ref) => {
    const [showModal, setShowModal] = useState(false)
    const [disabledHandle, setDisabledHandle] = useState(undefined)
    const [tabFocusHandle, setTabFocusHandle] = useState(undefined)
    const [keyHandle, setKeyHandle] = useState(undefined)
    const [focusedElementBeforeDialog, setFocusedElementBeforeDialog] = useState(undefined)
    const [hiddenHandle, setHiddenHandle] = useState(undefined)

    const typeCheck = typeof(show) === "boolean" && typeof(onHide) === "function" ? undefined : {show: typeof(show) === "boolean", onHide: typeof(onHide) === "function"}
    if(typeCheck) {
        console.error(
            !typeCheck.show ? "The variable 'show' must be used and must be a boolean used to decide when to show the modal!" : null,
            !typeCheck.onHide ? "The variable 'onHide' must be used and must be a function which is used to set 'show' as the modal gets closed!" : null
        )
    }

    const onHideMemo = useMemo(() => {
        return {onHide: onHide}
    })

    useEffect(() => {
        let bodyTest = document.body
        if(show && !showModal) {
            openModal(bodyTest)
        } else if (!show && showModal) {
            closeDialog(bodyTest)
        }
    }, [show])
    const openModal = (bodyTest) => {
        bodyTest.classList.add("sg-modal-open")
        setShowModal(show)
    }
    const closeDialog = () => {
        let backdrop = document.getElementById("sg-modal-backdrop")
        backdrop.classList.add("fadeOut")
        let modal = document.getElementById("sg-modal")
        modal.classList.add("fadeOut")
        if(onHide != "none") {
            onHide()
        }
    }

    //disable all elements that aren't in the modal
    useEffect(() => {
        let modalDialog = document.getElementById("sg-modal")
        const keyPress = () => {
            closeDialog(document.body)
        }

        if(modalDialog != null && showModal) {
            setDisabledHandle(maintainDisabled({
                filter: modalDialog,
            }))
            setTabFocusHandle(maintainTabFocus({
                context: modalDialog
            }))
            setKeyHandle(whenKey({
                escape: keyPress,
            }))
            let firstFocus = queryFirstTabbable({
                context: modalDialog,
                defaultToContext: true,
            })
            setFocusedElementBeforeDialog(document.activeElement)
            firstFocus.focus()
            setHiddenHandle(maintainHidden({
                filter: modalDialog,
              }))
        }

        if(disabledHandle && !showModal) {
            disabledHandle.disengage()
            tabFocusHandle.disengage()
            keyHandle.disengage()
            focusedElementBeforeDialog.focus()
            hiddenHandle.disengage()
        }
    }, [showModal])

    const showTest = useRef(show)
    useEffect(() => {
        if(showTest.current != show) {
            showTest.current = show
        }
    }, [show])
    useEffect(() => {
        document.addEventListener("animationend", (event) => {
            if(event.animationName === "fadeOut") {
                if(!showTest.current) {
                    setShowModal(false)
                    document.body.classList.remove("sg-modal-open")
                }
            }
        })
        document.addEventListener("click", (event) => {
            if(event.target.id === "sg-modal") {
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
            let dialog = document.getElementById("sg-modal")
            dialog.classList.add("sg-modal-static")
            setTimeout(() => {
                dialog.classList.remove("sg-modal-static");
              }, "200");
            return
        }
        let bodyTest = document.body
        closeDialog(bodyTest)
    }
    
    return (
        showModal ? 
         createPortal(
            <>
                <div id="sg-modal-backdrop" className={`fadeIn sg-modal-backdrop${backdropClassName === "" ? "": " " + backdropClassName}`}></div>
                <div id="sg-modal" className={`fadeIn sg-modal`} tabIndex="-1">
                    <div role="dialog" className={`sg-modal-dialog modal-${size}${dialogClassName === "" ? "": " " + dialogClassName}`} {...restProps} >
                        <div ref={ref} className={`sg-modal-content${contentClassName === "" ? "": " " + contentClassName}`}>
                            <ModalContext.Provider value={onHideMemo}>
                                {!typeCheck ?
                                    children :
                                    <>
                                        <Modal.Header closeButton>
                                            <Modal.Title>
                                                An Error ocurred!
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p>
                                                {!typeCheck.show ? "The variable 'show' must be used and must be a boolean used to decide when to show the modal!" : null}
                                                {!typeCheck.onHide ? "The variable 'onHide' must be used and must be a function which is used to set 'show' as the modal gets closed!" : null}
                                            </p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="danger" type="button" onClick={closeDialog}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </>
                                }
                            </ModalContext.Provider>
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
    const onHide = useContext(ModalContext).onHide
    const onCloseButtonClick = (event) => {
        if(onClick != "none") {
            onClick(event)
        }
        if(onHide != "none") {
            onHide(event)
        }
    }

    return (
        <Component ref={ref} className={`sg-modal-header ${className}`} {...restProps}>
            {children}
            {closeButton ? <CloseButton variant onClick={onCloseButtonClick}/> : null}
        </Component>
    )
})
Modal.Header = Header;

const Body = ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-modal-body ${className}`} {...restProps}>
            {children}
        </div>
    )
}
Modal.Body = forwardRef(Body);

const Footer = ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-modal-footer ${className}`} {...restProps}>
            {children}
        </div>
    )
}
Modal.Footer = forwardRef(Footer);

const Title = ({children, className, ...restProps}, ref) => {
    return (
        <h4 ref={ref} className={`sg-modal-title ${className}`} {...restProps}>
            {children}
        </h4>
    )
}
Modal.Title = forwardRef(Title);

export default Modal