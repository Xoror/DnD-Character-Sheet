import React from "react";
import { useDispatch} from "react-redux"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from "react-bootstrap/Modal"

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
        <Modal backdrop="static" aria-labelledby="add-new-container-dialog" contentClassName="modal-custom" size="lg" show={showAddContainer} onHide={() => (setShowAddContainer(false), setContainerEditing(false), setDefaultContainerValues(containerTemplate))}>
            <Modal.Header closeButton>
                <Modal.Title as="label" id="add-new-container-dialog">
                    Adding a new Container
                </Modal.Title>
            </Modal.Header>

            <Form aria-labelledby="add-new-container" onSubmit={(event) => (handleContainerClick(event, oldData))}>
                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Text as="label" id="add-new-container" className="top-left-group top-right-group" style={{flexGrow:"2"}}> {containerEditing ? ("Currently editing: " + defaultContainerValues.label) : "Add New Container" } </InputGroup.Text> 
                        {containerEditing ? <Button className="top-right-group" onClick={() => (setContainerEditing(false), setDefaultContainerValues(containerTemplate))}>Cancel</Button> : ""}
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text as="label" id="container-label" className="middle-left-group">Name</InputGroup.Text>
                        <Form.Control 
                            className="middle-right-group"
                            value={defaultContainerValues.label} 
                            required 
                            placeholder="Name" 
                            aria-labelledby="container-label" 
                            onChange={event => handleContainerSelectValues(event, "label")}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text as="label" id="container-weight" className="bottom-left-group">Weighs</InputGroup.Text>
                        <Form.Control 
                            value={defaultContainerValues.weight} 
                            required 
                            placeholder="Weight (lbs)" 
                            aria-labelledby="container-weight"
                            type="number" 
                            min="0" 
                            onChange={event => handleContainerSelectValues(event, "weight")}
                        />
                        <InputGroup.Text as="label" id="container-maximum-weight-allowed-in" className="middle-left-group">Maximum Weight allowed in</InputGroup.Text>
                        <Form.Control
                            className="bottom-right-group"
                            value={defaultContainerValues.maxWeightIn} 
                            required 
                            placeholder="Weight (lbs)" 
                            aria-labelledby="container-maximum-weight-allowed-in"
                            type="number" 
                            min="0" 
                            onChange={event => handleContainerSelectValues(event, "maxWeightIn")}
                        />
                    </InputGroup>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => (setShowAddContainer(false), setContainerEditing(false), setDefaultContainerValues(containerTemplate))}>
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