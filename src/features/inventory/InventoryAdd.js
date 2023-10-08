import React from "react";
import { useDispatch, useSelector } from "react-redux"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import InputGroup from 'react-bootstrap/InputGroup'
import CreatableSelect from 'react-select/creatable'
import Modal from "react-bootstrap/Modal"

import { addContainer } from "./InventorySlice"

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
		let option = {value: createdOption.toLowerCase(), label: createdOption, weight:0, containsWeight:0, maxWeightIn:0}
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
		menu: provided => ({ ...provided, zIndex: 1055, marginTop: 0,height:"100%",}),
		input: provided => ({ ...provided, minWidth:"13em"}), 
		container:provided => ({ ...provided, maxWidth:"13em"}),
		control: (provided, {data, isFocused} )=> ({...provided, zIndex:"2", borderTopLeftRadius:"0", borderBottomLeftRadius:"0", boxShadow: isFocused ? "0 0 0 0.25em rgba(13, 110, 253, 0.25)" : provided.boxShadow, border: isFocused ? "1px solid rgba(13, 110, 253, 0.5)":provided.border, ":hover":{border: isFocused ? "1px solid rgba(13, 110, 253, 0.5)" : "1px solid #ced4da"}})
	}
    
    let category_options = ["Adventuring Gear", "Ammunition", "Arcane Focus", "Armor", "Artisan's Tools", "Druidic Focus", "Gaming Set", "Heavy Armor", "Holy Symbol", "Instrument", "Light Armor", "Martial Melee Weapon", "Martial Ranged Weapon", "Medium Armor", "Poison", "Potion", "Other", "Ring", "Rod", "Scroll", "Shield", "Simple Melee Weapon", "Simple Ranged Weapon", "Spellcasting Focus", "Staff", "Vehicle (Air)", "Vehicle (Land)", "Vehicle (Water)", "Wand", "Wondrous Item"]
    let rarities = ["Mundane", "Common", "Uncommon", "Rare", "Very Rare", "Legendary", "Artifact", "Unknown"]
    return (
        <>
            <div aria-labelledby="quick-add-new-item" style={{color:"black"}} className={props.showQuickAddItem ? null: "visually-hidden"}>
                <InputGroup>
                    <InputGroup.Text as="label" id="quick-add-new-item" className="top-left-group top-right-group" style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : "Add New Item" } </InputGroup.Text> 
                    {editing ? <Button className="top-right-group" onClick={() => (setEditing(false), setDefaultValues(itemTemplate))}>Cancel</Button> : ""}
                </InputGroup>
                <Form aria-label="quick-add-new-item-form" onSubmit={(event) => handleClick(event)}>
                    <InputGroup>
                        <FloatingLabel controlId="item-name" label="Name">
                            <Form.Control ref={props.inputRef} className="middle-left-group" value={defaultValues.name} required placeholder="" onChange={event => handleSelectValues(event, "name")}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="item-category" label="Category">
                            <Form.Select 
                            aria-labelledby="item-category" 
                            value={defaultValues.category} 
                            required 
                            onChange={event => handleSelectValues(event, "category")}>
                                <option value="">Choose Item Category</option>
                                {category_options.map((category, index) => (
                                    <option key={`category-option-${category}`} value={category}>{category}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId="item-container" label="Container">
                            <Form.Select  aria-labelledby="item-container" 
                                className="middle-right-group"
                                value={defaultValues.container}
                                required 
                                placeholder="Select or create Container..."
                                onChange={event => handleSelectValues(event, "container")}
                            >
                                <option value="">Choose Container</option>
                                    {containers.map((container, index) => (
                                        <option key={`container-option-${container.value}`} value={container.id}>{container.label}</option>
                                    ))}
                            </Form.Select>
                        </FloatingLabel>
                    </InputGroup>
                    <InputGroup>
                        <FloatingLabel controlId="item-quantity" label="Quantity">
                            <Form.Control aria-labelledby="item-quantity" className="middle-left-group" value={defaultValues.qty} onChange={event => handleSelectValues(event, "qty")} required type="number" min="0" placeholder=""/>
                        </FloatingLabel>
                        <FloatingLabel controlId="item-worth" label="Worth (1, gp)">
                            <Form.Control aria-labelledby="item-worth" value={defaultValues.worth} onChange={event => handleSelectValues(event, "worth")} required placeholder="" type="number" min="0" step="0.01"/>
                        </FloatingLabel>
                        <FloatingLabel controlId="item-weight" label="Weight (1, lbs)">
                            <Form.Control aria-labelledby="item-weight" className="middle-right-group" value={defaultValues.weight} onChange={event => handleSelectValues(event, "weight")} required placeholder="" type="number" min="0" step="0.01"/>
                        </FloatingLabel>
                    </InputGroup>
                    <InputGroup>
                        <FloatingLabel controlId="item-is-wearing" label="Is wearing?">
                            <Form.Select aria-labelledby="item-is-wearing" className="middle-left-group" type="boolean" value={defaultValues.isEquipped} required onChange={event => handleSelectValues(event, "isEquipped")}>
                                <option value="">Choose if wearing</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId="item-rarity" label="Rarity">
                            <Form.Select aria-labelledby="item-rarity" className="middle-right-group" type="text" value={defaultValues.rarity} required onChange={event => handleSelectValues(event, "rarity")}>
                                <option value="">Choose Rarity</option>
                                {rarities.map((rarity, index) => (
                                    <option key={`rarity-option-${rarity}`} value={rarity}>{rarity}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </InputGroup>
                    <InputGroup>
                        <FloatingLabel controlId="item-is-attunable" label="Is attunable?">
                            <Form.Select aria-labelledby="item-is-attunable" className="middle-left-group" type="boolean" value={defaultValues.attunable} required onChange={event => handleSelectValues(event, "attunable")}>
                                <option value="">Chose if attunable</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </Form.Select>
                        </FloatingLabel>
                        {defaultValues.attunable === true ?
                            <FloatingLabel controlId="item-is-attuned" label="Is attuned?">
                                <Form.Select aria-labelledby="item-is-attuned" type="boolean" value={defaultValues.attuned} required onChange={event => handleSelectValues(event, "attuned")}>
                                    <option value="">Choose if attuned</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Form.Select> 
                            </FloatingLabel>
                            : null
                        }
                        <Button className="middle-right-group" variant="success" aria-label="submit" type="submit">Submit</Button>
                    </InputGroup>
                    {defaultValues.attunable ? 
                        <FloatingLabel controlId="item-attune-requirement" label="Attunement Requirement (e.g. 'requires attunement by a druid')">
                            <Form.Control as="textarea" aria-labelledby="item-attune-requirement" className="middle-right-group middle-left-group" style={{height:"6em"}} placeholder="" value={defaultValues.attuneRequirement} onChange={event => handleSelectValues(event, "attuneRequirement")}/>
                        </FloatingLabel>
                         : null
                    }
                    <FloatingLabel controlId="item-description" label="Description">
                        <Form.Control aria-labelledby="item-description" style={{height:"8em"}} required className="bottom-left-group bottom-right-group" as="textarea" placeholder="" value={defaultValues.description} onChange={event => handleSelectValues(event, "description")}/>
                    </FloatingLabel>
                </Form>
            </div>

            <Modal backdrop="static" aria-labelledby="add-new-item-dialog" contentClassName="modal-custom" size="lg" show={props.showAddItem} onHide={() => props.setShowAddItem(false)}>
                <Modal.Header closeButton>
					<Modal.Title as="label" id="add-new-item-dialog">
						Adding a new Item
					</Modal.Title>
				</Modal.Header>

                <Form aria-labelledby="add-new-item" onSubmit={(event) => (handleClick(event))}>
                    <Modal.Body>
                        <InputGroup>
                            <InputGroup.Text as="label" id="add-new-item" className="top-left-group top-right-group" style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : "Add New Item" } </InputGroup.Text> 
                            {editing ? <Button className="top-right-group" onClick={() => (setEditing(false), setDefaultValues(itemTemplate))}>Cancel</Button> : ""}
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text as="label" id="item-name" className="middle-left-group">Name</InputGroup.Text>
                            <Form.Control value={defaultValues.name} required placeholder="Name" aria-labelledby="item-name" onChange={event => handleSelectValues(event, "name")}/>
                            <InputGroup.Text as="label" id="item-category">Category</InputGroup.Text>
                            <Form.Select value={defaultValues.category} required aria-labelledby="item-category" onChange={event => handleSelectValues(event, "category")}>
                                <option value="">Choose Item Category</option>
                                {category_options.map((category, index) => (
                                    <option key={`category-option-${category}`} value={category.toLowerCase()}>{category}</option>
                                ))}
                            </Form.Select>
                            <InputGroup.Text as="label" id="item-container">Container</InputGroup.Text>
                            <Form.Select  aria-labelledby="item-container" 
                                className="middle-right-group"
                                value={defaultValues.container}
                                required 
                                placeholder="Select or create Container..."
                                onChange={event => handleSelectValues(event, "container")}
                            >
                                <option value="">Choose Container</option>
                                    {containers.map((container, index) => (
                                        <option key={`container-option-${container.value}`} value={container.id}>{container.label}</option>
                                    ))}
                            </Form.Select>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text as="label" id="item-quantity" className="middle-left-group">Quantity to add</InputGroup.Text>
                            <Form.Control aria-labelledby="item-quantity" value={defaultValues.qty} onChange={event => handleSelectValues(event, "qty")} required type="number" min="0" placeholder="Quantity"/>
                            <InputGroup.Text as="label" id="item-worth">Worth (1, GP)</InputGroup.Text>
                            <Form.Control value={defaultValues.worth} onChange={event => handleSelectValues(event, "worth")} required placeholder="Worth" type="number" min="0" step="0.01" aria-labelledby="item-worth"/>
                            <InputGroup.Text as="label" id="item-weight">Weight (1, lbs)</InputGroup.Text>
                            <Form.Control className="middle-right-group" value={defaultValues.weight} onChange={event => handleSelectValues(event, "weight")} required type="number" min="0" step="0.01" placeholder="Weight" aria-labelledby="item-weight"/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text as="label" id="item-is-wearing" className="middle-left-group">Wearing</InputGroup.Text>
                            <Form.Select type="boolean" value={defaultValues.isEquipped} required aria-labelledby="item-is-wearing" onChange={event => handleSelectValues(event, "isEquipped")}>
                                <option value="">Is wearing?</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </Form.Select>
                            <InputGroup.Text as="label" id="item-rarity">Rarity</InputGroup.Text>
                            <Form.Select className="middle-right-group" type="text" value={defaultValues.rarity} required aria-labelledby="item-rarity" onChange={event => handleSelectValues(event, "rarity")}>
                                <option value="">Choose Rarity</option>
                                {rarities.map((rarity, index) => (
                                    <option key={`rarity-option-${rarity}`} value={rarity}>{rarity}</option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text as="label" id="item-is-attunable" className="middle-left-group">Is Attunable</InputGroup.Text>
                            <Form.Select type="boolean" value={defaultValues.attunable} className={defaultValues.attunable ? null : "middle-right-group"} required aria-labelledby="item-is-attunable" onChange={event => handleSelectValues(event, "attunable")}>
                                <option value="">Is attunable?</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </Form.Select>
                            {defaultValues.attunable === true ?
                                <>
                                    <InputGroup.Text as="label" id="item-is-attuned">Is Attuned</InputGroup.Text>
                                    <Form.Select className="middle-right-group" type="boolean" value={defaultValues.attuned} required aria-labelledby="item-is-attuned" onChange={event => handleSelectValues(event, "attuned")}>
                                        <option value="">Is attuned?</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Form.Select>
                                </> : null
                            }
                        </InputGroup>
                        {defaultValues.attunable ? 
                            <>
                                <InputGroup.Text as="label" id="item-attune-requirement" className="middle-left-group middle-right-group">Attunement Requirement</InputGroup.Text>
                                <Form.Control className="middle-left-group middle-right-group" as="textarea" aria-labelledby="item-attune-requirement" placeholder="Attunement Requirement (e.g. 'requires attunement by a druid')" value={defaultValues.attuneRequirement} onChange={event => handleSelectValues(event, "attuneRequirement")}/>
                            </>
                        : null }
                        <InputGroup.Text as="label" id="item-description" className="middle-left-group middle-right-group">Description</InputGroup.Text>
                        <Form.Control required className="bottom-left-group bottom-right-group" as="textarea" aria-labelledby="item-description" placeholder="Item Description" value={defaultValues.description} onChange={event => handleSelectValues(event, "description")}/>
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