import React, { useState} from 'react';
import { useDispatch } from "react-redux"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { AiFillCloseSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";

import { deleteFeature, editFeature } from './FeaturesSlice';
import { useFocus } from '../../components/CustomHooks';

export const FeatureList = (props) => {
	const dispatch = useDispatch()
	const [inputRef, setInputFocus] = useFocus()

	const [open, setOpen] = useState(true);

	const startEdit = () => {
		setOpen(false)
		setInputFocus()
	}
	const endEdit = (event) => {
		event.preventDefault()
		setOpen(true)
	}
	
	let color;
	if (props.id%2 === 0) {
		color = "#676f77";
	}
	else {
		color = "#51585e";
	}
	const handleDelete = (event) => {
		event.preventDefault();
        let id = props.id
		dispatch(deleteFeature(id))
	}
	const handleSubmit = (event) => {
		endEdit(event)
		let data = {name: event.target[0].value, level: event.target[1].value, featureClass: event.target[2].value, 
						featureSubclass: event.target[3].value, description: event.target[4].value}
        let id = props.id
		dispatch(editFeature(data,id))
	}
	return (
		<React.Fragment key={`feature-card-${props.feature.id}`}>
			{!open ? <div id="edit-form" className={!open ? null : "visually-hidden"}>
				<Form onSubmit={handleSubmit}>
					<div className="feature-card edit">
						<InputGroup>
							<InputGroup.Text className="top-left-group">Name</InputGroup.Text> 
							<Form.Control autoFocus ref={inputRef} type="text" id="change-name" defaultValue={props.feature.name} placeholder="Enter feature name"/>
							<InputGroup.Text>Level</InputGroup.Text>
							<Form.Control  className="top-right-group" type="text" id="change-level" defaultValue={props.feature.level} placeholder="Enter level"/>
						</InputGroup>
						<InputGroup className="mb">
							<InputGroup.Text className="middle-left-group"> Class </InputGroup.Text> 
							<Form.Control type="text" id="change-class" defaultValue={props.feature.featureClass} placeholder="Enter Class"/>
							<InputGroup.Text> Subclass </InputGroup.Text>
							<Form.Control className="middle-right-group" type="text" id="change-subclass" defaultValue={props.feature.featureSubclass} placeholder="Enter Subclass"/>
						</InputGroup>
						<Form.Control className="middle-left-group middle-right-group" as="textarea" id="change-description" defaultValue={props.feature.description} placeholder="Enter Description"/>
						<ButtonGroup className="mb">
							<Button className="bottom-left-group" variant="success" type="submit"> Submit Changes </Button>
							<Button className="bottom-right-group" variant="danger" onClick={endEdit}> Discard Changes </Button>
						</ButtonGroup >
					</div>
				</Form>
			</div> :
			<div  className="feature-card">
				<Container fluid>
					<Row>
						<Col>
							<span>Name: {props.feature.name}</span>
						</Col>
						<Col xs="auto">
							<Row>
								<Col xs="auto" style={{paddingRight:"6px",paddingLeft:"0"}}> <span>Level: {props.feature.level}</span> </Col>
								<Col xs="auto" style={{paddingRight:"0em",paddingLeft:"0"}}>
									<button className="react-icons-button edit" onClick={startEdit} aria-label="edit feature button">
										<RiFileEditFill size="1.5em" className="edit-button" />
									</button>
									<button className="react-icons-button delete" onClick={handleDelete} aria-label="delete feature button">
										<AiFillCloseSquare size="1.5em" className="delete-button"/> 
									</button>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col md="auto">
							<span>Class: {props.feature.featureClass}</span>
						</Col>
						<Col md="auto">
							<span> Subclass: {props.feature.featureSubclass}</span>
						</Col>
					</Row>
					<Row>
						<p style={{marginBottom:"0.5em"}}>Description: {props.feature.description}</p>
					</Row>
				</Container>
			</div>}
		</React.Fragment>
	)
}