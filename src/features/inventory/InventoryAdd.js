import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import CreatableSelect from 'react-select/creatable'

import { addContainer, updateTotals } from "./InventorySlice";

export const InventoryAdd = (props) => {
    const dispatch = useDispatch()
    const [selectedType, setSelectedType] = useState("")
    const containers = useSelector(state => state.inventory.containers)

    const handleSubmit = props.handleSubmit
    const editing = props.editing
    const setEditing = props.setEditing
    const defaultValues = props.defaultValues
    const setDefaultValues = props.setDefaultValues
    const handleSelectValues = props.handleSelectValues
    const itemTemplate = props.itemTemplate

    const handleCreateOption = (createdOption) => {
		let option = {value: createdOption.toLowerCase(), label: createdOption, weight:0}
		handleSelectValues(option, "container")
		dispatch(addContainer(option))
	}
    const handleClick = (event) => {
        event.preventDefault()
        handleSubmit(event)
    }

    const customStyles = {
		option: (defaultStyles) => ({
			...defaultStyles,
			color: "#000000",
		}),
		menu: provided => ({ ...provided, zIndex: 1055, marginTop: 0}),
		input: provided => ({ ...provided, minWidth:"13em"}), 
		container:provided => ({ ...provided, maxWidth:"13em",}),
		control: (provided, {data, isFocused} )=> ({...provided, zIndex:"2", borderTopLeftRadius:"0", borderBottomLeftRadius:"0", boxShadow: isFocused ? "0 0 0 0.25em rgba(13, 110, 253, 0.25)" : provided.boxShadow, border: isFocused ? "1px solid rgba(13, 110, 253, 0.5)":provided.border, ":hover":{border: isFocused ? "1px solid rgba(13, 110, 253, 0.5)" : "1px solid #ced4da"}})
	}
    
    let category_options = ["Adventuring Gear", "Ammunition", "Arcane Focus", "Armor", "Artisan's Tools", "Druidic Focus", "Gaming Set", "Heavy Armor", "Holy Symbol", "Instrument", "Light Armor", "Martial Melee Weapon", "Martial Ranged Weapon", "Medium Armor", "Poison", "Potion", "Other", "Ring", "Rod", "Scroll", "Shield", "Simple Melee Weapon", "Simple Ranged Weapon", "Spellcasting Focus", "Staff", "Vehicle (Air)", "Vehicle (Land)", "Vehicle (Water)", "Wand", "Wondrous Item"]
    let rarities = ["Mundane", "Common", "Uncommon", "Rare", "Very Rare", "Legendary", "Artifact", "Unknown"]
    return (
        <>
            <InputGroup>
                <InputGroup.Text style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : "Add New Item" } </InputGroup.Text> 
                {editing ? <Button onClick={() => (setEditing(false), setDefaultValues(itemTemplate))}>Cancel</Button> : ""}
            </InputGroup>
            <Form>
                <InputGroup>
                    <Form.Control value={defaultValues.name} required placeholder="Name" id="item-name" aria-label="Name" onChange={event => handleSelectValues(event, "name")}/>
                    <Form.Select value={defaultValues.category} required aria-label="item-category-select" onChange={event => handleSelectValues(event, "category")}>
                        <option value="">Choose Item Category</option>
                        {category_options.map((category, index) => (
                            <option key={`category-option-${index}`} value={category.toLowerCase()}>{category}</option>
                        ))}
                    </Form.Select>
                    <CreatableSelect 
                        value={defaultValues.container} onChange={(value) => (handleSelectValues(value, "container"))} 
                        onCreateOption={(value) => handleCreateOption(value)} isClearable 
                        options={containers} styles={customStyles} required 
                        placeholder="Select or create Container..."
                    /> 
                </InputGroup>
                <InputGroup>
                    <Form.Control value={defaultValues.qty} onChange={event => handleSelectValues(event, "qty")} required type="number" min="0" placeholder="Qty" aria-label="Quantity" aria-describedby="quantity"/>
                    <Form.Control value={defaultValues.worth} onChange={event => handleSelectValues(event, "worth")} required placeholder="Worth" aria-label="worth" aria-describedby="worth"/>
                    <Form.Control value={defaultValues.weight} onChange={event => handleSelectValues(event, "weight")} required type="number" placeholder="Weight (lbs)" aria-label="Weight" aria-describedby="Weight"/>
                </InputGroup>
                <InputGroup>
                    <Form.Select type="boolean" value={defaultValues.isEquipped} required aria-label="is-wearing" onChange={event => handleSelectValues(event, "isEquipped")}>
                        <option value="">Is wearing?</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Form.Select>
                    <Form.Select type="text" value={defaultValues.rarity} required aria-label="rarity" onChange={event => handleSelectValues(event, "rarity")}>
                        <option value="">Choose Rarity</option>
                        {rarities.map((rarity, index) => (
                            <option key={`rarity-option-${index}`} value={rarity}>{rarity}</option>
                        ))}
                    </Form.Select>
                </InputGroup>
                <InputGroup>
                    <Form.Select type="boolean" value={defaultValues.attunable} required aria-label="is-attunable" onChange={event => handleSelectValues(event, "attunable")}>
                        <option value="">Is attunable?</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Form.Select>
                    {defaultValues.attunable === true ?
                        <Form.Select type="boolean" value={defaultValues.attuned} required aria-label="is-attuned" onChange={event => handleSelectValues(event, "attuned")}>
                            <option value="">Is attuned?</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Form.Select> : null
                    }
                    <Button variant="success" aria-label="submit" type="submit" onClick={(event) => handleClick(event)}>Submit</Button>
                </InputGroup>
                {defaultValues.attunable ? <Form.Control as="textarea" aria-label="attunement-requirement" placeholder="Attunement Requirement (e.g. 'requires attunement by a druid')" value={defaultValues.attuneRequirement} onChange={event => handleSelectValues(event, "attuneRequirement")}/> : null }
                <Form.Control as="textarea" aria-label="item-description" placeholder="Item Description" value={defaultValues.description} onChange={event => handleSelectValues(event, "description")}/>
            </Form>
        </>
    )
}