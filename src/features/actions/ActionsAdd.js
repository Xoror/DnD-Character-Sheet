import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from "react-bootstrap/Modal";


export const ActionsAdd = (props) => {
    //these are only initialized like this for a visual of the necessary props
    const editing = props.editing === undefined ? false : props.editing
    const setEditing = props.setEditing
    const defaultValues = props.defaultValues
    const setDefaultValues = props.setDefaultValues
    let spells = props.spells
    const actionTemplate = props.actionTemplate
    const handleSubmit = props.handleSubmit
    const handleSelectValues = props.handleSelectValues
    const options = props.options
    const show = props.show

    //this is the reference used to position a tooltip when a dupilcate name is entered
    const inputRef = props.inputRef

    //This variable is for accessibility only, used to differentiate between actions and spells in aria-labels
    let ariaLabel = spells ? "spell":"action"
    
    const attributesList = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma", "None"]
    const schoolList = ["Abjuration", "Conjuration", "Divination", "Enchantment","Evocation", "Illusion", "Necromancy", "Transmutation"]
    const damageTypeList = ["Bludgeoning", "Slashing", "Piercing", "Cold", "Lightning", "Thunder", "Acid", "Poison", "Necrotic", "Radiant", "Psychic", "Force", "Special", "None"]
    return(
        <>
            <div aria-labelledby={`${editing ? "edit":"add-new"}-${ariaLabel}`} className={props.showQuickAddAction ? null:"visually-hidden"}>
                <InputGroup>
                    <InputGroup.Text as="label" id={`${editing ? "edit":"add-new"}-${ariaLabel}`} className="top-left-group top-right-group" style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : (spells ? "Add New Spell" : "Add New Action/Bonus Action/etc:") } </InputGroup.Text>
                    {editing ? <Button onClick={() => (setEditing(false), setDefaultValues(actionTemplate))}>Cancel</Button> : "" }
                </InputGroup>
                <Form aria-label={`${editing ? "edit":"add-new"}-${ariaLabel}-form`} onSubmit={handleSubmit} style={{color:"black"}}>
                    <InputGroup>
                        <FloatingLabel controlId={`${ariaLabel}-name`} label="Name">
                            <Form.Control aria-labelledby={`${ariaLabel}-name`} ref={inputRef} required value={defaultValues.name} className="middle-left-group" placeholder="" onChange={event => handleSelectValues(event, "name")}/>
                        </FloatingLabel>
                        <Overlay target={inputRef.current} show={show} placement="top">
                            <Tooltip id="unique-name-overlay">
                                Please enter unique Name.
                            </Tooltip>
                        </Overlay>
                        <FloatingLabel controlId={`${ariaLabel}-range`} label="Range">
                            <Form.Control required value={defaultValues.range} placeholder="" aria-labelledby={`${ariaLabel}-range`} onChange={event => handleSelectValues(event, "range")}/>
                        </FloatingLabel>
                        <FloatingLabel controlId={`${ariaLabel}-damage`} label="Damage">
                            <Form.Control required value={defaultValues.damage} className="middle-right-group" placeholder="" aria-labelledby={`${ariaLabel}-damage`} onChange={event => handleSelectValues(event, "damage")}/>
                        </FloatingLabel>
                    </InputGroup>
                    <InputGroup>
                        <FloatingLabel controlId={`${ariaLabel}-${spells ? "tier":"type"}`} label={`${spells ? "Tier":"Type"}`}>
                            <Form.Select required value={defaultValues.type} className="middle-left-group" aria-labelledby={`${ariaLabel}-${spells ? "tier":"type"}`} onChange={event => handleSelectValues(event, "type")}>
                                {!spells ? <option key="0" value="">Choose Action Type</option>:<option key="0" value="">Choose Spell Tier</option>}
                                {options.map((option1, index) => 
                                    <option key={`action-type-${option1}`} value={option1}>{option1}</option>
                                )}
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId={`${ariaLabel}-scaling-attribute`} label="Scaling Attribute">
                            <Form.Select required value={defaultValues.scaling} className="middle-right-group" aria-labelledby={`${ariaLabel}-scaling-attribute`} onChange={event => handleSelectValues(event, "scaling")}>
                                <option value="">Choose Scaling Attribute</option>
                                {attributesList.map((option1, index) => 
                                    <option key={`scaling-attribute-${option1}`} value={option1}>{option1}</option>
                                )}
                            </Form.Select>
                        </FloatingLabel>
                    </InputGroup>
                    {spells ?
                    <InputGroup>
                        <FloatingLabel controlId={`${ariaLabel}-school`} label="School">
                            <Form.Select required value={defaultValues.school} className="middle-left-group" aria-labelledby={`${ariaLabel}-school`} onChange={event => handleSelectValues(event, "school")}>
                                <option value="">Choose school</option>
                                {schoolList.map((school, index) => (
                                    <option key={`spell-shool-${school}`} value={school}>{school}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId={`${ariaLabel}-is-ritual`} label="Is Ritual?">
                            <Form.Select required value={defaultValues.ritual} className="middle-right-group" type="boolean" aria-labelledby={`${ariaLabel}-is-ritual`} onChange={event => handleSelectValues(event, "ritual")}>
                                <option value=""> Choose is ritual </option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Form.Select>
                        </FloatingLabel>
                    </InputGroup>
                    : null}
                    <InputGroup>
                        {spells ? 
                        null : 
                            <FloatingLabel controlId={`${ariaLabel}-is-proficient`} label="Is Proficient?">
                                <Form.Select required value={defaultValues.isProficient} className="middle-left-group" type="boolean" aria-labelledby={`${ariaLabel}-is-proficient`} onChange={event => handleSelectValues(event, "isProficient")}> 
                                    <option value="">Choose if proficient</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </Form.Select> 
                            </FloatingLabel>
                        }
                        <FloatingLabel controlId={`${ariaLabel}-damage-type`} label="Damage Type">
                            <Form.Select required value={defaultValues.damageType} className="middle-left-group" aria-labelledby={`${ariaLabel}-damage-type`} onChange={event => handleSelectValues(event, "damageType")}>
                                <option value="">Choose Damage Type</option>
                                {damageTypeList.map((damageType, index) => 
                                    <option key={`damage-type-${damageType}`} value={damageType}>{damageType}</option>
                                )}
                            </Form.Select>
                        </FloatingLabel>
                        <Button variant="success" className="middle-right-group" aria-label="Submit" type="submit">Submit</Button>
                    </InputGroup>
                    <FloatingLabel controlId={`${ariaLabel}-description`} label="Description">
                        <Form.Control as="textarea" className="bottom-left-group bottom-right-group" style={{height:"8em"}} aria-label="description" placeholder="" value={defaultValues.description} onChange={event => handleSelectValues(event, "description")}/>
                    </FloatingLabel>
                </Form>
            </div>
            <Modal backdrop="static" aria-labelledby={`add-new-${ariaLabel}-dialog`} contentClassName="modal-custom" size="lg" show={props.showAddAction} onHide={() => props.setShowAddAction(false)}>
                <Modal.Header closeButton>
					<Modal.Title as="label" id={`add-new-${ariaLabel}-dialog`}>
						Adding a new {spells ? "Spell":"Action"}
					</Modal.Title>
				</Modal.Header>

                
                <Form aria-labelledby={`add-new-${ariaLabel}`} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <InputGroup>
                            <InputGroup.Text as="label" id={`add-new-${ariaLabel}`} className="top-left-group top-right-group" style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : (spells ? "Add New Spell" : "Add New Action/Bonus Action/etc:") } </InputGroup.Text>
                            {editing ? <Button onClick={() => (setEditing(false), setDefaultValues(actionTemplate))}>Cancel</Button> : "" }
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text as="label" id={`${ariaLabel}-name`} className="middle-left-group">Name</InputGroup.Text>
                            <Form.Control autoFocus aria-labelledby={`${ariaLabel}-name`} ref={inputRef} required value={defaultValues.name} className="middle-left-group" placeholder="Name" aria-label="Name" onChange={event => handleSelectValues(event, "name")}/>
                            <Overlay target={inputRef.current} show={show} placement="top">
                                <Tooltip id="overlay-example">
                                    Please enter unique Name.
                                </Tooltip>
                            </Overlay>
                            <InputGroup.Text as="label" id={`${ariaLabel}-range`}>Range</InputGroup.Text>
                            <Form.Control aria-labelledby={`${ariaLabel}-range`} required value={defaultValues.range} placeholder="Range" aria-label="Range"  onChange={event => handleSelectValues(event, "range")}/>
                            <InputGroup.Text as="label" id={`${ariaLabel}-damage`}>Damage</InputGroup.Text>
                            <Form.Control aria-labelledby={`${ariaLabel}-damage`} required value={defaultValues.damage} className="middle-right-group" placeholder="Damage" onChange={event => handleSelectValues(event, "damage")}/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text as="label" id={`select-${ariaLabel}-type`} className="middle-left-group">{spells ? "Spell Tier" : "Action Type"}</InputGroup.Text>
                            <Form.Select required value={defaultValues.type} aria-labelledby={`select-${ariaLabel}-type`} onChange={event => handleSelectValues(event, "type")}>
                                {!spells ? <option key="0" value="">Choose Action Type</option>:<option key="0" value="">Choose Spell Tier</option>}
                                {options.map((option1, index) => 
                                    <option key={`${option1}`} value={option1}>{option1}</option>
                                )}
                            </Form.Select>
                            <InputGroup.Text as="label" id={`${ariaLabel}-scaling-attribute`}>Scales with:</InputGroup.Text>
                            <Form.Select required value={defaultValues.scaling} aria-labelledby={`${ariaLabel}-scaling-attribute`} className="middle-right-group" onChange={event => handleSelectValues(event, "scaling")}>
                                <option value="">Choose Scaling Attribute</option>
                                {attributesList.map((option1, index) => 
                                    <option key={`scaling-attribute-${option1}`} value={option1}>{option1}</option>
                                )}
                            </Form.Select>
                        </InputGroup>
                        {spells ?
                        <InputGroup>
                            <InputGroup.Text as="label" id={`${ariaLabel}-school`} className="middle-left-group">Spell School</InputGroup.Text>
                            <Form.Select required value={defaultValues.school} aria-labelledby={`${ariaLabel}-school`} onChange={event => handleSelectValues(event, "school")}>
                                <option value="">Choose school</option>
                                {schoolList.map((school, index) => (
                                    <option key={`spell-shool-${index}`} value={school}>{school}</option>
                                ))}
                            </Form.Select>
                            <InputGroup.Text as="label" id={`${ariaLabel}-ritual`}>Ritual</InputGroup.Text>
                            <Form.Select required value={defaultValues.ritual} aria-labelledby={`${ariaLabel}-ritual`} className="middle-right-group" type="boolean" aria-label="is-ritual" onChange={event => handleSelectValues(event, "ritual")}>
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
                                <InputGroup.Text as="label" id={`${ariaLabel}-is-proficient`} className="middle-left-group">Proficient</InputGroup.Text>
                                <Form.Select required value={defaultValues.isProficient} aria-labelledby={`${ariaLabel}-is-proficient`} onChange={event => handleSelectValues(event, "isProficient")}> 
                                    <option value="">Is proficient?</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </Form.Select> 
                            </>}
                            <InputGroup.Text as="label" id={`${ariaLabel}-damage-type`} className="middle-left-group">Damage Type</InputGroup.Text>
                            <Form.Select required value={defaultValues.damageType} aria-labelledby={`${ariaLabel}-damage-type`} className="middle-right-group" onChange={event => handleSelectValues(event, "damageType")}>
                                <option value="">Choose Damage Type</option>
                                {damageTypeList.map((damageType, index) => 
                                    <option key={`damage-type-${damageType}`} value={damageType}>{damageType}</option>
                                )}
                            </Form.Select>
                        </InputGroup>
                        <InputGroup.Text as="label" id={`${ariaLabel}-description`} className="middle-right-group middle-left-group">Description</InputGroup.Text>
                        <Form.Control as="textarea" className="bottom-left-group bottom-right-group" aria-labelledby={`${ariaLabel}-description`} placeholder="Description" value={defaultValues.description} onChange={event => handleSelectValues(event, "description")}/>
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