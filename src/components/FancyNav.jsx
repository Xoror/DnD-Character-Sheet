import { useEffect, useState } from "react";
import "./FancyNav.scss"

import { MdHome, MdFirstPage, MdLastPage, MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { createPortal } from "react-dom";

export const FancyNav = (props) => {
    const [ activeElement, setActiveElement ] = useState()

    useEffect(() => {
        setActiveElement(document.getElementById("fancy-home"))
    }, [])

    const handleOnClick = (event) => {
        let element = event.target
        if(element.id === "") {
            let condition = true
            while(condition) {
                element = element.parentElement
                console.log(element.id)
                if(element.id != "") {
                    condition = false
                }
            }
        }
        else {
            element = document.getElementById(event.target.id)
        }
        console.log(element)
        element.parentElement.classList.add("active")
        activeElement.parentElement.classList.remove("active")
        console.log(activeElement.parentElement)

        setActiveElement(element)
    }
    return (
        <div className="fancy-nav-container">
            <ul className="fancy-nav">
                <li className="active">
                    <a href="#" id="fancy-home" onClick={handleOnClick}>
                        <label>Home</label>
                        <span className="icon"><MdHome size="2em" /></span>
                    </a>
                </li>
                <li>
                    <a href="#" id="fancy-first" onClick={handleOnClick}>
                        <label>First</label>
                        <span className="icon"><MdFirstPage size="2em" /></span>
                    </a>
                </li>
                <li>
                    <a href="#" id="fancy-before" onClick={handleOnClick}>
                        <label>Before</label>
                        <span className="icon"><MdOutlineNavigateBefore size="2em" /></span>
                    </a>
                </li>
                <li>
                    <a href="#" id="fancy-next" onClick={handleOnClick}>
                        <label>Next</label>
                        <span className="icon"><MdOutlineNavigateNext size="2em" /></span>
                    </a>
                </li>
                <li>
                    <a href="#" id="fancy-last" onClick={handleOnClick}>
                        <label>Last</label>
                        <span className="icon"><MdLastPage size="2em" /></span>
                    </a>
                </li>
                <div className="indicator"></div>
            </ul>
        </div>
    )
}