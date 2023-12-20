import React, { useState } from "react";

import "./FloatingLog.scss"

import { GoLog } from "react-icons/go";


import Button from '../BootstrapReplace/CustomButton';
import OverlayTrigger from '../BootstrapReplace/OverlayTrigger.jsx';

export const FloatingLog = (props) => {
    const [show, setShow] = useState(false)
    let buttonName = props.buttonName === undefined ? "Log" : props.buttonName
    
    return (
        <OverlayTrigger show={show} trigger="click" position="top" overlay={props.popover} onToggle={event => setShow(event)}>
            <Button className="dice-log-button">
                 {buttonName} <GoLog aria-label="dicelog icon" className="log-icon"/>
            </Button>
        </OverlayTrigger>
    )
}