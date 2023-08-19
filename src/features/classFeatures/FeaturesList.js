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
		color = "#51585e";
	}
	else {
		color = "#676f77";
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
		<div>
			<div id="edit-form" className={!open ? null : "visually-hidden"}>
				<Form onSubmit={handleSubmit}>
					<Card style={{background:"none", backgroundColor:color, borderRadius:"0em 0em 0em 0em"}} >
						<InputGroup className="mb">
							<InputGroup.Text>Name</InputGroup.Text> 
							<Form.Control ref={inputRef} type="text" id="change-name" defaultValue={props.feature.name} placeholder="Enter feature name"/>
							<InputGroup.Text>Level</InputGroup.Text>
							<Form.Control type="text" id="change-level" defaultValue={props.feature.level} placeholder="Enter level"/>
						</InputGroup>
						<InputGroup className="mb">
							<InputGroup.Text> Class </InputGroup.Text> 
							<Form.Control type="text" id="change-class" defaultValue={props.feature.featureClass} placeholder="Enter Class"/>
							<InputGroup.Text> Subclass </InputGroup.Text>
							<Form.Control type="text" id="change-subclass" defaultValue={props.feature.featureSubclass} placeholder="Enter Subclass"/>
						</InputGroup>
						<Form.Control as="textarea" id="change-description" defaultValue={props.feature.description} placeholder="Enter Description"/>
						<ButtonGroup className="mb">
							<Button variant="success" type="submit"> Submit Changes </Button>
							<Button variant="danger" onClick={endEdit}> Discard Changes </Button>
						</ButtonGroup >
					</Card>
				</Form>
			</div>
			<div id="display-form" className={open ? null : "visually-hidden"}>
				<Card style={{background:"none", backgroundColor:color}}>
					<Container fluid>
						<Row>
							<Col>
								<span>Name: {props.feature.name}</span>
							</Col>
							<Col md="auto">
								<Row>
									<Col md="auto" style={{paddingRight:"6px",paddingLeft:"0"}}> <span>Level: {props.feature.level}</span> </Col>
									<Col md="auto" style={{paddingRight:"0em",paddingLeft:"0"}}>
										<button className="react-icons-button" onClick={startEdit} aria-label="edit feature button">
											<RiFileEditFill size="1.5em" className="edit-button" />
										</button>
										<button className="react-icons-button" onClick={handleDelete} aria-label="delete feature button">
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
							<p>Description: {props.feature.description}</p>
						</Row>
					</Container>
				</Card>
			</div>
		</div>
	)
}