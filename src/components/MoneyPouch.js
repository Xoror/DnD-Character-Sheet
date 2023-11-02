import React, { useState } from "react";
import "./MoneyPouch.scss"

//import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonGroup from '../BootstrapReplace/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup';

/*
    This componen displays a general money pouch. The required inputs are:
        - A JSON object as "moneyPouch", where each currency comes as a key/value (string/number) pair (so like {gold: 1, silver: 50}) etc
        - A JSON object as "currenciesShortnames", which assigns a shortname/abbreviation to each currency as a key/value (string/string) pair.
          The keys HAVE to be the same as for the "moneyPouch" object
        - A function as "handleCounter(event, currencyKey, value)", which gives back any changes you make as through "value" for a given
          currency's key "currencyKey", which will be used to update your money state.
    Optional inputs are:
        - An array of strings as "colors", which will be the background colors of the different currency boxes. It will have to contain a color
          for each currency. If none provided, the backgrounds will be all white.
*/

export const MoneyPouch = (props) => {
    const [show, setShow] = useState(6)
    const [tempValue, setTempValue] = useState(0)

    const moneyPouch = props.moneyPouch
    const currencies = Object.keys(props.moneyPouch)
    const currencies_shortnames = props.currenciesShortnames
    let colors = []
    if(props.colors === undefined) {
        currencies.forEach(currency => (
            colors.push("white")
        ))
    }
    else {
        colors = props.colors
    }

    const styleFunction = (index, currencies, edit) => {
        if(index === 0) {
            return "middle"
        }
        else if(index === currencies.length - 1) {
            if(edit === "edit-submit") {
                return "end-edit-submit"
            }
            else if(edit === "edit-cancel") {
                return "end-edit-cancel"
            }
            else {
                return "end"
            }
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
    return (
        <>
            <InputGroup >
                <InputGroup.Text style={{border:"1px solid black"}}>Money</InputGroup.Text>
                {currencies.map((currency, index) => (
                    show != index ? 
                        <button 
                            key={currency} 
                            className={styleFunction(index, currencies) + " money-edit-button"} 
                            style={{backgroundColor: colors[index]}} onClick={(event) => {handleShow(event, index)}}
                        >
                            {moneyPouch[currency]} {currencies_shortnames[currency]}
                        </button>
                        :
                        <ButtonGroup  
                            key={currency} 
                            id="currency" 
                            vertical 
                            style={{zIndex:"5"}} 
                            aria-label={`adjust amount of ${currency} you have`
                        }>
                            <button 
                                type="submit" 
                                className={styleFunction(index, currencies, "edit-submit") + " submit-button"} 
                                onClick={event => handleSubmit(event, currency, tempValue)}
                            >Submit</button>
                            <input 
                                className="middle edit-input" 
                                style={{backgroundColor: colors[index]}} 
                                defaultValue={moneyPouch[currency]} 
                                onChange={(event) => {setTempValue(event.target.value)}} 
                            ></input>
                            <button 
                                className={styleFunction(index, currencies, "edit-cancel") + " cancel-button"} 
                                onClick={event => setShow(6)}
                            >Cancel</button>
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