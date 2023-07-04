import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"


import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import { changeExhaustion, addCondition, removeCondition } from './ConditionsSlice';
import { CounterBox } from './CounterBox';
import { FilterBox } from '../../components/FilterBox';

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
    let colors=["#198754", "#6a9b39", "#aead22", "#ffc107", "#f3901d", "#e8662f", "#DC3545"]
    return(
        <>
            <Col className="miscbar-col"  style={{borderRight:"1px solid black"}}>
                <FilterBox show={props.show} header="Conditions" data={conditions} test="has" handleAdd={handleAdd} handleDelete={handleDelete} defaultSelectValue={defaultSelectValue}/>
            </Col>
            <Col className="miscbar-col" style={{borderRight:"1px solid black"}}>
                <div style={{display:"flex"}}> <span style={{paddingRight:"0.5em"}}>Exhaustion Level:  </span> <CounterBox colors={colors} handleChange={handleChange} number={exhaustion.level}/> </div>
                {exhaustion.level != 0 && props.show ?
                    <>
                        <ol style={{paddingLeft:"1.5em"}}>
                            {exhaustion.effects.map((effect, index) => (
                                index > exhaustion.level-1 ? "" : <li key={`exhaustion-effect-level-${index+1}`}> {exhaustion.effects[index]} </li>
                            ))}
                        </ol>
                    </> : null}
            </Col>
        </>
    )
}

/*
<Card border="dark" bg="secondary" style={{minWidth:"4em", paddingTop:"0.5em", paddingBottom:"0.5em"}}>
    <FilterBox show={props.show} header="Conditions" data={conditions} test="has" handleAdd={handleAdd} handleDelete={handleDelete} defaultSelectValue={defaultSelectValue}/>
</Card>
<Card border="dark" bg="secondary" style={{minWidth:"4em", padding:"0.5em", paddingBottom:"0"}}>
    <div style={{display:"flex"}}> <span style={{paddingRight:"0.5em"}}>Exhaustion Level:  </span> <CounterBox colors={colors} handleChange={handleChange} number={exhaustion.level}/> </div>
    {exhaustion.level != 0 && props.show ?
        <>
            <br></br>
            <ol>
                {exhaustion.effects.map((effect, index) => (
                    index > exhaustion.level-1 ? "" : <li key={`exhaustion-effect-level-${index+1}`}> {exhaustion.effects[index]} </li>
                ))}
            </ol>
        </> : null}
</Card>
*/