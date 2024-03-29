import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import Offcanvas from '../../BootstrapReplace/OffCanvas';
import Container from '../../BootstrapReplace/Container';
import InputGroup from '../../BootstrapReplace/InputGroup';
import Form from '../../BootstrapReplace/Form';
import Table from '../../BootstrapReplace/Table';

import { AiOutlineCloseCircle } from "react-icons/ai";

import { InventoryTable } from './InventoryTable';
import { useFocus } from '../../components/CustomHooks'; 

export const ItemList = (props) => {
	const dispatch = useDispatch()

	const containers = useSelector(state => state.inventory.containers)
	const [selectedContainer, setSelectedContainer] = useState("")
	const [containerFocus, setContainerFocus] = useFocus()

	const [show, setShow] = useState(false);
	const [cardID, setCardID] = useState("0")
    const [itemList, setItemList] = useState([])
    const [magicItemList, setMagicItemList] = useState([])
	const inheritShow = props.inheritShow
	const setInheritShow = props.setInheritShow

	const fetchItems = async () => {
        const response = await fetch('https://www.dnd5eapi.co/api/equipment')
        if (!response.ok) {
            console.log('Data coud not be fetched!')
        } else {
            return response.json()
        }
    }
    const fetchMagicItems = async () => {
        const response = await fetch('https://www.dnd5eapi.co/api/magic-items')
        if (!response.ok) {
            console.log('Data coud not be fetched!')
        } else {
            return response.json()
        }
    }
	const [itemListDetailed, setItemListDetailed] = useState([])

	const importItemsFile = async (id) => {
		if(id === "mundane") {
			const { mundaneItems} = await import('../../data/itemsSRD')
			mundaneItems.forEach(item => item["id"] = nanoid())
			setItemList(mundaneItems)
			console.log("mundane")
		}
		else {
			const { magicItems } = await import('../../data/itemsSRD')
			magicItems.forEach(item => item["id"] = nanoid())
			setMagicItemList(magicItems)
			console.log("magical")
		}
	}

	useEffect(() => {
		importItemsFile("mundane")
		importItemsFile("magical")
		/*
		fetchItems()
			.then((res) => {
				res.results.forEach(item => item["id"] = nanoid())
				setItemList(res.results)
			})
			.catch((e) => {
				console.log(e.message)
			})
		fetchMagicItems()
			.then((res) => {
				res.results.forEach(item => item["id"] = nanoid())
				setMagicItemList(res.results)
			})
			.catch((e) => {
				console.log(e.message)
			})
		*/
	}, [])

	const fetchDetail = async (item) => {
		const response =  await fetch('https://www.dnd5eapi.co' + item.url)
		if (!response.ok) {
            console.log('Data coud not be fetched!')
        } else {
            return response.json()
        }
	}

	useEffect(() => {
		if(itemList.length === 237 && itemListDetailed.length === 0) {
			console.log("bla")
			
			let test = []
			itemList.forEach((item )=> {
				fetchDetail(item)
					.then((res) => {
						test.push(res)
						if(test.length === 237) {
							console.log(test)
							setItemListDetailed(test)
						}
					})
			})

		}
	}, [itemList])

    useEffect(() => {}, [setItemList])

	const handleClose = () => {
		setShow(false)
		setSearchField("")
		setInheritShow(!inheritShow)
	}
	const handleShow = () => {
		setShow(true)
	}
	useEffect(() => {
		if(inheritShow) {
			handleShow()
		}
	}, [inheritShow])
	
	const [filters, setFilters] = useState({spellslots: [], schools: [], ritual: [], classes: []})
	const [searchField, setSearchField] = useState("")
	const filterKeys = Object.keys(filters)
	const handleDelete = (event, index, type) => {
		let copy = structuredClone(filters)
		copy[type] = copy[type].slice(0,index).concat(copy[type].slice(index+1))
		setFilters(copy)
		//dispatch(filterSpells([copy, searchField]))
	}
	
	let headers = ["Mundane Items", "Wondrous Items"]
    let bodies = [itemList, magicItemList]
	return(
		<Offcanvas show={show} onHide={handleClose} placement="start">
			<Offcanvas.Header closeButton onClick={handleClose}>
				<Offcanvas.Title>Item List</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<InputGroup className="mb-3 mt-1">
					<InputGroup.Text id="container-to-add-to">Container to add Item to</InputGroup.Text>
					<Form.Select ref={containerFocus} value={selectedContainer} placeholder="Container" aria-describedby="container-to-add-to" onChange={event => setSelectedContainer(event.target.value)}>
						<option value="">Choose container...</option>
						{containers.map((container, index) => (
							<option key={`container-label-${container.label}`} value={container.id}>{container.label}</option>
						))}
					</Form.Select>
				</InputGroup>
				<FilterSelection filters={filters} searchField={searchField} setFilters={setFilters} setSearchField={setSearchField}/>
				{false ? <Container fluid className="filter-container">
					<span>Filters: </span>
					{filterKeys.map(key => (
						filters[key].map((filter, index) => (
							<FilterItem key={`filter-item-${filter}`} index={index} type={key} name={filter} handleDelete={handleDelete}/>
						))
					))}
				</Container> : null}
				<div key={props.index} style={{marginLeft:"0.5em", marginRight:"0.5em"}}>
					<Table size="sm" style={{color:"white", border:"black"}}>
						{headers.map((header, index) => (
							<InventoryTable
								key={`table-to-add-${header}`}
								cardID={cardID}
								setCardID={setCardID}
								header={header}
								bodies={bodies[index].filter(item => {return item.name.toLowerCase().includes(searchField.toLowerCase()) === true})}
								offCanvas={true} 
								searchField={searchField} 
								filters={filters}
								selectedContainer={selectedContainer}
								containerFocus={containerFocus}
								setContainerFocus={setContainerFocus}
							/>
						))}
					</Table>
				</div>
			</Offcanvas.Body>
		</Offcanvas>
	)
}
/*
{headers.map((header, index) => (
	<ActionsTable 
		spellCardID={spellCardID}
		setSpellCardID={setSpellCardID} 
		offCanvas={true} 
		id={props.id} 
		key={index} 
		header={header} 
		searchField={searchField} 
		filters={filters} 
		bodies={sortedSpellList.filter((action) => {return action.type === header})} 
		spells="true"
	/>
))}
*/

export const FilterItem = (props) => {
	return (
		<div className="filter-body">
			{props.name} <AiOutlineCloseCircle type="button" color="black" size="20" id="delete-button" aria-label={"delete filter item "+props.name}
							onClick={(event) => props.handleDelete(event, props.index, props.type)} className="filter-delete-button"/>
		</div>
	)
}

const FilterSelection = (props) => {
	let defaultValue = ""
	const handleAdd = (event, type) => {
		let copy = structuredClone(props.filters)
		let search = ""
		if(type != "search") {
			copy[type].push(event.target.value)
			props.setFilters(copy)
		}
		else if(type === "search") {
			search = event.target.value
		}
		//dispatch(filterSpells([copy, search]))
	}
	const slotList = ["Cantrip","1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
	const classList = ["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"]
	const schoolList = ["Abjuration", "Conjuration", "Divination", "Enchantment","Evocation", "Illusion", "Necromancy", "Transmutation"]
	return (
		<>
			<Form.Control placeholder="Search items..." type="search" onChange={(e) => (props.setSearchField(e.target.value), handleAdd(e, "search"))}></Form.Control>
			{false ? 
                <>
                    <InputGroup>
                        <Form.Select value={defaultValue} aria-label="Choose spell school" onChange={(e) => (defaultValue = e.target.value, handleAdd(e, "schools"))}>
                            <option value="">Filter schools</option>
                            {schoolList.map((class1, index) => (
                                props.filters.schools.filter(item => item === class1).length === 0 ? <option key={index} value={class1}>{class1}</option> : ""
                            ))}
                        </Form.Select>
                        <Form.Select value={defaultValue} aria-label="Choose class" onChange={(e) => (defaultValue = e.target.value, handleAdd(e, "classes"))}>
                            <option value="">Filter classes</option>
                            {classList.map((class1, index) => (
                                props.filters.classes.filter(item => item === class1).length === 0 ? <option key={index} value={class1}>{class1}</option> : ""
                            ))}
                        </Form.Select>
                    </InputGroup>
                    <InputGroup>
                        <Form.Select value={defaultValue} aria-label="Choose spell slot" onChange={(e) => (defaultValue = e.target.value, handleAdd(e, "spellslots"))}>
                            <option value="">Filter spell tier</option>
                            {slotList.map((slot, index) => (
                                props.filters.spellslots.filter(item => item === slot).length === 0 ? <option key={index} value={slot}>{slot}</option> : ""
                            ))}
                        </Form.Select>
                        <Form.Select value={defaultValue} aria-label="Is spell Ritual" onChange={(e) => (defaultValue = e.target.value, handleAdd(e, "ritual"))}>
                            <option value=""> Is spell ritual? </option>
                            {props.filters.ritual.filter(is => is === "ritual").length === 0 ? <option value="ritual" > Is ritual spell </option> : "" }
                            {props.filters.ritual.filter(is => is === "not ritual").length === 0 ? <option value="not ritual"> Is not ritual spell</option> : "" }
                        </Form.Select>
                    </InputGroup>
                </> : null}
		</>
	)
}