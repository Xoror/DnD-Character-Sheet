import React from "react";
import { useDispatch} from "react-redux"

//import Button from 'react-bootstrap/Button'
import Button from '../../BootstrapReplace/CustomButton';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup'
//import Modal from "react-bootstrap/Modal"
import Modal from '../../BootstrapReplace/Modal';

export const ContainerAdd = (props) => {
    const dispatch = useDispatch()
    
    let oldData = structuredClone(props.defaultContainerValues)
    const handleContainerClick = props.handleContainerClick

    const showAddContainer = props.showAddContainer
    const setShowAddContainer = props.setShowAddContainer

    const defaultContainerValues = props.defaultContainerValues
    const setDefaultContainerValues = props.setDefaultContainerValues

    const containerEditing = props.containerEditing
    const setContainerEditing = props.setContainerEditing

    const containerTemplate = props.containerTemplate
    const handleContainerSelectValues = props.handleContainerSelectValues
    

    return (
        <Modal backdrop="static" aria-labelledby="add-new-container-dialog" size="lg" show={showAddContainer} onHide={() => (setShowAddContainer(false), setContainerEditing(false), setDefaultContainerValues(containerTemplate))}>
            <Modal.Header closeButton>
                <Modal.Title as="label" id="add-new-container-dialog">
                    Add/Edit a new Container
                </Modal.Title>
            </Modal.Header>

            <Form aria-labelledby="add-new-container" onSubmit={(event) => (handleContainerClick(event, oldData))}>
                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Text as="label" id="add-new-container" className="top-left-group top-right-group" style={{flexGrow:"2"}}> {containerEditing ? ("Currently editing: " + defaultContainerValues.label) : "Add New Container" } </InputGroup.Text> 
                        {containerEditing ? <Button className="top-right-group" onClick={() => (setContainerEditing(false), setDefaultContainerValues(containerTemplate))}>Cancel</Button> : ""}
                    </InputGroup>
                    <FloatingLabel controlId="container-label" label="Name">
                        <Form.Control 
                            className="middle-left-group middle-right-group"
                            value={defaultContainerValues.label} 
                            required 
                            placeholder="Name" 
                            aria-labelledby="container-label" 
                            onChange={event => handleContainerSelectValues(event, "label")}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="container-weight" label="Container Weight">
                        <Form.Control 
                            className="middle-left-group middle-right-group"
                            value={defaultContainerValues.weight} 
                            required 
                            placeholder="Weight (lbs)" 
                            aria-labelledby="container-weight"
                            type="number" 
                            min="0" 
                            onChange={event => handleContainerSelectValues(event, "weight")}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="container-maximum-weight-allowed-in" label="Maximum Weight allowed in container">
                        <Form.Control
                            className="bottom-right-group bottom-left-group"
                            value={defaultContainerValues.maxWeightIn} 
                            required 
                            placeholder="Weight (lbs)" 
                            aria-labelledby="container-maximum-weight-allowed-in"
                            type="number" 
                            min="0" 
                            onChange={event => handleContainerSelectValues(event, "maxWeightIn")}
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="button" onClick={() => (setShowAddContainer(false), setContainerEditing(false), setDefaultContainerValues(containerTemplate))}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}