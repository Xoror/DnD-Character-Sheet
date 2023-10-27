import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from "react-bootstrap/Modal";
import { useFocus } from "../../components/CustomHooks";

export const ActionsAdd = (props) => {
    //these are only initialized like this for a visual of the necessary props
    const editing = props.editing === undefined ? false : props.editing
    const setEditing = props.setEditing
    const defaultValues = props.defaultValues
    const setDefaultValues = props.setDefaultValues
    let spells = props.spells === undefined ? false : props.spells
    const actionTemplate = props.actionTemplate
    const handleSubmit = props.handleSubmit
    const handleSelectValues = props.handleSelectValues
    const options = props.options
    const show = props.show
    const setShow = props.setShow

    //this is the reference used to position a tooltip when a dupilcate name is entered
    const inputNameRef = props.inputRef
    const [inputDamageRef, setInputDamageFocus] = useFocus()
    const [showDamageTooltip, setShowDamageTooltip] = useState(false)
    const [damageTest, setDamageTest] = useState(defaultValues.damage)

    //This variable is for accessibility only, used to differentiate between actions and spells in aria-labels
    let ariaLabel = spells ? "spell":"action"
    
    const attributesList = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma", "None"]
    const schoolList = ["Abjuration", "Conjuration", "Divination", "Enchantment","Evocation", "Illusion", "Necromancy", "Transmutation"]
    const damageTypeList = ["Bludgeoning", "Slashing", "Piercing", "Heal", "Cold", "Lightning", "Thunder", "Acid", "Poison", "Necrotic", "Radiant", "Psychic", "Force", "Special", "None"]
    const componentsList = [["V"], ["S"], ["M"], ["V", "S"], ["V", "M"], ["S", "M"], ["V", "S", "M"]]
    const cancelEditing = (event) => {
        setEditing(false)
        setDefaultValues(actionTemplate)
    }
    
    const checkIfDice = (stringToCheck) => {
        let isDice
        if(stringToCheck.includes("d")) {
            let split = stringToCheck.split("d")
            let firstPart = isNaN(parseInt(split[0]))
            let secondPart = isNaN(parseInt(split[1]))
            isDice = !firstPart && !secondPart
        }
        else {
            isDice = !isNaN(parseInt(stringToCheck))
        }
        return isDice
    }
    const damageValidation = (damage) => {
        if(damage === "none" || damage === "None" || damage === "") {
            return true
        }
        else if (damage.includes("d")) {
            let test = damage.split("+")
            let expressionOne = checkIfDice(test[0])
            let expressionTwo = true
            if(test[2] != undefined) {
                expressionTwo = checkIfDice(test[1])
            }
            test = expressionOne && expressionTwo
            return test
        }
        else if(!isNaN(parseInt(damage))) {
            return true
        }
        else {
            return false
        }
    }
    const handleDamageChange = (event) => {
        setDamageTest(event.target.value)
        handleSelectValues(event.target.value, "damage")
    }
    useEffect(() => {
        if(spells) {
            if(defaultValues.duration === undefined) {
                setDefaultValues(actionTemplate)
            }
        }
        else if(defaultValues.isProficient === undefined) {
            setDefaultValues(actionTemplate)
        }
    }, [defaultValues, setDefaultValues, actionTemplate])
    useEffect(() => {
        if(editing) {
            if(!damageValidation(damageTest)) {
                setShowDamageTooltip(true)
            }
            else {
                handleSelectValues(damageTest, "damage")
                setShowDamageTooltip(false)
            }
        }
    }, [damageTest])
    useEffect(() => {
        setDamageTest(defaultValues.damage)
    }, [defaultValues.damage])
    const preValidate= (event) => {
        event.preventDefault()
        if(damageValidation(damageTest)) {
            handleSubmit(event)
        }
        else {
            setInputDamageFocus()
        }
    }
    const addActionForm = useCallback((modal, defaultValues) => {
        return (
            <Form id="action-add-form" aria-label={`${editing ? "edit":"add-new"}-${ariaLabel}-form`} onSubmit={preValidate}>
                <Modal.Body>
                    <InputGroup>
                        <FloatingLabel ref={inputNameRef} controlId={`${ariaLabel}-name-${modal? "modal":"quick"}`} label="Name">
                            <Form.Control onFocus={event => setShow(true)} onBlur={event => setShow(false)} aria-labelledby={`${ariaLabel}-name`} required value={defaultValues.name} className={`${modal ? "top":"middle"}-left-group`} placeholder="" onChange={event => handleSelectValues(event, "name")}/>
                        </FloatingLabel>
                        <Overlay target={inputNameRef.current} show={show} placement="top-end" flip>
                            <Tooltip id="unique-name-overlay" style={{opacity:"1"}}>
                                Please enter unique Name.
                            </Tooltip>
                        </Overlay>

                        <FloatingLabel controlId={`${ariaLabel}-range`} label="Range">
                            <Form.Control required value={defaultValues.range} placeholder="" aria-labelledby={`${ariaLabel}-range`} onChange={event => handleSelectValues(event, "range")}/>
                        </FloatingLabel>

                        <FloatingLabel ref={inputDamageRef} controlId={`${ariaLabel}-damage-${modal? "modal":"quick"}`} label="Damage">
                            <Form.Control onFocus={event => setShowDamageTooltip(true)} onBlur={event => setShowDamageTooltip(false)} required value={damageTest} className={`${modal ? "top":"middle"}-right-group`} placeholder="" aria-labelledby={`${ariaLabel}-damage`} onChange={event => handleDamageChange(event)}/>
                        </FloatingLabel>
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
                        <FloatingLabel controlId={`${ariaLabel}-${spells ? "tier":"type"}`} label={`${spells ? "Tier":"Type"}`}>
                            <Form.Select required value={defaultValues.type} className="middle-left-group" aria-labelledby={`${ariaLabel}-${spells ? "tier":"type"}`} onChange={event => handleSelectValues(event, "type")}>
                                {!spells ? 
                                    <option key="0" value="">Choose Action Type</option>
                                        :
                                    <option key="0" value="">Choose Spell Tier</option>}
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
                    {spells && defaultValues.duration != undefined ?
                    <>
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
                        <InputGroup>
                            <FloatingLabel controlId={`${ariaLabel}-casting-time`} label="Casting time">
                                <Form.Control required type="text" value={defaultValues.castingTime} className="middle-left-group" placeholder="" aria-labelledby={`${ariaLabel}-casting-time`} onChange={event => handleSelectValues(event, "castingTime")}/>
                            </FloatingLabel>
                            <FloatingLabel controlId={`${ariaLabel}-duration`} label="Duration">
                                <Form.Control required type="text" value={defaultValues.duration[0]} placeholder="" aria-labelledby={`${ariaLabel}-duration`} onChange={event => handleSelectValues(event, "duration_0")}/>
                            </FloatingLabel>
                            <FloatingLabel controlId={`${ariaLabel}-concentration`} label="Concentration?">
                                <Form.Select required value={defaultValues.duration[1]} className="middle-right-group" type="boolean" aria-labelledby={`${ariaLabel}-concentration`} onChange={event => handleSelectValues(event, "duration_1")}>
                                    <option value=""> Requires concentration? </option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </Form.Select>
                            </FloatingLabel>
                        </InputGroup>
                    </>
                    : null}
                    <InputGroup>
                        {spells && defaultValues.duration != undefined ? 
                            <FloatingLabel controlId={`${ariaLabel}-components`} label="Components">
                                <Form.Select required value={defaultValues.components} className="middle-left-group" type="text" aria-labelledby={`${ariaLabel}-components`} onChange={event => handleSelectValues(event, "components")}> 
                                    <option value="">Choose components</option>
                                    {componentsList.map((component, index) => 
                                        <option key={`component-choice-${component}`} value={component}>{component}</option>
                                    )}
                                </Form.Select> 
                            </FloatingLabel> : 
                            <FloatingLabel controlId={`${ariaLabel}-is-proficient`} label="Is Proficient?">
                                <Form.Select required value={defaultValues.isProficient} className="middle-left-group" type="boolean" aria-labelledby={`${ariaLabel}-is-proficient`} onChange={event => handleSelectValues(event, "isProficient")}> 
                                    <option value="">Choose if proficient</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </Form.Select> 
                            </FloatingLabel>
                        }
                        <FloatingLabel controlId={`${ariaLabel}-damage-type`} label="Damage Type">
                            <Form.Select required value={defaultValues.damageType} className="middle-right-group" aria-labelledby={`${ariaLabel}-damage-type`} onChange={event => handleSelectValues(event, "damageType")}>
                                <option value="">Choose Damage Type</option>
                                {damageTypeList.map((damageType, index) => 
                                    <option key={`damage-type-${damageType}`} value={damageType}>{damageType}</option>
                                )}
                            </Form.Select>
                        </FloatingLabel>
                        {!modal ? <Button variant="success" className="middle-right-group" aria-label="Submit" type="submit">Submit</Button>:null}
                    </InputGroup>
                    <FloatingLabel controlId={`${ariaLabel}-description`} label="Description">
                        <Form.Control as="textarea" className={spells && defaultValues.duration != undefined ? "middle-left-group":"bottom-left-group bottom-right-group"} style={{height:"8em"}} aria-label="description" placeholder="" value={defaultValues.description[0]} onChange={event => handleSelectValues(event, "description_0")}/>
                    </FloatingLabel>
                    {spells && defaultValues.duration != undefined ?
                        <FloatingLabel controlId={`${ariaLabel}-description-at-higher-level`} label="At higher level">
                            <Form.Control as="textarea" className="bottom-left-group bottom-right-group" style={{height:"8em"}} aria-label="at higher level" placeholder="" value={defaultValues.description[1]} onChange={event => handleSelectValues(event, "description_1")}/>
                        </FloatingLabel> : null
                    }
                </Modal.Body>
                {modal ? <Modal.Footer>
                    <Button variant="danger" onClick={() => props.setShowAddAction(false)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer> : null}
            </Form>
        )   
    }, [ariaLabel, attributesList, componentsList, damageTest, damageTypeList, editing, handleDamageChange, handleSelectValues, inputDamageRef, inputNameRef, options, preValidate, schoolList, show, showDamageTooltip, spells])
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
    return(
        <>
            <div aria-labelledby={`${editing ? "edit":"add-new"}-${ariaLabel}`} className={props.showQuickAddAction ? null:"visually-hidden"}>
                <InputGroup>
                    <InputGroup.Text as="label" id={`${editing ? "edit":"add-new"}-${ariaLabel}`} className="top-left-group top-right-group" style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : (spells ? "Add New Spell" : "Add New Action/Bonus Action/etc:") } </InputGroup.Text>
                    {editing ? <Button onClick={cancelEditing}>Cancel</Button> : "" }
                </InputGroup>
                {addActionForm(false, defaultValues)}
            </div>
            <Modal backdrop="static" aria-labelledby={`add-new-${ariaLabel}-dialog`} contentClassName="modal-custom" size="lg" show={props.showAddAction} onHide={() => props.setShowAddAction(false)}>
                <Modal.Header closeButton>
					<Modal.Title as="label" id={`add-new-${ariaLabel}-dialog`}>
						Adding a new {spells ? "Spell":"Action"}
					</Modal.Title>
				</Modal.Header>
                {addActionForm(true, defaultValues)}
            </Modal>
        </>
    )
}