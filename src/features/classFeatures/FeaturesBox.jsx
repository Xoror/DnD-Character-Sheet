import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"

//import Button from 'react-bootstrap/Button';
import Button from '../../BootstrapReplace/CustomButton';
//import Modal from 'react-bootstrap/Modal';
import Modal from '../../BootstrapReplace/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';


import { FeatureList } from "./FeaturesList";
import { addFeature } from './FeaturesSlice';

export default function FeaturesBox() {
	const dispatch = useDispatch();
    const features = useSelector(state => state.features.data)

    const [show, setShow] = useState(false);

	const handleClose = (event) => {
		setShow(false)
	};
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		event.preventDefault();
		if(event.target.id != "close") {
			dispatch(addFeature({
				name: event.target[0].value, 
				level: event.target[1].value, 
				featureClass: event.target[2].value, 
				featureSubclass:event.target[3].value, 
				description: event.target[4].value
			}))
		}
	}
	
	return (
		<>
			<Modal backdrop size="lg" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Adding a Class feature
					</Modal.Title>
				</Modal.Header>
				
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						{false ? 
							<>
								<InputGroup>
									<InputGroup.Text className="top-left-group" id="FeatureName">Feature: </InputGroup.Text>
									<Form.Control placeholder="Feature" aria-label="Feature Name" aria-describedby="feature-name"/>

									<InputGroup.Text id="FeatureLevel">Level: </InputGroup.Text>
									<Form.Control className="top-right-group" placeholder="Level" aria-label="Feature Level" aria-describedby="feature-level"/>
								</InputGroup>
								<InputGroup>
									<InputGroup.Text className="middle-left-group" id="FeatureClass">Class: </InputGroup.Text>
									<Form.Control placeholder="Class" aria-label="Feature Class" aria-describedby="feature-class"/>

									<InputGroup.Text id="FeatureSubclass">Sub Class: </InputGroup.Text>
									<Form.Control className="middle-right-group" placeholder="Subclass" aria-label="Feature Subclass" aria-describedby="feature-subclass"/>
								</InputGroup>
								<InputGroup>
									<InputGroup.Text className="bottom-left-group">Feature Description: </InputGroup.Text>
									<Form.Control className="bottom-right-group" as="textarea" aria-label="feature-description" />
								</InputGroup>
							</> :
							<FloatingLabel controlId="test-floating-label"  label="Name">
								<Form.Control placeholder=""/>
							</FloatingLabel>
						}
					</Modal.Body>
						
					<Modal.Footer>
						<Button variant="danger" type="button" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Save Changes
						</Button>
					</Modal.Footer>
					
				</Form>
			</Modal>

			<div id="features-list">
				{features.map((feature, index) => (
					<FeatureList feature={feature} id={index} key={`features-list-feature-${feature.name}-${index}`}/>
				))}
			</div>
			<Button variant="primary" style={{width:"100%"}} onClick={handleShow}>
				Add a feature
			</Button>

		</>
	)
}