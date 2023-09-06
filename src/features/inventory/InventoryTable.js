import React, { useState, useEffect} from 'react';
import { useDispatch } from "react-redux"

import Table from 'react-bootstrap/Table';
import { usePopper } from 'react-popper';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { AiFillCloseSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";

import { deleteItem, equipItem, addItem, editContainer, deleteContainer } from './InventorySlice';
import { ItemCard } from '../../components/ItemCard';

export const InventoryTable = (props) => {
    const dispatch = useDispatch()

	const handleKeyUp = (event, body) => {
		if(event.code === "Space" || event.code === "Enter") {
			event.preventDefault()
			if(event.target.id === "edit-button") {
				startEdit(event, body)
			}
			else {
				handleDelete(event, body)
			}
		}
	}

	const [currentItem, setCurrentItem] = useState(
		{
			filtered:true, 
			id: "", 
			name: "Loading...", 
			container: "",
			category: "",
			qty: "", 
			worth: "", 
			weight: "", 
			isEquipped: "",
			rarity: "",
			attunable: "",
			attuned: "",
			attuneRequirement: "",
			description: []
		}
	)
	const [addItemCounter, setAddItemCounter] = useState(1)
	const offCanvas = props.offCanvas === undefined ? false : true

	const fetchItem = async (body) => {

        const response = await fetch('https://www.dnd5eapi.co'+body.url)
        if (!response.ok) {
            console.log('Data coud not be fetched!')
        } else {
            return response.json()
        }
    }
	const saveItem = (item, id, add = "") => {
		let temp = {}
		if (props.header === "Mundane Items") {
			temp["id"] = id
			temp["name"] = item.name
			temp["qty"] = item.quantity === undefined ? 1 : item.quantity
			if(item.cost.unit === "gp") {
				temp["worth"] = item.cost.quantity
			}
			else if(item.cost.unit === "sp") {
				temp["worth"] = item.cost.quantity/10
			}
			else if(item.cost.unit === "cp") {
				temp["worth"] = item.cost.quantity/100
			}
			temp["weight"] = item.weight != undefined ? item.weight : 0
			temp["rarity"] = "Mundane"
			temp["attunable"] = false
			temp["description"] = item.desc
			if(item.equipment_category.index === "equipment-packs") {
				temp["category"] = "Other"
			}
			else if(item.equipment_category.index === "kits") {
				temp["category"] = "Other"
			}
			else if(item.equipment_category.index === "weapon") {
				temp["category"] = item.weapon_category + " " + item.weapon_range + " Weapon";
			}
			else if(item.equipment_category.index === "armor") {
				temp["category"] = item.armor_category === "Shield" ? "Shield" : item.armor_category + " Armor";
			}

			else if(item.equipment_category.index === "mounts-and-vehicles") {
				if(item.vehicle_category === "mounts-and-other-animals") {
					temp["category"] = "Vehicle (Land)";
				}
				else if(item.vehicle_category === "Waterborne Vehicles") {
					temp["category"] = "Vehicle (Water)";
				}
				else {
					temp["category"] = "Vehicle (Land)";
				}
			  }

			else if(item.equipment_category.index === "mounts-and-other-animals") {
				temp["category"] = "Other";
			}
			else if(item.equipment_category.index === "other-tools") {
				temp["category"] = "Other";
			}
			else if(item.equipment_category.index === "shields") {
				temp["category"] = "Shield";
			}
			else if(item.equipment_category.index === "tools") {
				if(item.tool_category === "Gaming Sets") {
					temp["category"] = "Gaming Set";
				}
				else if(item.tool_category === "Musical Instrument") {
					temp["category"] = "Instrument";
				}
				else {
					temp["category"] = item.tool_category;
				}
			  }
			else {
				temp["category"] = item.equipment_category.name
			}
			if(item.gear_category != undefined ? item.gear_category.name === "Ammunition" : false) {
				temp["category"] = "Ammunition";
			}
			if(item.gear_category != undefined ? item.gear_category.name === "Arcane Foci" : false) {
				temp["category"] = "Arcane Focus";
			}
			if(item.gear_category != undefined ? item.gear_category.name === "Druidic Foci" : false) {
				temp["category"] = "Druidic Focus";
			}
			if(item.gear_category != undefined ? item.gear_category.name === "Holy Symbols" : false) {
				temp["category"] = "Holy Symbol";
			}
		}
		else if (props.header === "Wondrous Items") {
			temp["id"] = id
			temp["name"] = item.name
			temp["qty"] = item.quantity === undefined ? 1 : item.quantity
			temp["worth"] = "-"
			temp["weight"] = "-"
			let descSplit = item.desc[0].split(",")
			let descSplitSpace = descSplit[1].split(" ")
			let paranthesisIndex1 = descSplit[1].indexOf("(")
			let paranthesisIndex2 = descSplit[1].indexOf(")")
			temp["rarity"] = item.rarity.name
			temp["attunable"] = item.desc[0].includes("requires attunement") ? true : false
			temp["attuneRequirement"] = !temp["attunable"] ? "bla" : descSplit[1].slice(paranthesisIndex1 + 1, paranthesisIndex2)
			temp["description"] = item.desc
			temp["category"] = "Wondrous Item"
		}
		setCurrentItem(temp)
		if(add === "addItemList") {
			temp["container"] = "equipment"
			temp["qty"] = addItemCounter
			if(temp["worth"] === "-") {
				temp["worth"] = 0
			}
			if(temp["weight"] === "-") {
				temp["weight"] = 0
			}
			dispatch(addItem(temp))
		}
	}
	
	const handleDelete = (event, id) => {
		//event.stopPropagation()
		dispatch(deleteItem(id))
	}
	const startEdit = (event, body) => {
		event.stopPropagation()
		props.setDefaultValues(body)
		props.setOldData(body)
		props.changeEditing(true)
		props.setInputFocus()
		props.inputRef.current.scrollIntoView()
	}
	const handleEquipped = (event, id) => {
		event.stopPropagation()
        let checked = event.target.checked
		dispatch(equipItem(id, checked))
	}

	let place = "right"
	let cardID = props.cardID
	const [showPopover, setShowPopover] = useState([false,cardID])
	useEffect(() => {
		if(showPopover[1] != cardID) {
			setShowPopover([showPopover[0], cardID])
		}
	}, [showPopover, cardID])
	
	const handleRowClick = (event, id) => {
		let test
		cardID = props.cardID
		fetchItem(props.bodies.find(body => body.id === id))
			.then((res) => {
				saveItem(res, id)
			})
			.catch((e) => {
				console.log(e.message)
			})
		/*
		if(showPopover=== "0") {
			setShowPopover([showPopover[0], id])
		}
		*/
		test = `inventory-table-row-id-${id}`
		setReferenceElement(document.getElementById(test))
		props.setCardID(id)
		cardID = id
		
		if(showPopover[1] === id) {
			setShowPopover([!showPopover[0], id])
		}
		else {

			if(showPopover[0]) {
				setShowPopover([showPopover[0], id])
				props.setCardID(id)
			}
			else {
				setShowPopover([!showPopover[0], id])
			}
		}
	}
	
	const handleCounter = (event, id) => {
		event.stopPropagation()
		if(id === "inc") {
			setAddItemCounter(addItemCounter + 1)
		}
		else if(id === "dec") {
			setAddItemCounter(addItemCounter - 1)
		}
		else {
			fetchItem(props.bodies.find(body => body.id === id))
			.then((res) => {
				saveItem(res, id, "addItemList")
			})
			.catch((e) => {
				console.log(e.message)
			})
		}
	}

	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const [arrowElement, setArrowElement] = useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: place,
    	modifiers: [{ name: 'arrow', options: { element: arrowElement } },
					{ name: "offset", options: { offset: [ 0,10]} }],
  	});
	let test = 0
	props.bodies.map(body => test += body.qty*body.weight)
	return (
		<div key={props.index} style={{marginLeft:"0.5em", marginRight:"0.5em"}}>
			<Table size="sm" style={{color:"white", border:"black"}}>
				{offCanvas ? 
					<thead>
						<tr style={{borderBottom:"0px hidden black"}}>
							<td> {props.header} </td>
							<td></td>
						</tr>
					</thead> : 
					(props.container.label === "Equipment" ? 
						<thead>
							<tr style={{borderBottom:"0px hidden black"}}>
								<td></td>
								<td> Name </td>
								<td> Qty </td>
								<td> Weight (lbs) </td>
								<td> Worth (gp) </td>
								<td></td>
							</tr>
						</thead> : 
						null
					)
				}
				<tbody>
					{offCanvas ? 
						<tr>
							<td> Name </td>
							<td> </td>
						</tr> :
						<tr>
							<td></td>
							<td><b>{props.container.label}</b></td>
							<td></td>
							<td> {test} </td>
							<td></td>
							{props.container.label != "Equipment" ? <td style={{ alignItems:"center", zIndex:"2" }}>
								<div style={{float:"right", marginTop:"2.5px"}}>
									<RiFileEditFill type="button" color="black" size="23" id="edit-button" /*onClick={(event) => startEdit(event, body)}*/ className="edit-button" /> 
									<AiFillCloseSquare type="button" color="#dc3545" size="23" id="delete-button" /*onClick={(event) => handleDelete(event, body.id)}*/ className="edit-button" style={{backgroundColor:"white", padding:"0px"}}/>
								</div>
							</td>: <td></td>}
						</tr>}
					{props.bodies.map( (body, index) => (
						<tr className="action-table" key={`inventory-table-row-id-${body.id === undefined ? index : body.id}`} id={`inventory-table-row-id-${body.id}`} onClick={(event) => handleRowClick(event, body.id)}>
							{offCanvas ? null : 
								<td style={{height:"1.5em", width:"1.5em", zIndex:"2"}}>
									<div className="checkbox-wrapper letter-k">
										<input type="checkbox" id={body.name} value="prepared"  onClick={(event) => handleEquipped(event, body.id)} defaultChecked={body.isEquipped}></input>
									</div>
								</td>
							}
							{ offCanvas ? 
								<>
									<td>
										{body.name}
										{ showPopover[0] && showPopover[1] === body.id && cardID === body.id  ?
											<div className="popover-test" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
												<ItemCard id ={`itemcard-${body.id}`} data={currentItem}/>
												<span
													ref={setArrowElement}
													style={styles.arrow}
													{...attributes.arrow}
													className={`arrow arrow-${place}`}
												/>
											</div> : 
											null
										}
									</td>
								</> :
								<td> 
									{body.name}
									{ showPopover[0] && showPopover[1] === body.id && cardID === body.id  ?
										<div className="popover-test" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
											<ItemCard id ={`itemcard-${body.id}`} data={body}/>
											<span
												ref={setArrowElement}
												style={styles.arrow}
												{...attributes.arrow}
												className={`arrow arrow-${place}`}
											/>
										</div> : 
										null
									}
								</td>
							}
							{offCanvas ?
								<td>
									<ButtonGroup style={{float:"right", minWidth:"110px",zIndex:"5"}} aria-label="adjust quantity of items to add">
										<Button style={{padding:"0 0.25em 0 0.25em", border:"1px solid black"}} variant="danger" onClick={event => handleCounter(event, "dec")}>-</Button>
										<Button style={{padding:"0 0.25em 0 0.25em", border:"1px solid black"}} variant="dark" onClick={event => handleCounter(event, body.id)}>Add {addItemCounter}</Button>
										<Button style={{padding:"0 0.25em 0 0.25em", border:"1px solid black"}} variant="success" onClick={event => handleCounter(event, "inc")}>+</Button>
									</ButtonGroup>
								</td> : 
								<>
									<td> {body.qty} </td>
									<td> {body.qty*body.weight} </td>
									<td> {body.qty*parseFloat(body.worth)} </td>
									<td style={{ alignItems:"center", zIndex:"2", minWidth:"60px", width:"3em"}}>
										<div style={{paddingRight:"0",paddingLeft:"0", justifyItems:"end", zIndex:"2" }}>
											<button className="react-icons-button" onClick={(event) => startEdit(event, body)} aria-label="edit item button">
												<RiFileEditFill size="1.5em" className="edit-button" /> 
											</button>
											<button className="react-icons-button" onClick={(event) => handleDelete(event, body.id)} aria-label="delete item button">
												<AiFillCloseSquare size="1.5em" className="delete-button" />
											</button>
										</div>
									</td>
								</>
							}
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}