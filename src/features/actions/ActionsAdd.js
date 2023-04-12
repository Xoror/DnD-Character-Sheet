import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

export const ActionsAdd = (props) => {
    const editing = props.editing === undefined ? false : props.editing
    const setEditing = props.setEditing
    const defaultValues = props.defaultValues
    const setDefaultValues = props.setDefaultValues
    const inputRef = props.inputRef

    var spells = props.spells
    const actionTemplate = props.actionTemplate
    const handleSubmit = props.handleSubmit
    const handleSelectValues = props.handleSelectValues
    const options = props.options
    const show = props.show
    const schoolList = ["Abjuration", "Conjuration", "Divination", "Enchantment","Evocation", "Illusion", "Necromancy", "Transmutation"]
    return(
        <>
            <InputGroup>
                <InputGroup.Text style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : (spells ? "Add New Spell" : "Add New Action/Bonus Action/etc:") } </InputGroup.Text>
                {editing ? <Button onClick={() => (setEditing(false), setDefaultValues(actionTemplate))}>Cancel</Button> : "" }
            </InputGroup>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    
                        <Form.Control ref={inputRef} required value={defaultValues.name} placeholder="Name" aria-label="Name"onChange={event => handleSelectValues(event, "name")}/>
                    
                    <Overlay target={inputRef.current} show={show} placement="top">
                        <Tooltip id="overlay-example">
                            Please enter unique Name.
                        </Tooltip>
                    </Overlay>
                    <Form.Control required value={defaultValues.range} placeholder="Range" aria-label="Range" aria-describedby="range" onChange={event => handleSelectValues(event, "range")}/>
                    <Form.Control required value={defaultValues.damage} placeholder="Damage" aria-label="damage-dice" aria-describedby="damage-dice" onChange={event => handleSelectValues(event, "damage")}/>
                </InputGroup>
                <InputGroup>
                    <Form.Select required value={defaultValues.type} aria-label="action-type-select" onChange={event => handleSelectValues(event, "type")}>
                        {!spells ? <option key="0" value="">Choose Action Type</option>:<option key="0" value="">Choose Spell Tier</option>}
                        {options.map((option1, index) => 
                            <option key={index+1} value={option1}>{option1}</option>
                        )}
                    </Form.Select>
                    <Form.Select required value={defaultValues.scaling} aria-label="scaling-attribute" onChange={event => handleSelectValues(event, "scaling")}>
                        <option value="">Choose Scaling Attribute</option>
                        <option value="Strength">Strength</option>
                        <option value="Dexterity">Dexterity</option>
                        <option value="Constitution">Constitution</option>
                        <option value="Intelligence">Intelligence</option>
                        <option value="Wisdom">Wisdom</option>
                        <option value="Charisma">Charisma</option>
                        <option value="None">None</option>
                    </Form.Select>
                </InputGroup>
                {spells ?
                <InputGroup>
                    <Form.Select required value={defaultValues.school} aria-label="spell-school" onChange={event => handleSelectValues(event, "school")}>
                        <option value="">Choose school</option>
                        {schoolList.map((school, index) => (
                            <option key={`spell-shool-${index}`} value={school}>{school}</option>
                        ))}
                    </Form.Select>
                    <Form.Select required value={defaultValues.ritual} type="boolean" aria-label="is-ritual" onChange={event => handleSelectValues(event, "ritual")}>
                        <option value=""> Is ritual? </option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </Form.Select>
                </InputGroup>
                : ""}
                <InputGroup>
                    {spells ? 
                    ""
                    : <Form.Select required value={defaultValues.isProficient} type="boolean" aria-label="is-proficient" onChange={event => handleSelectValues(event, "isProficient")}> 
                        <option value="">Is proficient?</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </Form.Select> }
                    <Form.Select required value={defaultValues.damageType} aria-label="damage-type" onChange={event => handleSelectValues(event, "damageType")}>
                        <option value="">Choose Damage Type</option>
                        <option value="Bludgeoning">Bludgeoning</option>
                        <option value="Slashing">Slashing</option>
                        <option value="Piercing">Piercing</option>
                        <option value="Fire">Fire</option>
                        <option value="Cold">Cold</option>
                        <option value="Lightning">Lightning</option>
                        <option value="Thunder">Thunder</option>
                        <option value="Acid">Acid</option>
                        <option value="Poison">Poison</option>
                        <option value="Necrotic">Necrotic</option>
                        <option value="Radiant">Radiant</option>
                        <option value="Psychic">Psychic</option>
                        <option value="Force">Force</option>
                    </Form.Select>
                    <Button variant="success" aria-label="submit" type="submit">Submit</Button>
                </InputGroup>
                <Form.Control as="textarea" aria-label="description" placeholder="Description" value={defaultValues.description} onChange={event => handleSelectValues(event, "description")}/>
            </Form>
        </>
    )
}