import React, { useState, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Card from 'react-bootstrap/Card';

import "../styles.css"

import { ActionsTable } from "./ActionsTable"
import { addAction, editAction } from './ActionsSlice';
import { ActionsAdd } from './ActionsAdd';
import { SpellList } from '../spells/SpellList';

var isEqualsJson = (obj1,obj2)=>{
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    //return true when the two json has same length and all the properties has same value key by key
    return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]==obj2[key]);
}

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}
export const ActionsBox = (props) => {
	const dispatch = useDispatch()
	var actionTemplate = props.id === "Spells" ? 
		{
			showCard:false,
			filtered:true, 
			id: "", 
			name: "", 
			range: "", 
			damage: "", 
			type: "", 
			scaling: "", 
			isPrepared: false, 
			damageType: "", 
			description: "", 
			school: "", 
			ritual: "", 
			classes: "", 
			components: "",
			duration: "", 
			castingTime: ""
		}
		: 
		{id: "", name: "", range: "", damage: "", type: "", scaling: "", isProficient: "", damageType: "", description: ""}
	const actions = useSelector(state => state.actions.actions)
	const sortedSpellList = useSelector(state => state.actions.sortedSpellList)


	const [defaultValues, setDefaultValues] = useState(actionTemplate)
	const [oldData, setOldData] = useState({})
	const [editing, setEditing] = useState(false)
	const [show, setShow] = useState(false);
	const [spellCardID, setSpellCardID] = useState("0")
	const [inputRef, setInputFocus] = useFocus()

	//could maybe be more efficient?
	const handleSubmit = (event) => {
		event.preventDefault()
		var data = defaultValues
		var sameName = false
		if(editing) {
			if (!isEqualsJson(data, oldData)) {
				data.id = oldData.id
				dispatch(editAction(data, props.id))
				setEditing(false)
			}
			else {
				setEditing(false)
			}
		}
		else {
			if(actions.filter(action => {return action.name === event.target[0].value}).length != 0 || sortedSpellList.filter(action => {return action.name === event.target[0].value}).length != 0) {
				event.stopPropagation()
				setShow(true)
				setInputFocus()
				sameName = true
			}
			else {
				dispatch(addAction(data, props.id))
			}
		}
		if(!sameName) {
			setDefaultValues(actionTemplate)
			setShow(false)
		}
	}
	const handleSelectValues = (event, id) => {
		let copy = structuredClone(defaultValues)
		copy[id] = event.target.value
		setDefaultValues(copy)
	}
	//<FloatingLabel label="Name" style={{color:"black"}}>
	return (
		<Card bg="secondary" id="ActionsPart">
			{props.headers.map((header, index) => (
				<ActionsTable 
					spellCardID={spellCardID}
					setSpellCardID={setSpellCardID}
					setOldData={setOldData} 
					setEditing={setEditing} 
					passState={setDefaultValues} 
					offCanvas={props.offCanvas} 
					id={props.id} 
					key={index} 
					header={header} 
					bodies={props.actions.filter((action) => {return action.type === header})} 
					spells={props.spells}
				/>
			))}
			{props.id === "Spells" ? <SpellList offCanvas={props.offCanvas} /> : "" }
			<ActionsAdd show={show} editing={editing} setEditing={setEditing} defaultValues={defaultValues} setDefaultValues={setDefaultValues} inputRef={inputRef} spells={props.spells} actionTemplate={actionTemplate} handleSubmit={handleSubmit} handleSelectValues={handleSelectValues} options={props.options}/>
		</Card>
	)
}