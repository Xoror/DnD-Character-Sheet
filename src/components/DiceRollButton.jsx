import React, { useEffect, useMemo, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import "./DiceRollButton.scss"

import Button from '../BootstrapReplace/CustomButton';
import Dropdown from "../BootstrapReplace/Dropdown";


/*
    the items ABSOLUTELY DO NEED A UNIQUE KEY
    Required inputs
        - controlID: technically works without but better if do
        - options
        - singleValue
        - noOptions
        - bonus
        - passData
        - name

        - dropdownStyle
        - rollButtonStyle
        - toggleButtonStyle
        - menuStyle
*/

export const DiceRollButton = (props) => {

    let spellBonus = props.spellBonus === undefined ? 0 : (props.spellBonus === "" ? 0 : props.spellBonus)
    let singleValue = props.singleValue === undefined ? 0 : props.singleValue
    let noOptions = props.noOptions === undefined ? (props.options === undefined ? true : (props.options.length === 1)) : props.noOptions
    let bonus = props.bonus === undefined ? 0 : (props.bonus === "" ? 0 : parseInt(props.bonus))
    let testNoDice = props.singleValue === undefined ? null : (props.singleValue.toString()).includes("d")
    let hasDice = testNoDice != null && testNoDice != undefined ? testNoDice : false

    const options = useMemo(() => {
        if(props.options != undefined) {
            if(props.options[0].value.includes(" + MOD")) {
                let options1 = []
                props.options.forEach((option, index) => {
                    options1.push({label: option.label, value: option.value.replace(" + MOD", " + " + spellBonus.toString())})
                })
                return options1
            }
            else if(props.options.length === 1 ) {
                if(!props.options[0].value.includes("d")) {
                    singleValue = props.options[0].value
                }
                else {
                    singleValue = props.options[0].value
                    hasDice = true
                }
                return props.options
            }
            else {
                return props.options
            }
        }
        else {
            return props.options
        }
    }
    , [props.options, props.spellBonus])
    const [defaultValue, setDefaultValue] = useState(props.options === undefined ? singleValue : options[0].value)


    const checkValueType = (splitValue) => {
        if( splitValue === "MOD") {
            return ["Spellcasting Modifier", "modifier"]
        }
        else {
            let test = splitValue.includes("d")
            if(test) {
                let split = splitValue.split("d")
                return [split, "dice"]
            }
            else {
                return [splitValue, "value"]
            }
        }
    }
    const rollFunction = (value, type, rolls, result) => {
        let resultVariable = result
        let rollsVariable = rolls
        if (type === "dice") {
            let splitValue = value
            for(let i=0; i<parseInt(splitValue[0]);i++) {
                rollsVariable.push(1 + Math.floor(Math.random() * parseInt(splitValue[1])))
                resultVariable += rollsVariable[i]
            }
            return [rollsVariable, resultVariable]
        }
        else if (type === "value") {
            rollsVariable.push(parseInt(value))
            resultVariable += parseInt(value)
            return [rollsVariable, resultVariable]
        }
        if(type === "modifier") {
            resultVariable += " + Spellcasting Modifier"
            return [rollsVariable, resultVariable]
        }
        else {
            console.log("Error: unknown type in rollFunction!")
        }
    }
    const handleRollClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let rolls = []
        let result = 0 + bonus
        console.log(defaultValue)
        let [splitMain, splitExtra] = defaultValue.split("+")
        let [splitMainValue, splitMainType] = checkValueType(splitMain)
        let mainRoll = rollFunction(splitMainValue, splitMainType, rolls, result)
        rolls = mainRoll[0]
        result = mainRoll[1]
        if(splitExtra) {
            let [splitExtraValue, splitExtraType] = checkValueType(splitExtra)
            let extraRoll = rollFunction(splitExtraValue, splitExtraType, rolls, result)
            rolls = extraRoll[0]
            result = extraRoll[1]
        }
        props.passData(event, props.name, defaultValue, rolls, bonus, result)
    }
    const [showMenu, setShowMenu] = useState(false)
    const handleToggle = (event) => {
        event.stopPropagation()
        setShowMenu(!showMenu)
    }

    const handleMenuItemClick = (event) => {
        event.stopPropagation()
        console.log(event.target.value)
        setDefaultValue(event.target.value)
        //defaultValue = event.target.value
    }
    const controlIdComputed = props.controlID ? props.controlID+"-dice-roll-button" : nanoid()+"-dice-roll-dropdown"
    return (
        <>
            { !noOptions ?
                <Dropdown controlID={controlIdComputed} show={showMenu} onToggle={handleToggle} style={props.dropdownStyle} className ="dice-dropdown">
                    <Button variant="primary" className="dice-button-button" style={props.rollButtonStyle} onClick={handleRollClick}>
                        <span className="visually-hidden">Roll </span>{defaultValue} {props.bonus != "" && props.bonus != undefined ? "+ " + props.bonus.toString() : ""}
                    </Button>
                    <Dropdown.Toggle variant="primary" className="dice-button-menu-toggle" style={props.toggleButtonStyle}>
                        <span className="visually-hidden">Toggle dice options</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark" style={props.menuStyle}>
                        {options.map((option, index) => 
                            <Dropdown.Item style={props.itemStyle} key={`dice-option-value-${option.value}`} id={`dice-option-value-${option.value}`} as="button" value={option.value} onClick={handleMenuItemClick}>{option.label}: {option.value}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown> :
                (hasDice ? 
                    <div style={props.dropdownStyle} className ="dice-button-solo">
                        <Button variant="primary" className="dice-button-button-solo" style={props.rollButtonStyle} onClick={handleRollClick}>
                            <span className="visually-hidden">Roll </span>{singleValue} {props.bonus != "" && props.bonus != undefined ? "+ " + props.bonus.toString() : ""}
                        </Button>
                    </div> :
                    <div style={props.noDiceValueStyle} className ="no-dice-value">
                        <span>{singleValue} {props.bonus != "" && props.bonus != undefined ? " + " + props.bonus.toString() : " "} </span>
                    </div>
                )
            }
        </>
    )
}