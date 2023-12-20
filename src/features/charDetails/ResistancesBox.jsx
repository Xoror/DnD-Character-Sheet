import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import { MdUnfoldMoreDouble, MdUnfoldLessDouble } from "react-icons/md";

import Container from '../../BootstrapReplace/Container';
import Row from '../../BootstrapReplace/Row';
import Col from '../../BootstrapReplace/Col';
import Button from '../../BootstrapReplace/CustomButton';

import { FilterBox } from '../../components/FilterBox';
import { deleteResistances, changeDetails } from './CharDetailsSlice';

export const ResistancesBox = () => {
    const dispatch = useDispatch()
    const resistances = useSelector(state => state.charDetails.resistances)
    const immunities = useSelector(state => state.charDetails.immunities)
    const vulnerabilities = useSelector(state => state.charDetails.vulnerabilities)
    const handleCreate = (event, id) => {
        event.preventDefault()
        dispatch(changeDetails([event.target[0].value, id]))
    }
    const handleDelete = (event, item, type) => {
        dispatch(deleteResistances([type, item]))
    }
    const [showDetails, setShowDetails] = useState(true)

    return(
        <Container fluid>
            <Row>
                <Col className="main-element-card" style={{padding:"0.5em", borderRadius:"0.375em 0 0 0.375em"}}> 
                    { showDetails ? 
                    <>
                        <FilterBox
                            header="Resistances"
                            data={resistances}
                            handleDelete={handleDelete}
                            handleCreate={handleCreate}
                            defaultSelectValue=""
                            creatable={true}
                            type="resistances"
                        />
                        <FilterBox
                            header="Immunities"
                            data={immunities}
                            handleDelete={handleDelete}
                            handleCreate={handleCreate}
                            defaultSelectValue=""
                            creatable={true}
                            type="immunities"
                        />
                        <FilterBox
                            header="Vulnerabilities"
                            data={vulnerabilities}
                            handleDelete={handleDelete}
                            handleCreate={handleCreate}
                            defaultSelectValue=""
                            creatable={true}
                            type="vulnerabilities"
                        />
                    </> : <span style={{paddingLeft:"0.75em"}}> Resistances/Immunities/Vulnerabilities: [...] </span>} 
                </Col>
                <Col xs="auto" style={{padding:"0"}}>
                    <Button style={{height:"100%", paddingLeft:"0.25em", paddingRight:"0.25em", border:"1px solid black", borderRadius:"0 0.375em 0.375em 0"}} onClick={() => setShowDetails(!showDetails)}>
                        {showDetails ? <MdUnfoldLessDouble size="1.5em"/> : <MdUnfoldMoreDouble size="1.5em"/>}
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}