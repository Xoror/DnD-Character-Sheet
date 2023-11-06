import React, { useDeferredValue, useState } from "react";

//import Container from 'react-bootstrap/Container'
import Container from '../BootstrapReplace/Container';
//import Form from "react-bootstrap/Form";
import Form from "../BootstrapReplace/Form";

import { AiOutlineCloseCircle } from "react-icons/ai";

import "./FilterBox.scss"

/*
    There are different configurations possible for this box, some of which require different inputs.
    Always required:
        - A string as "type", which is used as an identifier if this component is used multiple times.
        - An array of objects as "data", all of which have to contain an "id" field which uniquely identifies each entry and
          a "name" field which works as a label. Additionally, a value can be added to the data (like distance
          to a sense in DnD), the identifier of which is custom
        - A string as "header", which is a descriptor of whatever is displayed as chips
        - A function as "handleDelete(event, dataEntry, type", which handles the deletion of chips (aka its removal from the "data" array). As input it 
          takes a data entry of a chip as a whole and the optional "type" input as well as an "event"
    If you want to add chips by selecting them from a list:
        - A boolean as "selectable", which will make the choices appear. By default this will be false
        - An array of objecs as "choices", which will be the selectable data. It should have the same structure as the "data" object
        - A function as "handleAdd(event)", which is a select event (so event.target will follow the data structure)
        - A string as "defaultSelectValue", which is the default option of the select dropdown (ideally a state object)
    If you want to add chips by entering custom text:
        - A boolean as "creatable", which will make the text input appear. By default this will be false.
        - A function as "handleCreate(event, header)", which takes the "header" as an additional identifier and the "event" as a
          form submit event
    If you want your chips to have a value attached to it (like how far a sense extends):
        - A boolean as "hasValue", which will show the value part of the chip
        - A string as "valueDescriptor", which is the JSON key used for the value attached to the data (so if the data structure
          is {id=1, name="Test", distance=60} then "distance" is the valueDescriptor)
        - A string as "valueLegend", which is the unite of the value (so say "ft", "pcs", etc.)
    Optional inputs:
        - A string as "bgColor", which is the hex code of the color you would like the chips to be. Default is a dark grey
        - A boolean as "show", can be used to hide the chips and add elements if needed, will replace them with a [...] bur keep 
          the "header"
        - A function as "handleInputChange(event, dataEntry, props.type)", which takes an input "event", the data of the chip and
          a "type" as an additional identifier
*/

export const FilterBox = (props) => {
    const [defaultInput, setDefaultInput] = useState("")
    const deferrdDefaultInput = useDeferredValue(defaultInput)

    let header = props.header
    let data = props.data
    let creatable = props.creatable === undefined ? false : props.creatable
    let selectable = props.selectable === undefined ? false : props.selectable
    const handleDelete = props.handleDelete
    const handleAdd = props.handleAdd
    const handleCreate = props.handleCreate
    const handleInputChange = props.handleInputChange
    let defaultSelectValue = props.defaultSelectValue

    let choices = props.choices === undefined ? [] : props.choices
    let hasValue = props.hasValue === undefined ? false : props.hasValue
    let valueDescriptor = props.valueDescriptor === undefined ? "" : props.valueDescriptor
    let valueLegend = props.valueLegend == undefined ? "" : props.valueLegend
    let show = props.show === undefined ? true : props.show
    let type = props.type === undefined ? "placeholder" : props.type

    const createSubmit = (event) => {
        event.preventDefault()
        if(defaultInput != "") {
            handleCreate(event, header)
            setDefaultInput("")
        }
    }
    const notCollapsedElement= () => {
        return (
            <>
                {creatable ? 
                    <>
                        <label id="createable-label" style={{paddingRight:"0.125em"}}>{header}: </label>
                        <Form aria-labelledby="createable-label" onSubmit={(event) => (createSubmit(event))}>
                            <div style={{display:"flex"}}>
                                <input value={deferrdDefaultInput} onChange={(e) => setDefaultInput(e.target.value)} aria-label={`input create ${header}`} className="create-input" placeholder={`Add ${header}`}></input>
                                <button className="create-add-button"  type="submit">Add</button>
                            </div>
                        </Form>
                    </>
                    : null 
                }
                {selectable ?
                    <label style={{paddingRight:"0.125em"}}>{header}: 
                        <select value={defaultSelectValue} className="filter-select" onChange={handleAdd}>
                            <option value=""> Add {header} </option>
                            {choices.map((item, index) => (
                                !data.find(condition => (condition.id === item.id)) ? <option key={`${header}-choice-${item.name}`} value={item.id}>{item.name}</option> : null
                            ))}
                        </select>
                    </label>
                    : null
                }
                {data.map((item, index) => 
                    <FilterItem key={`${header}-list-nr-${item.name}`} hasValue={hasValue} item={item} value={valueDescriptor} valueLegend={valueLegend} handleDelete={handleDelete} handleInputChange={handleInputChange} index={index} type={type}/>
                )}
            </>
        )
    }
    const collapsedElement = () => {
        return (
            <span style={{marginLeft:"0.5em"}}>[...]</span>
        )
    }

    return (
        <Container style={{padding:"0", display:"flex", flexWrap:"wrap"}} fluid>
            {show ? 
                notCollapsedElement()
                :
                collapsedElement()
            }
        </Container>
    )
}

export const FilterItem = (props) => {
	return (
		<div className="filter-body">
			<span> {props.item.name} </span>
			{props.hasValue ? (
				<>
					<input value={props.item[props.value]} onChange={(event) => props.handleInputChange(event, props.item, props.type)} style={{width:"2em", height:"1.4em"}}></input>
					<span>{props.valueLegend}</span>
				</>) : null } 
            <button className="react-icons-button-filter" aria-labelledby="delete-filter-item-button" onClick={(event) => props.handleDelete(event, props.item, props.type)}>
			    <AiOutlineCloseCircle aria-labelledby="delete-filter-item-button" size="1.25em" id="filter-delete-button" className="filter-delete-button "/>
                <label id="delete-filter-item-button" className="visually-hidden">Delete {props.item.name}</label>
            </button>
		</div>
	)
}