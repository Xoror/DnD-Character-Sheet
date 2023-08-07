import React, { useState } from "react";
import "./MoneyPouch.css"

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';

export const MoneyPouch = (props) => {
    const [show, setShow] = useState(6)
    const [tempValue, setTempValue] = useState(0)

    const currencies = Object.keys(props.moneyPouch)
    const currencies_shortnames = props.currencies_shortnames

    const styleFunction = (index, currencies) => {
        if(index === 0) {
            return "middle"
        }
        else if(index === currencies.length - 1) {
            return "end"
        }
        else {
            return "middle"
        }
    }
    const handleShow = (event, index) => {
        if(show != index) {
            setShow(index)
        }
        else {
            setShow(6)
        }
    }
    const handleSubmit = (event, id, value) => {
        setShow(6)
        props.handleCounter(event, id, value)
    }
    const colors = ["#E5E4E2", "#FFD700", "#F2E279", "#C0C0C0", "#B87333"]
    return (
        <>
            <InputGroup >
                <InputGroup.Text style={{border:"1px solid black"}}>Money</InputGroup.Text>
                {currencies.map((currency, index) => (
                    show != index ? 
                        <Button key={currency} className={styleFunction(index, currencies)} style={{marginTop:"0",padding:"0 0.5em 0 0.5em", border:"1px solid black", backgroundColor: colors[index], color:"black"}} onClick={(event) => {handleShow(event, index)}}>{props.moneyPouch[currency]} {currencies_shortnames[currency]}</Button>
                        :
                        <ButtonGroup  key={currency} id="currency" vertical style={{zIndex:"5"}} aria-label={`adjust amount of ${currency} you have`}>
                            <Button className={styleFunction(index, currencies)} style={{padding:"0 0.25em 0 0.25em", border:"1px solid black"}} variant="success" onClick={event => handleSubmit(event, currency, tempValue)}>Submit</Button>
                            <input className={styleFunction(index, currencies)} defaultValue={props.moneyPouch[currency]} onChange={(event) => {setTempValue(event.target.value)}} style={{height:"1.75em",border:"1px solid black", width:"5em"}}></input>
                            <Button type="submit" className={styleFunction(index, currencies)} style={{padding:"0 0.25em 0 0.25em", border:"1px solid black"}} variant="danger" onClick={event => setShow(6)}>Cancel</Button>
                        </ButtonGroup>
                ))}
            </InputGroup>
        </>
    )
}
/*
<InputGroup style={{width:"100%"}}>
    <InputGroup.Text style={{border:"1px solid black"}}>Money</InputGroup.Text>
    {currencies.map((currency, index) => (
        show != index ? 
            <ButtonGroup key={currency} id="currency" vertical style={{zIndex:"5"}} aria-label={`amount of ${currency} you have, click to change`}>
                {false ? <Button className={styleFunction(index, currencies)} style={{padding:"0 0.25em 0 0.25em", border:"1px solid black"}} variant="success" onClick={event => props.handleCounter(event, "inc", currency)}>+</Button> : null}
                <Button className={styleFunction(index, currencies)} style={{marginTop:"0",padding:"0 0.5em 0 0.5em", border:"1px solid black", backgroundColor: colors[index], color:"black"}} onClick={(event) => {handleShow(event, index)}}>{props.moneyPouch[currency]} {currencies_shortnames[currency]}</Button>
                {false ? <Button className={styleFunction(index, currencies)} style={{padding:"0 0.25em 0 0.25em", border:"1px solid black"}} variant="danger" onClick={event => props.handleCounter(event, "dec", currency)}>-</Button> : null}
            </ButtonGroup>
            :
            <ButtonGroup  key={currency} id="currency" vertical style={{zIndex:"5"}} aria-label={`adjust amount of ${currency} you have`}>
                <Button className={styleFunction(index, currencies)} style={{padding:"0 0.25em 0 0.25em", border:"1px solid black"}} variant="success" onClick={event => handleSubmit(event, currency, tempValue)}>Submit</Button>
                <input className={styleFunction(index, currencies)} defaultValue={props.moneyPouch[currency]} onChange={(event) => {setTempValue(event.target.value)}} style={{height:"1.75em",border:"1px solid black", width:"5em"}}></input>
                <Button type="submit" className={styleFunction(index, currencies)} style={{padding:"0 0.25em 0 0.25em", border:"1px solid black"}} variant="danger" onClick={event => setShow(6)}>Cancel</Button>
            </ButtonGroup>
    ))}
</InputGroup>
*/