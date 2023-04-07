import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import "../styles.css"

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { AiOutlinePlus } from "react-icons/ai";

import { FilterItem } from '../spells/SpellList';
import { changeExhaustion, addCondition, removeCondition } from './ConditionsSlice';

export const ConditionsBox = (props) => {
    const dispatch = useDispatch()
    const [defaultSelectValue, setDefaultSelectValue] = useState("")
    const conditions = useSelector(state => state.conditions.conditions)
    const exhaustion = useSelector(state => state.conditions.exhaustion)

    const handleChange = (type) => {
        dispatch(changeExhaustion(type))
    }
    const handleAdd = (event) => {
        setDefaultSelectValue(event.target.value)
        dispatch(addCondition(event.target.value))
        setDefaultSelectValue("")
    }
    const handleDelete = (event, index, type) => {
        dispatch(removeCondition(index))
    }
    return(
        <>
            <Card border="dark" bg="secondary" style={{paddingTop:"0.5em", paddingBottom:"0.5em"}}>
                <Container fluid>
                    <span>Conditions: </span>
                    {conditions.map((condition, index) => (
                        condition.has ? <FilterItem key={`condition-list-nr-${index}`} name={condition.name} handleDelete={handleDelete} index={index} type="placeholder"/> : ""
                    ))}
                    <select value={defaultSelectValue} className="filter-body" style={{paddingRight:"0.25em", backgroundColor:"#198754"}} onChange={handleAdd}>
                        <option value=""> Add condition </option>
                        {conditions.map((condition, index) => (
                            condition.has ? "" : <option value={index}>{condition.name}</option>
                        ))}
                    </select>
                </Container>          
            </Card>
            <Card border="dark" bg="secondary" style={{padding:"0.5em"}}>
                <div style={{display:"flex"}}> <span style={{paddingRight:"0.5em"}}>Exhaustion Level:  </span> <CounterBox handleChange={handleChange} number={exhaustion.level}/> </div>
                <br></br>
                {exhaustion.level != 0 ? 
                    <ol className={props.doesShow}>
                        {exhaustion.effects.map((effect, index) => (
                            index > exhaustion.level-1 ? "" : <li key={`exhaustion-effect-level-${index+1}`}> {exhaustion.effects[index]} </li>
                        ))}
                    </ol> : ""}
            </Card>
        </>
    )
}

const CounterBox = (props) => {
    const colors = ["#198754", "#6a9b39", "#aead22", "#ffc107", "#f3901d", "#e8662f", "#DC3545"]
    return (
        <div style={{width:"fit-content", height:"fit-content", display:"flex", color:"black", flexWrap:"wrap"}}>
            <div style={{border:"1px solid black", height:"1.5em", width:"1.5em", textAlign:"center", backgroundColor:colors[0]}}>
                <button style={{all:"unset", display:"inline-block", userSelect:"none", cursor:"pointer", height:"100%", width:"100%"}} onClick={() => props.handleChange("dec")}>-</button>
            </div>
            <div style={{backgroundColor:colors[props.number], borderTop:"1px solid black", borderBottom:"1px solid black", height:"1.5em", width:"1.5em", textAlign:"center"}}>
                <span> {props.number} </span>
            </div>
            <div style={{border:"1px solid black", height:"1.5em", width:"1.5em", textAlign:"center", backgroundColor:colors[6]}}>
                <button style={{all:"unset", display:"inline-block", userSelect:"none", cursor:"pointer", height:"100%", width:"100%"}} onClick={() => props.handleChange("inc")}>+</button>
            </div>
        </div>
    )
}