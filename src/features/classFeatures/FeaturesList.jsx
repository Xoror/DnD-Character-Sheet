import React, { useState} from 'react';
import { useDispatch } from "react-redux"

import Button from '../../BootstrapReplace/CustomButton';
import ButtonGroup from '../../BootstrapReplace/ButtonGroup';
import Form from '../../BootstrapReplace/Form';
import InputGroup from '../../BootstrapReplace/InputGroup';
import Container from '../../BootstrapReplace/Container';
import Row from '../../BootstrapReplace/Row';
import Col from '../../BootstrapReplace/Col';
import FeatureCard from './FeatureCard';


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
		console.log(event.target[4].value.split("\n"))
		let data = {name: event.target[0].value, level: event.target[1].value, featureClass: event.target[2].value, 
						featureSubclass: event.target[3].value, description: event.target[4].value}
        let id = props.id
		dispatch(editFeature(data,id))
	}
	return (
		<React.Fragment key={`feature-card-${props.feature.id}`}>
			{!open ? 
				<div id="feature-edit-form" className={!open ? null : "visually-hidden"}>
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
				<FeatureCard data={props.feature} startEdit={startEdit} handleDelete={handleDelete} />
			}
		</React.Fragment>
	)
}