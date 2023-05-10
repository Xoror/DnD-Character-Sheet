import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import { changeDetails, deleteSense, changeSenseValue } from './CharDetailsSlice';
import { FilterBox } from '../../components/FilterBox';

export const SensesBox = (props) => {
    const dispatch = useDispatch()
    const senses = useSelector(state => state.charDetails.senses)

    const [defaultSelectValue, setDefaultSelectValue] = useState("")

    const handleAdd = (event) => {
        setDefaultSelectValue(event.target.value)
        dispatch(changeDetails([event.target.value, "Senses"]))
        setDefaultSelectValue("")
    }
    const handleInputChange = (event, index, type) => {
        console.log(event.target.value)
        dispatch(changeSenseValue([event.target.value, index]))
    }
    const handleDelete = (event, index, type) => {
        event.preventDefault()
        dispatch(deleteSense(index))
    }
    return(
        <Col className="miscbar-col">
            <FilterBox show={props.show} defaultSelectValue={defaultSelectValue} hasValue="true" header="Senses" data={senses} test="has" handleAdd={handleAdd} handleDelete={handleDelete} handleInputChange={handleInputChange}/>
        </Col>
    )
}
/*
<Card border="dark" bg="secondary" style={{minWidth:"4em",paddingTop:"0.5em", paddingBottom:"0.5em"}}>
    <FilterBox show={props.show} defaultSelectValue={defaultSelectValue} hasValue="true" header="Senses" data={senses} test="has" handleAdd={handleAdd} handleDelete={handleDelete} handleInputChange={handleInputChange}/>
</Card>
*/