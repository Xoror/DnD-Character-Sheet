import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

import "./FilterBox.css"
import { FilterItem } from "./FilterItem";


export const FilterBox = (props) => {
    const [defaultInput, setDefaultInput] = useState("")

    let header = props.header
    let data = props.data
    let test = props.test
    let bgColor = props.bg ? props.bg : "#198754"
    const handleDelete = props.handleDelete
    const handleAdd = props.handleAdd
    const handleCreate = props.handleCreate
    const handleInputChange = props.handleInputChange
    let defaultSelectValue = props.defaultSelectValue
    let creatable = props.creatable === undefined ? false : props.creatable
    let hasValue = props.hasValue === undefined ? false : props.hasValue
    let show = props.show === undefined ? true : props.show
    let type = props.type === undefined ? "placeholder" : props.type


    return (
        <Container style={{padding:"0", display:"flex", flexWrap:"wrap"}} fluid>
            <span style={{paddingRight:"0.125em"}}>{header}: </span>
            {show ? data.map((item, index) => (
                item[test] ? <FilterItem key={`${header}-list-nr-${index}`} hasValue={hasValue} name={item.name} value={item.distance} handleDelete={handleDelete} handleInputChange={handleInputChange} index={index} type={type}/> : ""
            )): <span style={{marginLeft:"0.5em"}}>[...]</span>}
            
            { show ? (!creatable ? 
            <select value={defaultSelectValue} className="filter-body-select" style={{paddingRight:"0.25em", backgroundColor:bgColor}} onChange={handleAdd}>
                <option value=""> Add {header} </option>
                {data.map((item, index) => (
                    item[test] ? "" : <option key={`${header}-choice-${item.name}`} value={index}>{item.name}</option>
                ))}
            </select>:
            <Form onSubmit={(event) => (handleCreate(event, header), setDefaultInput(""))}>
                <div style={{display:"flex"}}>
                    <input value={defaultInput} onChange={(e) => setDefaultInput(e.target.value)} aria-label={`input-create-${header}`} style={{width:"8em",paddingRight:"0.25em", marginRight:"0", borderRadius:"0.25em 0 0 0.25em"}} className="create-input" placeholder={`Add ${header}`}></input>
                    <button className="filter-body-button" style={{ backgroundColor:bgColor}} aria-label="submit" type="submit">Add</button>
                </div>
            </Form>) : null}
        </Container>
    )
}