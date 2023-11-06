import { useEffect, useState } from "react";
import "./FancyNav.scss"

import { MdHome, MdFirstPage, MdLastPage, MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

export const FancyNav = (props) => {
    const [ activeElement, setActiveElement ] = useState()

    useEffect(() => {
        setActiveElement(document.getElementById("default-fancy-list-item"))
    }, [])

    const handleOnClick = (event) => {
        let element = event.target

        

        let condition = true
        while(condition) {
            if(element.tagName != "LI") {
                element = element.parentElement
            }
            else {
                condition = false
            }
        }

        if(element.classList[0] === "active") {
            return
        }
        element.classList.add("active")
        activeElement.classList.remove("active")
        console.log(activeElement)

        setActiveElement(element)
    }
    return (
        <div className="fancy-nav-container">
            <ul className="fancy-nav">
                <li id="default-fancy-list-item" className="active">
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