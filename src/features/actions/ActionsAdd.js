import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from "react-bootstrap/Modal";


export const ActionsAdd = (props) => {
    const editing = props.editing === undefined ? false : props.editing
    const setEditing = props.setEditing
    const defaultValues = props.defaultValues
    const setDefaultValues = props.setDefaultValues
    const inputRef = props.inputRef

    let spells = props.spells
    const actionTemplate = props.actionTemplate
    const handleSubmit = props.handleSubmit
    const handleSelectValues = props.handleSelectValues
    const options = props.options
    const show = props.show
    
    const attributesList = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma", "None"]
    const schoolList = ["Abjuration", "Conjuration", "Divination", "Enchantment","Evocation", "Illusion", "Necromancy", "Transmutation"]
    const damageTypeList = ["Bludgeoning", "Slashing", "Piercing", "Cold", "Lightning", "Thunder", "Acid", "Poison", "Necrotic", "Radiant", "Psychic", "Force", "Special", "None"]
    return(
        <>
            <div style={props.showQuickAddAction ? null:{display:"none"}}>
                <InputGroup>
                    <InputGroup.Text className="top-left-group top-right-group" style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : (spells ? "Add New Spell" : "Add New Action/Bonus Action/etc:") } </InputGroup.Text>
                    {editing ? <Button onClick={() => (setEditing(false), setDefaultValues(actionTemplate))}>Cancel</Button> : "" }
                </InputGroup>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Form.Control ref={inputRef} required value={defaultValues.name} className="middle-left-group" placeholder="Name" aria-label="Name" onChange={event => handleSelectValues(event, "name")}/>
                        <Overlay target={inputRef.current} show={show} placement="top">
                            <Tooltip id="overlay-example">
                                Please enter unique Name.
                            </Tooltip>
                        </Overlay>
                        <Form.Control required value={defaultValues.range} placeholder="Range" aria-label="Range" onChange={event => handleSelectValues(event, "range")}/>
                        <Form.Control required value={defaultValues.damage} className="middle-right-group" placeholder="Damage" aria-label="damage-dice" onChange={event => handleSelectValues(event, "damage")}/>
                    </InputGroup>
                    <InputGroup>
                        <Form.Select required value={defaultValues.type} className="middle-left-group" aria-label="action-type-select" onChange={event => handleSelectValues(event, "type")}>
                            {!spells ? <option key="0" value="">Choose Action Type</option>:<option key="0" value="">Choose Spell Tier</option>}
                            {options.map((option1, index) => 
                                <option key={`action-type-${option1}`} value={option1}>{option1}</option>
                            )}
                        </Form.Select>
                        <Form.Select required value={defaultValues.scaling} className="middle-right-group" aria-label="scaling-attribute" onChange={event => handleSelectValues(event, "scaling")}>
                            <option value="">Choose Scaling Attribute</option>
                            {attributesList.map((option1, index) => 
                                <option key={`scaling-attribute-${option1}`} value={option1}>{option1}</option>
                            )}
                        </Form.Select>
                    </InputGroup>
                    {spells ?
                    <InputGroup>
                        <Form.Select required value={defaultValues.school} className="middle-left-group" aria-label="spell-school" onChange={event => handleSelectValues(event, "school")}>
                            <option value="">Choose school</option>
                            {schoolList.map((school, index) => (
                                <option key={`spell-shool-${school}`} value={school}>{school}</option>
                            ))}
                        </Form.Select>
                        <Form.Select required value={defaultValues.ritual} className="middle-right-group" type="boolean" aria-label="is-ritual" onChange={event => handleSelectValues(event, "ritual")}>
                            <option value=""> Is ritual? </option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Select>
                    </InputGroup>
                    : ""}
                    <InputGroup>
                        {spells ? 
                        ""
                        : <Form.Select required value={defaultValues.isProficient} className="middle-left-group" type="boolean" aria-label="is-proficient" onChange={event => handleSelectValues(event, "isProficient")}> 
                            <option value="">Is proficient?</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Select> }
                        <Form.Select required value={defaultValues.damageType} className="middle-left-group" aria-label="damage-type" onChange={event => handleSelectValues(event, "damageType")}>
                            <option value="">Choose Damage Type</option>
                            {damageTypeList.map((damageType, index) => 
                                <option key={`damage-type-${damageType}`} value={damageType}>{damageType}</option>
                            )}
                        </Form.Select>
                        <Button variant="success" className="middle-right-group" aria-label="submit" type="submit">Submit</Button>
                    </InputGroup>
                    <Form.Control as="textarea" className="bottom-left-group bottom-right-group" aria-label="description" placeholder="Description" value={defaultValues.description} onChange={event => handleSelectValues(event, "description")}/>
                </Form>
            </div>
            <Modal contentClassName="modal-custom" size="lg" show={props.showAddAction} onHide={() => props.setShowAddAction(false)}>
                <Modal.Header closeButton onClick={() => props.setShowAddAction(false)}>
					<Modal.Title>
						Adding a new Item
					</Modal.Title>
				</Modal.Header>

                
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <InputGroup>
                            <InputGroup.Text className="top-left-group top-right-group" style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : (spells ? "Add New Spell" : "Add New Action/Bonus Action/etc:") } </InputGroup.Text>
                            {editing ? <Button onClick={() => (setEditing(false), setDefaultValues(actionTemplate))}>Cancel</Button> : "" }
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text className="middle-left-group">Name</InputGroup.Text>
                            <Form.Control ref={inputRef} required value={defaultValues.name} className="middle-left-group" placeholder="Name" aria-label="Name" onChange={event => handleSelectValues(event, "name")}/>
                            <Overlay target={inputRef.current} show={show} placement="top">
                                <Tooltip id="overlay-example">
                                    Please enter unique Name.
                                </Tooltip>
                            </Overlay>
                            <InputGroup.Text>Range</InputGroup.Text>
                            <Form.Control required value={defaultValues.range} placeholder="Range" aria-label="Range"  onChange={event => handleSelectValues(event, "range")}/>
                            <InputGroup.Text>Damage</InputGroup.Text>
                            <Form.Control required value={defaultValues.damage} className="middle-right-group" placeholder="Damage" aria-label="damage-dice"  onChange={event => handleSelectValues(event, "damage")}/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text className="middle-left-group">Action Type</InputGroup.Text>
                            <Form.Select required value={defaultValues.type} aria-label="action-type-select" onChange={event => handleSelectValues(event, "type")}>
                                {!spells ? <option key="0" value="">Choose Action Type</option>:<option key="0" value="">Choose Spell Tier</option>}
                                {options.map((option1, index) => 
                                    <option key={`${option1}`} value={option1}>{option1}</option>
                                )}
                            </Form.Select>
                            <InputGroup.Text>Scales with:</InputGroup.Text>
                            <Form.Select required value={defaultValues.scaling} className="middle-right-group" aria-label="scaling-attribute" onChange={event => handleSelectValues(event, "scaling")}>
                                <option value="">Choose Scaling Attribute</option>
                                {attributesList.map((option1, index) => 
                                    <option key={`scaling-attribute-${option1}`} value={option1}>{option1}</option>
                                )}
                            </Form.Select>
                        </InputGroup>
                        {spells ?
                        <InputGroup>
                            <InputGroup.Text className="middle-left-group">Spell School</InputGroup.Text>
                            <Form.Select required value={defaultValues.school} aria-label="spell-school" onChange={event => handleSelectValues(event, "school")}>
                                <option value="">Choose school</option>
                                {schoolList.map((school, index) => (
                                    <option key={`spell-shool-${index}`} value={school}>{school}</option>
                                ))}
                            </Form.Select>
                            <InputGroup.Text>Ritual</InputGroup.Text>
                            <Form.Select required value={defaultValues.ritual} className="middle-right-group" type="boolean" aria-label="is-ritual" onChange={event => handleSelectValues(event, "ritual")}>
                                <option value=""> Is ritual? </option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Form.Select>
                        </InputGroup>
                        : ""}
                        <InputGroup>
                            {spells ? 
                            "" : 
                            <>
                                <InputGroup.Text  className="middle-left-group">Proficient</InputGroup.Text>
                                <Form.Select required value={defaultValues.isProficient} type="boolean" aria-label="is-proficient" onChange={event => handleSelectValues(event, "isProficient")}> 
                                    <option value="">Is proficient?</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </Form.Select> 
                            </>}
                            <InputGroup.Text className="middle-left-group">Damage Type</InputGroup.Text>
                            <Form.Select required value={defaultValues.damageType}className="middle-right-group" aria-label="damage-type" onChange={event => handleSelectValues(event, "damageType")}>
                                <option value="">Choose Damage Type</option>
                                {damageTypeList.map((damageType, index) => 
                                    <option key={`damage-type-${damageType}`} value={damageType}>{damageType}</option>
                                )}
                            </Form.Select>
                        </InputGroup>
                        <InputGroup.Text className="middle-right-group middle-left-group">Description</InputGroup.Text>
                        <Form.Control as="textarea" className="bottom-left-group bottom-right-group" aria-label="description" placeholder="Description" value={defaultValues.description} onChange={event => handleSelectValues(event, "description")}/>
                    </Modal.Body>
                    <Modal.Footer>
						<Button variant="danger" onClick={() => props.setShowAddAction(false)}>
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