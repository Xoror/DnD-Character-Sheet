import React, { useState, useEffect} from 'react';
import { useDispatch } from "react-redux"

import { usePopper } from 'react-popper';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { AiFillCloseSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";
import { MdExpandLess, MdExpandMore } from "react-icons/md/";

import { deleteItem, equipItem, addItem, deleteContainer } from './InventorySlice';
import { ItemCard } from '../../components/ItemCard';
import { parseItemAPIResponse } from '../../utils/ParseResponseFunctions';

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
	
	const startContainerEdit = (event, container) => {
		event.stopPropagation()
		props.setDefaultContainerValues(container)
		props.setContainerEditing(true)
		props.setShowAddContainer(true)
	}
	const handleContainerDelete = (event, id) => {
		dispatch(deleteContainer(id))
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
	const [showDetails, setShowDetails] = useState([false, "bla"])
	const [showPopover, setShowPopover] = useState([false,cardID])
	useEffect(() => {
		if(showPopover[1] != cardID) {
			setShowPopover([showPopover[0], cardID])
		}
	}, [showPopover, cardID])
	
	const handleRowClick = (event, id) => {
		let test
		cardID = props.cardID
		if(offCanvas) {
			fetchItem(props.bodies.find(body => body.id === id))
				.then((res) => {
					let temp = parseItemAPIResponse(res, id, props.header, props.selectedContainer, addItemCounter)
					setCurrentItem(temp)
				})
				.catch((e) => {
					console.log(e.message)
				})
		}
		if(showDetails[0] && showDetails[1] === id) {
			setShowDetails([false, "bla"])
		}
		else {
			setShowDetails([true, id])
		}

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
			if(props.selectedContainer != "") {
				fetchItem(props.bodies.find(body => body.id === id))
				.then((res) => {
					let temp = parseItemAPIResponse(res, id, props.header, props.selectedContainer, addItemCounter, "addItemList")
					dispatch(addItem(temp))
					setCurrentItem(temp)
				})
				.catch((e) => {
					console.log(e.message)
				})
			}
			else {
				props.setContainerFocus()
				props.containerFocus.current.scrollIntoView()
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
  	})
	return (
		<>
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
							<td> Weight<br></br>lbs </td>
							<td> Worth<br></br>gp </td>
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
						<td><b>{props.container.label} </b>{props.container.containsWeight}{props.container.maxWeightIn === 0 ? null: "/"+props.container.maxWeightIn} lbs</td>
						<td></td>
						<td> {props.container.weight != 0 ? props.container.weight : null} </td>
						<td></td>
						{props.container.label != "Equipment" ? <td style={{paddingRight:"0",paddingLeft:"0", zIndex:"2", width:"4.5em"}}>
							<div style={{paddingRight:"0",paddingLeft:"0", zIndex:"2"}}>
								<button className="react-icons-button edit" onClick={event => startContainerEdit(event, props.container)} aria-label="edit container button">
									<RiFileEditFill size="1.5em" className="edit-button" />
								</button>
								<button className="react-icons-button delete" onClick={event => handleContainerDelete(event, props.container.id)} aria-label="delete container button">
									<AiFillCloseSquare size="1.5em" className="delete-button"/> 
								</button>
							</div>
						</td>: <td></td>}
					</tr>}
				{props.bodies.length === 0 ? 
					<tr>
						<td colSpan={6}>No items {offCanvas ? " match" : "in "+props.container.label}</td>
					</tr> :
					props.bodies.map( (body, index) => (
						<React.Fragment key={`sub-table-for-${props.header}-item-${body.id}`}>
							<tr className="action-table" key={`inventory-table-row-id-${body.id === undefined ? index : body.id}`} id={`inventory-table-row-id-${body.id}`} onClick={offCanvas ? (event) => handleRowClick(event, body.id) : (event) => handleRowClick(event, body.id)}>
								{offCanvas ? null : 
									<td style={{height:"1.5em", width:"1.5em", zIndex:"2"}}>
										<div className="checkbox-wrapper">
											<input className="letter-e" type="checkbox" id={body.name} value="prepared"  onClick={(event) => handleEquipped(event, body.id)} defaultChecked={body.isEquipped}></input>
										</div>
									</td>
								}
								<td> 
									{body.name}
									{ false && showPopover[0] && showPopover[1] === body.id && cardID === body.id  ?
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
										<td style={{paddingRight:"0",paddingLeft:"0", zIndex:"2", width:"4.5em"}}>
											<div style={{paddingRight:"0",paddingLeft:"0", height:"1.5em", zIndex:"2" }}>
												<button className="react-icons-button edit" onClick={(event) => startEdit(event, body)} aria-label="edit item button">
													<RiFileEditFill size="1.5em" className="edit-button" /> 
												</button>
												<button className="react-icons-button delete" onClick={(event) => handleDelete(event, body.id)} aria-label="delete item button">
													<AiFillCloseSquare size="1.5em" className="delete-button" />
												</button>
												{showDetails[0] && showDetails[1] === body.id ?
												<button className="react-icons-button" onClick={(event) => setShowDetails([false, "bla"])} aria-label={`expand ${props.spells ? "spell":"action"} details`}>
													<MdExpandLess size="1.5em" className="expand-button" /> 
												</button> :
												<button className="react-icons-button" onClick={(event) => setShowDetails([true, body.id])} aria-label={`expand ${props.spells ? "spell":"action"} details`}>
													<MdExpandMore size="1.5em" className="expand-button" /> 
												</button>
											}
											</div>
										</td>
									</>
								}
							</tr>
							{offCanvas  ?
								(showDetails[0] && showDetails[1] === body.id ?
									<tr key={`item-details-id-${body.id}`}>
										<td style={{borderRight:"1px solid rgba(1,1,1,0.5)", borderLeft:"1px solid rgba(1,1,1,0.5)"}} colSpan={6}>
											<ItemCard id ={`itemcard-${body.id}`} data={currentItem}/>
										</td>
									</tr> : null
								)
								:
								(showDetails[0] && showDetails[1] === body.id ?
									<tr key={`item-details-id-${currentItem.id}`}>
										<td style={{borderRight:"1px solid rgba(1,1,1,0.5)", borderLeft:"1px solid rgba(1,1,1,0.5)"}} colSpan={6}>
											<ItemCard id ={`itemcard-${body.id}`} data={body}/>
										</td>
									</tr> : null
								)
							}
						</React.Fragment>
				))}
				{props.index != props.containersLength-1 ? <tr style={{height:"1em"}}></tr> : null }
			</tbody>
		</>
	)
}