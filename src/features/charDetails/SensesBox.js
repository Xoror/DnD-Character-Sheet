import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import { MdUnfoldMoreDouble, MdUnfoldLessDouble } from "react-icons/md"

import { changeDetails, deleteSense, changeSenseValue } from './CharDetailsSlice';
import { FilterBox } from '../../components/FilterBox';

export const SensesBox = (props) => {
    const dispatch = useDispatch()
    const senses = useSelector(state => state.charDetails.senses)
    const sensesHas = useSelector(state => state.charDetails.sensesHas)

    const [defaultSelectValue, setDefaultSelectValue] = useState("")

    const handleAdd = (event) => {
        setDefaultSelectValue(event.target.value)
        dispatch(changeDetails([event.target.value, "Senses"]))
        setDefaultSelectValue("")
    }
    const handleInputChange = (event, item, type) => {
        console.log(event.target.value)
        dispatch(changeSenseValue([event.target.value, item.id]))
    }
    const handleDelete = (event, item, type) => {
        event.preventDefault()
        dispatch(deleteSense(item))
    }
    return(
        <Col className="miscbar-col four" style={{padding:"0em"}}>
            <div style={{display:"flex", height:"100%"}}> 
                <div style={{padding:"0.5em", height:"100%", width:"100%"}}>
                    <FilterBox show={props.show} defaultSelectValue={defaultSelectValue} selectable={true} hasValue="true" valueDescriptor="distance" valueLegend="ft" header="Senses" data={sensesHas} choices={senses} handleAdd={handleAdd} handleDelete={handleDelete} handleInputChange={handleInputChange}/>
                </div>
                <Button aria-labelledby="fold-unfold-misc-bar-right-button" className="miscbar-expand-button right" style={{borderLeft:"1px solid black"}} onClick={props.setShow}>
                    {props.showMiscBar ? <MdUnfoldLessDouble aria-labelledby="fold-unfold-misc-bar-right-button" size="1.5em"/> : <MdUnfoldMoreDouble aria-labelledby="fold-unfold-misc-bar-right-button" size="1.5em"/>}
                    <label className="visually-hidden" id="fold-unfold-misc-bar-right-button">{props.showMiscBar ? "Collapse condition/lanugages/senses bar" : "Expand condition/lanugages/senses bar"}</label>
                </Button>
            </div>
        </Col>
    )
}
/*
<Card border="dark" bg="secondary" style={{minWidth:"4em",paddingTop:"0.5em", paddingBottom:"0.5em"}}>
    <FilterBox show={props.show} defaultSelectValue={defaultSelectValue} hasValue="true" header="Senses" data={senses} test="has" handleAdd={handleAdd} handleDelete={handleDelete} handleInputChange={handleInputChange}/>
</Card>
*/