import React from "react";

import "./FloatingLog.scss"

import { GoLog } from "react-icons/go";


//import Button from 'react-bootstrap/Button'
import Button from '../BootstrapReplace/CustomButton';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export const FloatingLog = (props) => {
    let buttonName = props.buttonName === undefined ? "Log" : props.buttonName
    let disabled = props.disabled === undefined ? false : props.disabled

    return (
        <OverlayTrigger trigger="click" placement="top-start" overlay={props.popover}>
            <Button aria-disabled={disabled} disabled={disabled} className="dice-log-button">
                 {buttonName} <GoLog aria-label="dicelog icon" className="log-icon"/>
            </Button>
        </OverlayTrigger>
    )
}