import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"

import Button from '../../BootstrapReplace/CustomButton';
import Modal from '../../BootstrapReplace/Modal';
import Form from '../../BootstrapReplace/Form';
import FloatingLabel from '../../BootstrapReplace/FloatingLabel';
import InputGroup from '../../BootstrapReplace/InputGroup';

import { FeatureList } from "./FeaturesList";
import { addFeature } from './FeaturesSlice';

const FeaturesBox = () => {
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
			<Modal backdrop aria-labelledby="add-class-feature" size="lg" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title id="add-class-feature">
						Adding a Class feature
					</Modal.Title>
				</Modal.Header>
				
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						{true ? 
							<>
								<InputGroup>
									<InputGroup.Text className="top-left-group" id="FeatureName">Feature: </InputGroup.Text>
									<Form.Control required placeholder="Feature" aria-label="Feature Name" aria-describedby="feature-name"/>

									<InputGroup.Text id="FeatureLevel">Level: </InputGroup.Text>
									<Form.Control required className="top-right-group" placeholder="Level" aria-label="Feature Level" aria-describedby="feature-level"/>
								</InputGroup>
								<InputGroup>
									<InputGroup.Text className="middle-left-group" id="FeatureClass">Class: </InputGroup.Text>
									<Form.Control required placeholder="Class" aria-label="Feature Class" aria-describedby="feature-class"/>

									<InputGroup.Text id="FeatureSubclass">Sub Class: </InputGroup.Text>
									<Form.Control required className="middle-right-group" placeholder="Subclass" aria-label="Feature Subclass" aria-describedby="feature-subclass"/>
								</InputGroup>
								<InputGroup>
									<InputGroup.Text className="bottom-left-group">Feature Description: </InputGroup.Text>
									<Form.Control required className="bottom-right-group" as="textarea" aria-label="feature-description" />
								</InputGroup>
							</> :
							<FloatingLabel controlId="test-floating-label"  label="Name">
								<Form.Control required placeholder=""/>
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

			<div className="features-list" id="features-list">
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

export default FeaturesBox