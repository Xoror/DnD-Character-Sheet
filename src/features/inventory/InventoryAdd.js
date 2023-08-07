import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import CreatableSelect from 'react-select/creatable'
import Modal from "react-bootstrap/Modal";

import { addContainer, updateTotals } from "./InventorySlice";

export const InventoryAdd = (props) => {
    const dispatch = useDispatch()
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
        props.setShowAddItem(false)
        props.setShowQuickAddItem(false)
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
		control: (provided, {data, isFocused} )=> ({...provided, zIndex:"1055", borderTopLeftRadius:"0", borderBottomLeftRadius:"0", boxShadow: isFocused ? "0 0 0 0.25em rgba(13, 110, 253, 0.25)" : provided.boxShadow, border: isFocused ? "1px solid rgba(13, 110, 253, 0.5)":provided.border, ":hover":{border: isFocused ? "1px solid rgba(13, 110, 253, 0.5)" : "1px solid #ced4da"}})
	}
    
    let category_options = ["Adventuring Gear", "Ammunition", "Arcane Focus", "Armor", "Artisan's Tools", "Druidic Focus", "Gaming Set", "Heavy Armor", "Holy Symbol", "Instrument", "Light Armor", "Martial Melee Weapon", "Martial Ranged Weapon", "Medium Armor", "Poison", "Potion", "Other", "Ring", "Rod", "Scroll", "Shield", "Simple Melee Weapon", "Simple Ranged Weapon", "Spellcasting Focus", "Staff", "Vehicle (Air)", "Vehicle (Land)", "Vehicle (Water)", "Wand", "Wondrous Item"]
    let rarities = ["Mundane", "Common", "Uncommon", "Rare", "Very Rare", "Legendary", "Artifact", "Unknown"]
    return (
        <>
            <div style={props.showQuickAddItem ? null:{display:"none"}}>
                <InputGroup>
                    <InputGroup.Text className="top-left-group top-right-group" style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : "Add New Item" } </InputGroup.Text> 
                    {editing ? <Button className="top-right-group" onClick={() => (setEditing(false), setDefaultValues(itemTemplate))}>Cancel</Button> : ""}
                </InputGroup>
                <Form onSubmit={(event) => handleClick(event)}>
                    <InputGroup>
                        <Form.Control className="middle-left-group" value={defaultValues.name} required placeholder="Name" id="item-name" aria-label="Name" onChange={event => handleSelectValues(event, "name")}/>
                        <Form.Select value={defaultValues.category} required aria-label="item-category-select" onChange={event => handleSelectValues(event, "category")}>
                            <option value="">Choose Item Category</option>
                            {category_options.map((category, index) => (
                                <option key={`category-option-${category}`} value={category.toLowerCase()}>{category}</option>
                            ))}
                        </Form.Select>
                        <CreatableSelect className="middle-right-group"
                            value={defaultValues.container} onChange={(value) => (handleSelectValues(value, "container"))} 
                            onCreateOption={(value) => handleCreateOption(value)} isClearable 
                            options={containers} styles={customStyles} required 
                            placeholder="Select or create Container..."
                        /> 
                    </InputGroup>
                    <InputGroup>
                        <Form.Control className="middle-left-group" value={defaultValues.qty} onChange={event => handleSelectValues(event, "qty")} required type="number" min="0" placeholder="Qty" aria-label="Quantity to add"/>
                        <Form.Control value={defaultValues.worth} onChange={event => handleSelectValues(event, "worth")} required placeholder="Worth (1, gp)" aria-label="worth of one"/>
                        <Form.Control className="middle-right-group" value={defaultValues.weight} onChange={event => handleSelectValues(event, "weight")} required type="number" placeholder="Weight (1, lbs)" aria-label="Weight of one"/>
                    </InputGroup>
                    <InputGroup>
                        <Form.Select className="middle-left-group" type="boolean" value={defaultValues.isEquipped} required aria-label="is-wearing" onChange={event => handleSelectValues(event, "isEquipped")}>
                            <option value="">Is wearing?</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Form.Select>
                        <Form.Select className="middle-right-group" type="text" value={defaultValues.rarity} required aria-label="rarity" onChange={event => handleSelectValues(event, "rarity")}>
                            <option value="">Choose Rarity</option>
                            {rarities.map((rarity, index) => (
                                <option key={`rarity-option-${rarity}`} value={rarity}>{rarity}</option>
                            ))}
                        </Form.Select>
                    </InputGroup>
                    <InputGroup>
                        <Form.Select className="middle-left-group" type="boolean" value={defaultValues.attunable} required aria-label="is-attunable" onChange={event => handleSelectValues(event, "attunable")}>
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
                        <Button className="middle-right-group" variant="success" aria-label="submit" type="submit">Submit</Button>
                    </InputGroup>
                    {defaultValues.attunable ? <Form.Control as="textarea" aria-label="attunement-requirement" placeholder="Attunement Requirement (e.g. 'requires attunement by a druid')" value={defaultValues.attuneRequirement} onChange={event => handleSelectValues(event, "attuneRequirement")}/> : null }
                    <Form.Control required className="bottom-left-group bottom-right-group" as="textarea" aria-label="item-description" placeholder="Item Description" value={defaultValues.description} onChange={event => handleSelectValues(event, "description")}/>
                </Form>
            </div>
            <Modal contentClassName="modal-custom" size="lg" show={props.showAddItem} onHide={() => props.setShowAddItem(false)}>
                <Modal.Header closeButton onClick={() => props.setShowAddItem(false)}>
					<Modal.Title>
						Adding a new Item
					</Modal.Title>
				</Modal.Header>

                
                <Form onSubmit={(event) => (handleClick(event))}>
                    <Modal.Body>
                        <InputGroup>
                            <InputGroup.Text className="top-left-group top-right-group" style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : "Add New Item" } </InputGroup.Text> 
                            {editing ? <Button className="top-right-group" onClick={() => (setEditing(false), setDefaultValues(itemTemplate))}>Cancel</Button> : ""}
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text className="middle-left-group">Name</InputGroup.Text>
                            <Form.Control value={defaultValues.name} required placeholder="Name" id="item-name" aria-label="Name" onChange={event => handleSelectValues(event, "name")}/>
                            <InputGroup.Text>Category</InputGroup.Text>
                            <Form.Select value={defaultValues.category} required aria-label="item-category-select" onChange={event => handleSelectValues(event, "category")}>
                                <option value="">Choose Item Category</option>
                                {category_options.map((category, index) => (
                                    <option key={`category-option-${category}`} value={category.toLowerCase()}>{category}</option>
                                ))}
                            </Form.Select>
                            <InputGroup.Text>Container</InputGroup.Text>
                            <CreatableSelect className="middle-right-group"
                                value={defaultValues.container} onChange={(value) => (handleSelectValues(value, "container"))} 
                                onCreateOption={(value) => handleCreateOption(value)} isClearable 
                                options={containers} styles={customStyles} required 
                                placeholder="Select or create Container..."
                            /> 
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text className="middle-left-group">Quantity to add</InputGroup.Text>
                            <Form.Control value={defaultValues.qty} onChange={event => handleSelectValues(event, "qty")} required type="number" min="0" placeholder="Qty" aria-label="Quantity"/>
                            <InputGroup.Text>Worth (1)</InputGroup.Text>
                            <Form.Control value={defaultValues.worth} onChange={event => handleSelectValues(event, "worth")} required placeholder="Worth (1, gp)" aria-label="worth" aria-describedby="worth"/>
                            <InputGroup.Text>Weight (1)</InputGroup.Text>
                            <Form.Control className="middle-right-group" value={defaultValues.weight} onChange={event => handleSelectValues(event, "weight")} required type="number" placeholder="Weight (1, lbs)" aria-label="Weight"/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text className="middle-left-group">Wearing</InputGroup.Text>
                            <Form.Select type="boolean" value={defaultValues.isEquipped} required aria-label="is-wearing" onChange={event => handleSelectValues(event, "isEquipped")}>
                                <option value="">Is wearing?</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </Form.Select>
                            <InputGroup.Text>Rarity</InputGroup.Text>
                            <Form.Select className="middle-right-group" type="text" value={defaultValues.rarity} required aria-label="rarity" onChange={event => handleSelectValues(event, "rarity")}>
                                <option value="">Choose Rarity</option>
                                {rarities.map((rarity, index) => (
                                    <option key={`rarity-option-${rarity}`} value={rarity}>{rarity}</option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text className="middle-left-group">Is Attunable</InputGroup.Text>
                            <Form.Select type="boolean" value={defaultValues.attunable} required aria-label="is-attunable" onChange={event => handleSelectValues(event, "attunable")}>
                                <option value="">Is attunable?</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </Form.Select>
                            {defaultValues.attunable === true ?
                                <>
                                    <InputGroup.Text>Is Attuned</InputGroup.Text>
                                    <Form.Select className="middle-right-group" type="boolean" value={defaultValues.attuned} required aria-label="is-attuned" onChange={event => handleSelectValues(event, "attuned")}>
                                        <option value="">Is attuned?</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Form.Select>
                                </> : null
                            }
                        </InputGroup>
                        {defaultValues.attunable ? 
                            <>
                                <InputGroup.Text className="middle-left-group middle-right-group">Attunement Requirement</InputGroup.Text>
                                <Form.Control className="middle-left-group middle-right-group" as="textarea" aria-label="attunement-requirement" placeholder="Attunement Requirement (e.g. 'requires attunement by a druid')" value={defaultValues.attuneRequirement} onChange={event => handleSelectValues(event, "attuneRequirement")}/>
                            </>
                        : null }
                        <InputGroup.Text className="middle-left-group middle-right-group">Description</InputGroup.Text>
                        <Form.Control required className="bottom-left-group bottom-right-group" as="textarea" aria-label="item-description" placeholder="Item Description" value={defaultValues.description} onChange={event => handleSelectValues(event, "description")}/>
                    </Modal.Body>
                    <Modal.Footer>
						<Button variant="danger" onClick={() => props.setShowAddItem(false)}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Save Changes
						</Button>
					</Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}