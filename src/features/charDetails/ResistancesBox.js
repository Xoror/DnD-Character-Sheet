import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import { MdUnfoldMoreDouble, MdUnfoldLessDouble } from "react-icons/md";

import Card from 'react-bootstrap/Card';
import { CardGroup, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

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
    const handleDelete = (event, index, type) => {
        dispatch(deleteResistances([type, index]))
    }
    const [showDetails, setShowDetails] = useState(true)

    return(
        <Container fluid style={{paddingLeft:"0", paddingRight:"0"}}>
            <CardGroup>
                <Card bg="secondary" border="dark" style={{paddingTop:"0.5em", paddingBottom:"0.5em"}}> 
                    { showDetails ? 
                    <>
                        <FilterBox
                            header="Resistances"
                            data={resistances}
                            test="has"
                            handleDelete={handleDelete}
                            handleCreate={handleCreate}
                            defaultSelectValue=""
                            creatable={true}
                            type="resistances"
                        />
                        <FilterBox
                            header="Immunities"
                            data={immunities}
                            test="has"
                            handleDelete={handleDelete}
                            handleCreate={handleCreate}
                            defaultSelectValue=""
                            creatable={true}
                            type="immunities"
                        />
                        <FilterBox
                            header="Vulnerabilities"
                            data={vulnerabilities}
                            test="has"
                            handleDelete={handleDelete}
                            handleCreate={handleCreate}
                            defaultSelectValue=""
                            creatable={true}
                            type="vulnerabilities"
                        />
                    </> : <span style={{paddingLeft:"0.75em"}}> Resistances/Immunities/Vulnerabilities: [...] </span>} 
                </Card>
                <Button style={{paddingLeft:"0.25em", paddingRight:"0.25em", border:"1px solid black", borderRadius:"0 0.375em 0.375em 0"}} onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? <MdUnfoldLessDouble size="1.5em"/> : <MdUnfoldMoreDouble size="1.5em"/>}
                </Button>
            </CardGroup>
        </Container>
    )
}