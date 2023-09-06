import React, { useState } from "react";
import { useSelector } from "react-redux";

import Popover from 'react-bootstrap/Popover';

import { FloatingLog } from "../../components/FloatingLog";

export const DiceLog = (props) => {
    const diceLog = useSelector(state => state.settings.diceLog)
    const [showMenu, setShowMenu] = useState(false)
    let disabled = diceLog.length === 0
    const diceLogPopover = (
        <Popover id="dice-log-popover" className="popover-container">
            <Popover.Header id="dice-log-header" as="h3" className="popover-header">Dice Log</Popover.Header>
            <Popover.Body id="dice-log-body" className="popover-body">
                {diceLog.map((log, index) => (
                    <div key={`dice-log-entry-${index}`}>
                        <label>{`${index}.`} {log.name} ({log.dice})</label>
                        <p>{"Result: "}
                            {log.rolls.map((roll, index) => (
                                roll + " + "
                            ))}
                            {log.bonus} = {log.result}
                        </p>
                    </div>
                ))}
            </Popover.Body>
        </Popover>
    )
    const handleBlur = (event) => {
        let popoverEl = document.getElementById("dice-log-popover")
        let popoverHeaderEl = document.getElementById("dice-log-header")
        let popoverBodyEl = document.getElementById("dice-log-body")
        let targetEl = event.target // clicked element
        
        if(targetEl.id == popoverHeaderEl.id || targetEl.id == popoverBodyEl.id) {
        // This is a click inside, does nothing, just return.
            console.log("click inside")
            return
        }
        else {
        // This is a click outside.
            if(targetEl.parentNode.id == popoverEl.id) {
                return
            }
            else {
                console.log("click outside")
                setShowMenu(false)
            }
        }        
    }
    return (
        <FloatingLog disabled={disabled} buttonName={"Dice Log"} popover={diceLogPopover} />
    )
}