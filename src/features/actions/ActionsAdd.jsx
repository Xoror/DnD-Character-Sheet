import React from "react";

//import Button from 'react-bootstrap/Button';
import Button from '../../BootstrapReplace/CustomButton';
//import Form from 'react-bootstrap/Form';
import Form from "../../BootstrapReplace/Form";
//import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FloatingLabel from "../../BootstrapReplace/FloatingLabel";
//import InputGroup from 'react-bootstrap/InputGroup';
import InputGroup from "../../BootstrapReplace/InputGroup";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
//import Modal from "react-bootstrap/Modal";
import Modal from '../../BootstrapReplace/Modal';

import { ActionsAddForm } from "./ActionsAddForm";

export const ActionsAdd = (props) => {
    //these are only initialized like this for a visual of the necessary props
    const editing = props.editing === undefined ? false : props.editing
    const setEditing = props.setEditing
    const defaultValues = props.defaultValues
    const setDefaultValues = props.setDefaultValues
    let spells = props.spells === undefined ? false : props.spells
    const actionTemplate = props.actionTemplate

    //This variable is for accessibility only, used to differentiate between actions and spells in aria-labels
    let ariaLabel = spells ? "spell":"action"
    
    const cancelEditing = (event) => {
        setEditing(false)
        setDefaultValues(actionTemplate)
    }
    
    return(
        <>
            <div aria-labelledby={`${editing ? "edit":"add-new"}-${ariaLabel}`} className={props.showQuickAddAction ? null:"visually-hidden"}>
                <InputGroup>
                    <InputGroup.Text as="label" id={`${editing ? "edit":"add-new"}-${ariaLabel}`} className="top-left-group top-right-group" style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : (spells ? "Add New Spell" : "Add New Action/Bonus Action/etc:") } </InputGroup.Text>
                    {editing ? <Button onClick={cancelEditing}>Cancel</Button> : "" }
                </InputGroup>
                <ActionsAddForm modal={false} ariaLabel={ariaLabel} inputRef={props.inputRef} setInputFocus={props.setInputFocus} {...props} />
            </div>
            <Modal backdrop="static" aria-labelledby={`add-new-${ariaLabel}-dialog`} size="lg" show={props.showAddAction} onHide={() => props.setShowAddAction(false)}>
                <Modal.Header closeButton>
					<Modal.Title as="label" id={`add-new-${ariaLabel}-dialog`}>
						Adding a new {spells ? "Spell":"Action"}
					</Modal.Title>
				</Modal.Header>
                <ActionsAddForm modal={true} ariaLabel={ariaLabel} inputRef={props.inputModalRef} setInputFocus={props.setInputModalFocus} {...props} />
            </Modal>
        </>
    )
}

/*
    const addActionFormProperLabel = () => {
        return(
            <Form aria-labelledby={`add-new-${ariaLabel}-dialog`} onSubmit={handleSubmit}>
                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Text as="label" id={`add-new-${ariaLabel}`} className="top-left-group top-right-group" style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : (spells ? "Add New Spell" : "Add New Action/Bonus Action/etc:") } </InputGroup.Text>
                        {editing ? <Button onClick={() => (setEditing(false), setDefaultValues(actionTemplate))}>Cancel</Button> : "" }
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text as="label" id={`${ariaLabel}-name`} className="middle-left-group">Name</InputGroup.Text>
                        <Form.Control autoFocus aria-labelledby={`${ariaLabel}-name`} ref={inputNameRef} required value={defaultValues.name} className="middle-left-group" placeholder="Name" aria-label="Name" onChange={event => handleSelectValues(event, "name")}/>
                        <Overlay target={inputNameRef.current} show={show} placement="top">
                            <Tooltip id="overlay-example">
                                Please enter unique Name.
                            </Tooltip>
                        </Overlay>
                        <InputGroup.Text as="label" id={`${ariaLabel}-range`}>Range</InputGroup.Text>
                        <Form.Control aria-labelledby={`${ariaLabel}-range`} required value={defaultValues.range} placeholder="Range" aria-label="Range"  onChange={event => handleSelectValues(event, "range")}/>
                        <InputGroup.Text as="label" id={`${ariaLabel}-damage`}>Damage</InputGroup.Text>
                        <Form.Control required value={damageTest} ref={inputDamageRef} className="middle-right-group" placeholder="Damage" aria-labelledby={`${ariaLabel}-damage`} onChange={event => handleDamageChange(event)}/>
                        <Overlay target={inputDamageRef.current} show={showDamageTooltip} placement="top-end" flip>
                            <Tooltip id="damage-layout-overlay" style={{opacity:"1"}}>
                                Damage must have form of either
                                <ul>
                                    <li> {"<number>d<number>, e.g 2d8, 1d20"} </li>
                                    <li> {"A single integer, e.g 20 or 4"} </li>
                                    <li>{"A combination of the two, joing by a "+", e.g 1d4 + 1, 2d4 + 2d8, 20 + 5d10"}</li>
                                    <li>{'"None" or "none" if the action/spell has no damage component'}</li>
                                </ul>
                            </Tooltip>
                        </Overlay>
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
                    <Form.Control as="textarea" className="middle-left-group middle-right-group" aria-labelledby={`${ariaLabel}-description`} placeholder="Description" value={defaultValues.description[0]} onChange={event => handleSelectValues(event, "description_0")}/>
                    {spells ?
                        <>
                            <InputGroup.Text as="label" id={`${ariaLabel}-description-at-higher-level`} className="middle-right-group middle-left-group">At higher level:</InputGroup.Text>
                            <Form.Control as="textarea" className="bottom-left-group bottom-right-group" style={{height:"8em"}} aria-labelledby={`${ariaLabel}-description-at-higher-level`} placeholder="At higher level" value={defaultValues.description[1]} onChange={event => handleSelectValues(event, "description_1")}/>
                        </> : null
                    }
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
        )
    }
    */
    