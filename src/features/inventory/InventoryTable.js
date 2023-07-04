import React, { useState, useEffect} from 'react';
import { useDispatch } from "react-redux"

import Table from 'react-bootstrap/Table';
import { usePopper } from 'react-popper';


import { AiFillCloseSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";

import { deleteItem, equipItem, editContainer, deleteContainer } from './InventorySlice';
import { ItemCard } from '../../components/ItemCard';

export const InventoryTable = (props) => {
    const dispatch = useDispatch()
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
			description: ""
		}
	)
	const offCanvas = props.offCanvas === undefined ? false : true

	const fetchItem = async (body) => {

        const response = await fetch('https://www.dnd5eapi.co'+body.url)
        if (!response.ok) {
            console.log('Data coud not be fetched!')
        } else {
            return response.json()
        }
    }
	const saveItem = (item, id) => {
		console.log(item)
		var temp = {}
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
			temp["weight"] = item.weight
			temp["rarity"] = "Mundane"
			temp["attunable"] = false
			temp["description"] = item.desc
			if(item.equipment_category.index === "equipment-packs") {
				temp["category"] = "Other"
			}
			else if(item.equipment_category.index === "kits") {
				temp["category"] = "Other"
			}
			else if(item.equipment_category.index === "land-vehicles") {
				temp["category"] = "Vehicle (Land)"
			}
			else if(item.equipment_category.index === "waterborne-vehicles") {
				temp["category"] = "Vehicle (Water)"
			}
			else if(item.equipment_category.index === "weapon") {
				temp["category"] = item.weapon_category + " " + item.weapon_range + " Weapon"
			}
			else if(item.equipment_category.index === "armor") {
				temp["category"] = item.armor_category === "Shield" ? "Shield" : item.armor_category + " Armor"
			}
			else if(item.equipment_category.index === "mounts-and-other-animals" || item.equipment_category.index === "mounts-and-vehicles") {
				temp["category"] = "Other"
			}
			else if(item.equipment_category.index === "musical-instruments") {
				temp["category"] = "Instrument"
			}
			else if(item.equipment_category.index === "other-tools") {
				temp["category"] = "Other"
			}
			else if(item.equipment_category.index === "shields") {
				temp["category"] = "Shield"
			}
		}
		else if (props.header === "Wondrous Items") {
			temp["id"] = id
			temp["name"] = item.name
			temp["qty"] = item.quantity === undefined ? 1 : item.quantity
			temp["worth"] = "-"
			temp["weight"] = "-"
			temp["rarity"] = item.desc[0]
			temp["attunable"] = item.desc[0].includes("requires attunement") ? true : false
			temp["attuneRequirement"] = !temp["attunable"] ? "bla" : "See above"
			temp["description"] = item.desc.slice(1)
			temp["category"] = "Wondrous Item"
		}
		setCurrentItem(temp)
	}
	
	const handleDelete = (event, id) => {
		event.stopPropagation()
		dispatch(deleteItem(id))
	}
	const startEdit = (event, body) => {
		event.stopPropagation()
		props.setDefaultValues(body)
		props.setOldData(body)
		props.setEditing(true)
	}
	const handleEquipped = (event, id) => {
		event.stopPropagation()
        let checked = event.target.checked
		dispatch(equipItem(id, checked))
	}

	let place = "left"
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
							<td></td>
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
								</td> :
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

								</td> : 
								<>
									<td> {body.qty} </td>
									<td> {body.qty*body.weight} </td>
									<td> {body.qty*parseFloat(body.worth)} </td>
									<td style={{ alignItems:"center", zIndex:"2" }}>
										<div style={{float:"right", marginTop:"2.5px"}}>
											<RiFileEditFill type="button" color="black" size="23" id="edit-button" onClick={(event) => startEdit(event, body)} className="edit-button" /> 
											<AiFillCloseSquare type="button" color="#dc3545" size="23" id="delete-button" onClick={(event) => handleDelete(event, body.id)} className="edit-button" style={{backgroundColor:"white", padding:"0px"}}/>
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