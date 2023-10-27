import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"

import Button from 'react-bootstrap/Button';
import { Button as CustomButton} from '../../components/CustomButton';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


import { FeatureList } from "./FeaturesList";
import { addFeature } from './FeaturesSlice';
import { CustomModal } from '../../components/CustomModal';

export default function FeaturesBox() {
	const dispatch = useDispatch();
    const features = useSelector(state => state.features.data)

    const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(addFeature({
            name: event.target[0].value, 
            level: event.target[1].value, 
            featureClass: event.target[2].value, 
			featureSubclass:event.target[3].value, 
            description: event.target[4].value
        }))
	}
	
	return (
		<>
			<Modal contentClassName="modal-custom" size="lg" /*show={show}*/ onHide={handleClose}>
				<Modal.Header closeButton onClick={handleClose}>
					<Modal.Title>
						Adding a Class feature
					</Modal.Title>
				</Modal.Header>
				
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
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
					</Modal.Body>
						
					<Modal.Footer>
						<Button variant="danger" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Save Changes
						</Button>
					</Modal.Footer>
					
				</Form>
			</Modal>
			<CustomModal show={show}>
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
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
					</Modal.Body>
						
					<Modal.Footer>
						<Button variant="danger" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Save Changes
						</Button>
					</Modal.Footer>
					
				</Form>
			</CustomModal>

			<div id="features-list">
				{features.map((feature, index) => (
					<FeatureList feature={feature} id={index} key={`features-list-feature-${feature.name}-${index}`}/>
				))}
			</div>
			{true ? <Button style={{width:"100%"}} onClick={handleShow}>
				Add a feature
			</Button> :
			<CustomButton style={{width:"100%"}} variant="blue">
				Add a feature
			</CustomButton>
			}
		</>
	)
}