import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";

import Button from '../../BootstrapReplace/CustomButton';
import Form from "../../BootstrapReplace/Form";
import FloatingLabel from "../../BootstrapReplace/FloatingLabel";
import InputGroup from "../../BootstrapReplace/InputGroup";
import Modal from '../../BootstrapReplace/Modal';

import { FormValidationInfo } from "../../components/FormValidationInfo";
import { useFocus } from "../../components/CustomHooks";

export const ActionsAddForm = ({modal, ariaLabel, inputRef, setInputFocus,   ...props}) => {
    //these are only initialized like this for a visual of the necessary props
    const editing = props.editing === undefined ? false : props.editing
    const defaultValues = props.defaultValues
    const setDefaultValues = props.setDefaultValues
    const spells = props.spells === undefined ? false : props.spells
    const actionTemplate = props.actionTemplate
    const handleSubmit = props.handleSubmit
    const handleFormValueChange = props.handleFormValueChange
    const options = props.options


    const attributesList = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma", "None"]
    const schoolList = ["Abjuration", "Conjuration", "Divination", "Enchantment","Evocation", "Illusion", "Necromancy", "Transmutation"]
    const damageTypeList = ["Bludgeoning", "Slashing", "Piercing", "Heal", "Cold", "Lightning", "Thunder", "Acid", "Poison", "Necrotic", "Radiant", "Psychic", "Force", "Special", "None"]
    const componentsList = [["V"], ["S"], ["M"], ["V", "S"], ["V", "M"], ["S", "M"], ["V", "S", "M"]]

    //this is the reference used to position a tooltip when a dupilcate name is entered
    const inputNameRef = inputRef

    const [inputDamageRef, setInputDamageFocus] = useFocus()
    const [validated, setValidated] = useState({name: true, damage: true, both: true})

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

    const nameValidation = (name) => {
        let actionValidation = props.actionNames.find(action => {return action.name === name}) === undefined
        let spellValidation = props.spellNames.find(action => {return action.name === name}) === undefined

        return spellValidation && actionValidation
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

    const preValidate= (event) => {
        event.preventDefault()

        let damageValidated = damageValidation(event.target[2].value)
        let nameValidated = nameValidation(event.target[0].value)
        setValidated(
            (prev) => ({
                ...prev,
                both: damageValidated && nameValidated,
                damage: damageValidated,
                name: nameValidated
        }))
        if(damageValidated && nameValidated) {
            handleSubmit(event)
            return 
        }
        if(!damageValidated) {
            setInputDamageFocus()
        }
        if(!nameValidated) {
            setInputFocus()
        }
    }
    
    return (
        <Form id="action-add-form" aria-label={`${editing ? "edit":"add-new"}-${ariaLabel}-form`} onSubmit={preValidate}>
            <Modal.Body>
                <FormValidationInfo variant={validated.both ? "success":"danger"}>
                    {!validated.name ? 
                        <p>Please enter unique Name.</p> : null
                    }
                    {!validated.damage ?
                        <>
                            <span>Damage must have form of either:</span>
                            <ul>
                                <li> {"<number>d<number>, e.g 2d8, 1d20"} </li>
                                <li> {"A single integer, e.g 20 or 4"} </li>
                                <li>{"A combination of the two, joing by a "+", e.g 1d4 + 1, 2d4 + 2d8, 20 + 5d10"}</li>
                                <li>{'"None" or "none" if the action/spell has no damage component'}</li>
                            </ul>
                        </> : null
                    }
                </FormValidationInfo>
                <InputGroup>
                    <FloatingLabel ref={inputNameRef} controlId={`${ariaLabel}-name-${modal? "modal":"quick"}`} label="Name">
                        <Form.Control required value={defaultValues.name} className={`${modal ? "top":"middle"}-left-group`} placeholder="" onChange={event => handleFormValueChange(event, "name")}/>
                    </FloatingLabel>

                    <FloatingLabel controlId={`${ariaLabel}-range-${modal? "modal":"quick"}`} label="Range">
                        <Form.Control required value={defaultValues.range} placeholder="" onChange={event => handleFormValueChange(event, "range")}/>
                    </FloatingLabel>

                    <FloatingLabel ref={inputDamageRef} controlId={`${ariaLabel}-damage-${modal? "modal":"quick"}`} label="Damage">
                        <Form.Control required value={defaultValues.damage} className={`${modal ? "top":"middle"}-right-group`} placeholder="" onChange={event => handleFormValueChange(event, "damage")}/>
                    </FloatingLabel>
                </InputGroup>
                <InputGroup>
                    <FloatingLabel controlId={`${ariaLabel}-${spells ? "tier":"type"}-${modal? "modal":"quick"}`} label={`${spells ? "Tier":"Type"}`}>
                        <Form.Select required value={defaultValues.type} className="middle-left-group" onChange={event => handleFormValueChange(event, "type")}>
                            {!spells ? 
                                <option key="0" value="">Choose Action Type</option>
                                    :
                                <option key="0" value="">Choose Spell Tier</option>}
                            {options.map((option1, index) => 
                                <option key={`action-type-${option1}`} value={option1}>{option1}</option>
                            )}
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel controlId={`${ariaLabel}-scaling-attribute-${modal? "modal":"quick"}`} label="Scaling Attribute">
                        <Form.Select required value={defaultValues.scaling} className="middle-right-group" onChange={event => handleFormValueChange(event, "scaling")}>
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
                        <FloatingLabel controlId={`${ariaLabel}-school-${modal? "modal":"quick"}`} label="School">
                            <Form.Select required value={defaultValues.school} className="middle-left-group" onChange={event => handleFormValueChange(event, "school")}>
                                <option value="">Choose school</option>
                                {schoolList.map((school, index) => (
                                    <option key={`spell-shool-${school}`} value={school}>{school}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId={`${ariaLabel}-is-ritual-${modal? "modal":"quick"}`} label="Is Ritual?">
                            <Form.Select required value={defaultValues.ritual} className="middle-right-group" type="boolean" onChange={event => handleFormValueChange(event, "ritual")}>
                                <option value=""> Choose is ritual </option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Form.Select>
                        </FloatingLabel>
                    </InputGroup>
                    <InputGroup>
                        <FloatingLabel controlId={`${ariaLabel}-casting-time-${modal? "modal":"quick"}`} label="Casting time">
                            <Form.Control required type="text" value={defaultValues.castingTime} className="middle-left-group" placeholder="" onChange={event => handleFormValueChange(event, "castingTime")}/>
                        </FloatingLabel>
                        <FloatingLabel controlId={`${ariaLabel}-duration-${modal? "modal":"quick"}`} label="Duration">
                            <Form.Control required type="text" value={defaultValues.duration[0]} placeholder="" onChange={event => handleFormValueChange(event, "duration_0")}/>
                        </FloatingLabel>
                        <FloatingLabel controlId={`${ariaLabel}-concentration-${modal? "modal":"quick"}`} label="Concentration?">
                            <Form.Select required value={defaultValues.duration[1]} className="middle-right-group" type="boolean" onChange={event => handleFormValueChange(event, "duration_1")}>
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
                        <FloatingLabel controlId={`${ariaLabel}-components-${modal? "modal":"quick"}`} label="Components">
                            <Form.Select required value={defaultValues.components} className="middle-left-group" type="text" onChange={event => handleFormValueChange(event, "components")}> 
                                <option value="">Choose components</option>
                                {componentsList.map((component, index) => 
                                    <option key={`component-choice-${component}`} value={component}>{component}</option>
                                )}
                            </Form.Select> 
                        </FloatingLabel> : 
                        <FloatingLabel controlId={`${ariaLabel}-is-proficient-${modal? "modal":"quick"}`} label="Is Proficient?">
                            <Form.Select required value={defaultValues.isProficient} className="middle-left-group" type="boolean" onChange={event => handleFormValueChange(event, "isProficient")}> 
                                <option value="">Choose if proficient</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Form.Select> 
                        </FloatingLabel>
                    }
                    <FloatingLabel controlId={`${ariaLabel}-damage-type-${modal? "modal":"quick"}`} label="Damage Type">
                        <Form.Select required value={defaultValues.damageType} className="middle-right-group" onChange={event => handleFormValueChange(event, "damageType")}>
                            <option value="">Choose Damage Type</option>
                            {damageTypeList.map((damageType, index) => 
                                <option key={`damage-type-${damageType}`} value={damageType}>{damageType}</option>
                            )}
                        </Form.Select>
                    </FloatingLabel>
                    {!modal ? <Button variant="success" className="middle-right-group" type="submit">Submit</Button>:null}
                </InputGroup>
                <FloatingLabel controlId={`${ariaLabel}-description-${modal? "modal":"quick"}`} label="Description">
                    <Form.Control as="textarea" className={spells && defaultValues.duration != undefined ? "middle-left-group middle-right-group":"bottom-left-group bottom-right-group"} style={{height:"8em"}} placeholder="" value={defaultValues.description[0]} onChange={event => handleFormValueChange(event, "description_0")}/>
                </FloatingLabel>
                {spells && defaultValues.duration != undefined ?
                    <FloatingLabel controlId={`${ariaLabel}-description-at-higher-level-${modal? "modal":"quick"}`} label="At higher level">
                        <Form.Control as="textarea" className="bottom-left-group bottom-right-group" style={{height:"8em"}} placeholder="" value={defaultValues.description[1]} onChange={event => handleFormValueChange(event, "description_1")}/>
                    </FloatingLabel> : null
                }
            </Modal.Body>
            {modal ? <Modal.Footer>
                <Button variant="danger" type="button" onClick={() => props.setShowAddAction(false)}>
                    Close
                </Button>
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Modal.Footer> : null}
        </Form>
    )
}