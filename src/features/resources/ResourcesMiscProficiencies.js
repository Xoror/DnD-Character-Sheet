import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import CreatableSelect from 'react-select/creatable';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

import { ResourcesList } from './ResourcesList';
import { MiscProficiencies} from "../attributes/MiscProficiencies"

import { addResource } from './ResourcesSlice';
import { addMiscProficiency, addProficiencyType } from '../attributes/AttributesSlice';
import { useFocus } from '../../components/CustomHooks';
import { ButtonGroup } from 'react-bootstrap';

export const ResourcesMiscProficiencies = () => {
	const dispatch = useDispatch()
	const proficienciesTypes = useSelector(state => state.attributes.proficienciesTypes)
	const skills = useSelector(state => state.attributes.skills)
	const resources = useSelector(state => state.resources.data)

	const [inputRef, setInputFocus] = useFocus()
	const [show, setShow] = useState("none")
	const [editing, setEditing] = useState(false)
	const [selectedType, setSelectedType] = useState("");
    
	const handleAddResource = (event) => {
		event.preventDefault();
		let isSameName = resources.find(resource => resource.name === event.target[0].value) ? true : false
		if(isSameName) {
			setShow("resource")
			setInputFocus()
		}
		else {
			dispatch(addResource(
				{name: event.target[0].value, current: event.target[2].value, maximum: event.target[3].value, dice: event.target[1].value}
			))
			handleCloseAddResource()
		}
	}
	const handleAddMiscProficiency = (event) => {
		event.preventDefault();
		console.log([event.target[0].value, selectedType, event.target[2].value, event.target[3].value])
		let isSameName = skills.find(skill => skill.name === event.target[0].value) ? true : false
		if(isSameName) {
			setShow("miscProf")
			setInputFocus()
		}
		else {
			dispatch(addMiscProficiency(
				[event.target[0].value, selectedType, event.target[2].value, event.target[3].value]
			))
			handleCloseAddMiscProf()
		}
	}
	const handleCreateOption = (createdOption) => {
		let option = {value: createdOption.toLowerCase(), label: createdOption}
		setSelectedType(option)
		dispatch(addProficiencyType(option))
	}
	const startEditing = (event) => {
		setEditing(!editing)
	}

	const [showAddResource, setShowAddResource] = useState(false);
	const handleShowAddResource = () => setShowAddResource(true);
	const handleCloseAddResource = () => setShowAddResource(false);
	
	const [showAddMiscProf, setShowAddMiscProf] = useState(false);
	const handleShowAddMiscProf = () => setShowAddMiscProf(true);
	const handleCloseAddMiscProf = () => setShowAddMiscProf(false);
	//0.25em 0.25em rgba(13, 110, 253, 0.5), -0.25em 0.25em rgba(13, 110, 253, 0.5), 0.25em -0.25em rgba(13, 110, 253, 0.5), -0.25em -0.25em rgba(13, 110, 253, 0.5)
	const customStyles = {
		option: (defaultStyles) => ({
			...defaultStyles,
			color: "#000000",
		}),
		menu: provided => ({ ...provided, zIndex: 1055, marginTop: 0}),
		input: provided => ({ ...provided, minWidth:"13em"}), 
		container:provided => ({ ...provided, maxWidth:"13em",}),
		control: (provided, {data, isFocused} )=> ({...provided, zIndex:"2", borderTopLeftRadius:"0", borderBottomLeftRadius:"0", boxShadow: isFocused ? "0 0 0 0.25em rgba(13, 110, 253, 0.25)" : provided.boxShadow, border: isFocused ? "1px solid rgba(13, 110, 253, 0.5)":provided.border, ":hover":{border: isFocused ? "1px solid rgba(13, 110, 253, 0.5)" : "1px solid #ced4da"}})
	}

	return (
	<div>
		<Container fluid style={{padding:"0"}}>
			<Modal contentClassName="modal-custom" show={showAddResource}>
				<Form onSubmit={handleAddResource}>
					<Modal.Header>
						<Modal.Title> Add Resource </Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<InputGroup>
							<InputGroup.Text>Name</InputGroup.Text>
								<Overlay target={inputRef.current} show={show === "resource"} placement="top">
									<Tooltip id="overlay-example">
										Please enter unique Name.
									</Tooltip>
								</Overlay>
							<Form.Control ref={inputRef} required name="Name" placeholder="Name" aria-label="Name"/>
							<InputGroup.Text>Dice</InputGroup.Text>
							<Form.Control required name="Dice" placeholder="Dice" aria-label="Dice"/>
						</InputGroup>
						<InputGroup>
							<InputGroup.Text>Current</InputGroup.Text>
							<Form.Control required name="Current" placeholder="Current" aria-label="Current"/>
							<InputGroup.Text>Maximum</InputGroup.Text>
							<Form.Control required name="Maximum" placeholder="Maximum" aria-label="Maximum"/>
						</InputGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={handleCloseAddResource}>
							Close
						</Button>
						<Button variant="success" type="submit">
							Save Changes
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
			
			<Modal contentClassName="modal-custom" show={showAddMiscProf}>
				<Form onSubmit={(event) => handleAddMiscProficiency(event)}>
					<Modal.Header>
						<Modal.Title> Add Misc Proficiency </Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<InputGroup >
							<InputGroup.Text>Name</InputGroup.Text>
								<Overlay target={inputRef.current} show={show === "miscProf"} placement="top">
									<Tooltip id="overlay-example">
										Please enter unique Name.
									</Tooltip>
								</Overlay>
							<Form.Control ref={inputRef} required name="Name" placeholder="Name" aria-label="Name"/>
							<InputGroup.Text>Type</InputGroup.Text>
							<CreatableSelect value={selectedType} onChange={(value) => setSelectedType(value)} onCreateOption={(value) => handleCreateOption(value)} isClearable options={proficienciesTypes} styles={customStyles} required placeholder="Select or create type..." /> 
						</InputGroup>
						<InputGroup>
							<InputGroup.Text htmlFor="proficiencyInput">Proficient</InputGroup.Text>
							<Form.Select required id="proficiencyInput">
								<option value="">Choose...</option>
								<option value="True">Yes</option>
								<option value="False">No</option>
							</Form.Select>
							<InputGroup.Text htmlFor="expertiseInput">Expertise</InputGroup.Text>
							<Form.Select required id="expertiseInput">
								<option value="">Choose...</option>
								<option value="True">Yes</option>
								<option value="False">No</option>
							</Form.Select>
						</InputGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={handleCloseAddMiscProf}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Save Changes
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
			
			<CardGroup>
				<Card className="main-element-card justify-content-middle">
					<Card.Title style={{textAlign:"center", marginBottom:"0.5em",paddingTop:"0.25em" ,paddingBottom:"0.5em", borderBottom:"1px solid var(--nav-color)"}}>Resources</Card.Title>
					<ResourcesList resources={resources}/>
					<Button variant="primary" onClick={handleShowAddResource} style={{borderTopRightRadius:"0", borderBottomRightRadius:"0", width:"100%"}}> Add Resource </Button>
				</Card>
				<Card className="main-element-card justify-content-middle">
					<Card.Title style={{textAlign:"center", marginBottom:"0.5em",paddingTop:"0.25em" ,paddingBottom:"0.5em", borderBottom:"1px solid var(--nav-color)"}}>Misc Proficiencies</Card.Title>
					<MiscProficiencies proficienciesTypes={proficienciesTypes} skills={skills} editing={editing} setEditing={setEditing}/>
					<ButtonGroup style={{ width:"100%" }}>
						<Button variant="primary" onClick={handleShowAddMiscProf} style={{borderTopLeftRadius:"0", borderBottomLeftRadius:"0"}}> Add </Button>
						<Button variant={editing ? "danger":"primary"} onClick ={startEditing} style={{borderTopRightRadius:"0em"}}>{editing ? "Cancel" : "Edit"}</Button>
					</ButtonGroup>
				</Card>
			</CardGroup>
			
		</Container>
	</div>
	)
}