import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Button from '../../BootstrapReplace/CustomButton';
import ButtonGroup from '../../BootstrapReplace/ButtonGroup';
import Card from '../../BootstrapReplace/Card';
import Form from '../../BootstrapReplace/Form';
import InputGroup from '../../BootstrapReplace/InputGroup';
import FloatingLabel from '../../BootstrapReplace/FloatingLabel';
import Modal from '../../BootstrapReplace/Modal';

import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import { ResourcesList } from './ResourcesList';
import { MiscProficiencies} from "../attributes/MiscProficiencies"

import { addResource } from './ResourcesSlice';
import { addMiscProficiency, addProficiencyType } from '../attributes/AttributesSlice';
import { useFocus } from '../../components/CustomHooks';


export const ResourcesMiscProficiencies = () => {
	const dispatch = useDispatch()
	const proficienciesTypes = useSelector(state => state.attributes.proficienciesTypes)
	const skills = useSelector(state => state.attributes.skills)
	const resources = useSelector(state => state.resources.data)

	const [inputRef, setInputFocus] = useFocus()
	const [show, setShow] = useState("none")
	const [editing, setEditing] = useState(false)
	const [defaultMiscProfValues, setDefaultMiscProfValues] = useState({name:"", type:"", isProficient:"",hasExpertise:""})
	const [defaultResourceValues, setDefaultResourceValues] = useState({name:"", current:"", max:"", dice:""})
	
	const handleMiscProfSelectValues = (event, id) => {
		let value = event.target.value
		if(value === "true") {
			value = true
		}
		else if(value === "false") {
			value = false
		}
		setDefaultMiscProfValues({
			...defaultMiscProfValues,
			[id]: value
		})
	}
	const handleResourceSelectValues = (event, id) => {
		let value = event.target.value
		setDefaultResourceValues({
			...defaultResourceValues,
			[id]: value
		})
	}
    
	const handleAddResource = (event) => {
		event.preventDefault();
		let isSameName = resources.find(resource => resource.name === event.target[0].value) ? true : false
		if(isSameName) {
			setShow("resource")
			setInputFocus()
		}
		else {
			dispatch(addResource(
				{name: defaultResourceValues.name, current: defaultResourceValues.current, maximum: defaultResourceValues.max, dice: defaultResourceValues.dice}
			))
			handleCloseAddResource()
			setDefaultResourceValues({name:"", current:"", max:"", dice:""})
		}
	}
	const handleAddMiscProficiency = (event) => {
		event.preventDefault();
		let isSameName = skills.find(skill => skill.name === event.target[0].value) ? true : false
		if(isSameName) {
			setShow("miscProf")
			setInputFocus()
		}
		else {
			dispatch(addMiscProficiency(
				[defaultMiscProfValues.name, defaultMiscProfValues.type, defaultMiscProfValues.isProficient === "true", defaultMiscProfValues.hasExpertise === "true"]
			))
			handleCloseAddMiscProf()
			setDefaultMiscProfValues({name:"", type:"", isProficient:"", hasExpertise:""})
		}
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

	return (
	<>
		<Modal backdrop="static" size="lg" show={showAddResource} onHide={handleCloseAddResource}>
			<Form onSubmit={handleAddResource}>
				<Modal.Header>
					<Modal.Title> Add Resource </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup>
						<FloatingLabel controlId="resource-name" label="Name">
							<Overlay target={inputRef.current} show={show === "resource"} placement="top">
								<Tooltip id="resource-unique-name-tooltip">
									Please enter unique Name.
								</Tooltip>
							</Overlay>
							<Form.Control ref={inputRef} placeholder=""
								required value={defaultResourceValues.name} className="top-left-group" type="text" 
								aria-labelledby="resource-name" onChange={event => handleResourceSelectValues(event, "name")}
							/> 
						</FloatingLabel>
						<FloatingLabel controlId="resource-dice" label="Dice">
							<Form.Control placeholder=""
								required value={defaultResourceValues.dice} className="top-right-group" type="name" 
								aria-labelledby="resource-dice" onChange={event => handleResourceSelectValues(event, "dice")}
							/> 
						</FloatingLabel>
					</InputGroup>
					<InputGroup>
						<FloatingLabel controlId="resource-current" label="Current">
							<Form.Control placeholder=""
								required value={defaultResourceValues.current} className="bottom-left-group" type="number" 
								aria-labelledby="resource-current" onChange={event => handleResourceSelectValues(event, "current")}
							/> 
						</FloatingLabel>
						<FloatingLabel controlId="resource-max" label="Maximum">
							<Form.Control placeholder=""
								required value={defaultResourceValues.max} className="bottom-right-group" type="number" 
								aria-labelledby="resource-max" onChange={event => handleResourceSelectValues(event, "max")}
							/> 
						</FloatingLabel>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" type="button" onClick={handleCloseAddResource}>
						Close
					</Button>
					<Button variant="success" type="submit">
						Save Changes
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
		
		<Modal backdrop="static" size="lg" show={showAddMiscProf} onHide={handleCloseAddMiscProf}>
			<Form onSubmit={(event) => handleAddMiscProficiency(event)} >
				<Modal.Header>
					<Modal.Title> Add Misc Proficiency </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup >
						<FloatingLabel controlId="misc-prof-name" label="Name">
							<Overlay target={inputRef.current} show={show === "miscProf"} placement="top">
								<Tooltip id="overlay-example">
									Please enter unique Name.
								</Tooltip>
							</Overlay>
							<Form.Control ref={inputRef} placeholder=""
								required value={defaultMiscProfValues.name} className="top-left-group" type="text" 
								aria-labelledby="misc-prof-name" onChange={event => handleMiscProfSelectValues(event, "name")}
							/> 
						</FloatingLabel>
						<FloatingLabel controlId="misc-prof-type" label="Type">
							<Form.Select placeholder=""
								required value={defaultMiscProfValues.type} className="top-right-group" type="text" 
								aria-labelledby="misc-prof-type" onChange={event => handleMiscProfSelectValues(event, "type")}
							>
								<option value="">Choose type</option>
								{proficienciesTypes.map((type, index) => 
									<option key={type.value} value={type.label}>{type.label}</option>
								)}
							</Form.Select>
						</FloatingLabel>
					</InputGroup>
					<InputGroup>
						<FloatingLabel controlId="is-proficient" label="Is Proficient?">
							<Form.Select placeholder=""
								required value={defaultMiscProfValues.isProficient} className="bottom-left-group" type="boolean" 
								aria-labelledby="is-proficient" onChange={event => handleMiscProfSelectValues(event, "isProficient")}
							> 
								<option value="">Choose if proficient</option>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</Form.Select> 
						</FloatingLabel>
						<FloatingLabel controlId="is-proficient" label="Has expertise?">
							<Form.Select placeholder=""
								required value={defaultMiscProfValues.hasExpertise} className="bottom-right-group" type="boolean" 
								aria-labelledby="is-proficient" onChange={event => handleMiscProfSelectValues(event, "hasExpertise")}
							> 
								<option value="">Choose if expertise</option>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</Form.Select> 
						</FloatingLabel>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" type="button" onClick={handleCloseAddMiscProf}>
						Close
					</Button>
					<Button variant="primary" type="submit">
						Save Changes
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>

		<Card className="main-element-card">
			<Tab.Container transition={false} id="resources-misc-profs-nav" defaultActiveKey="resources">
				<Nav className="mb-2" id="resources-misc-profs-nav" justify variant="tabs" defaultActiveKey="/home">
					<Nav.Link eventKey="resources">Resources</Nav.Link>
					<Nav.Link eventKey="miscProfs">Misc Proficiencies</Nav.Link>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="resources">
						<ResourcesList resources={resources}/>
						<Button variant="primary" onClick={handleShowAddResource} style={{borderTopRightRadius:"0", borderTopLeftRadius:"0", width:"100%"}}> Add Resource </Button>
					</Tab.Pane>
					<Tab.Pane eventKey="miscProfs">
						<MiscProficiencies proficienciesTypes={proficienciesTypes} skills={skills} editing={editing} setEditing={setEditing}/>
						<ButtonGroup style={{width:"100%"}}>
							<Button variant="primary" onClick={handleShowAddMiscProf} style={{borderTopLeftRadius:"0"}}> Add </Button>
							<Button variant={editing ? "danger":"success"} onClick ={startEditing} style={{borderTopRightRadius:"0"}}>{editing ? "Cancel" : "Edit"}</Button>
						</ButtonGroup>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</Card>
	</>
	)
}