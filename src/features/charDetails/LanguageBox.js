import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

//import Col from 'react-bootstrap/Col'
import Col from '../../BootstrapReplace/Col';

import { changeDetails, deleteLanguage } from './CharDetailsSlice';
import { FilterBox } from '../../components/FilterBox';

export const LanguageBox = (props) => {
    const dispatch = useDispatch()
    const languages = useSelector(state => state.charDetails.languages)
    const languagesHas = useSelector(state => state.charDetails.languages)

    const handleCreate = (event, id) => {
        event.preventDefault()
        dispatch(changeDetails([event.target[0].value, id]))
    }
    const handleDelete = (event, index, type) => {
        event.preventDefault()
        dispatch(deleteLanguage(index))
    }
    return(
        <Col className="miscbar-col three">
            <FilterBox show={props.show} header="Languages" data={languages} handleDelete={handleDelete} handleCreate={handleCreate} creatable="true"/>
        </Col>
    )
}
/*
<Card border="dark" bg="secondary" style={{minWidth:"4em", paddingTop:"0.5em", paddingBottom:"0.5em"}}>
    <FilterBox show={props.show} header="Languages" data={languages} test="knows" handleDelete={handleDelete} handleCreate={handleCreate} creatable="true"/>
</Card>
*/
