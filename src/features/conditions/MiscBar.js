import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { MdUnfoldMoreDouble, MdUnfoldLessDouble } from "react-icons/md"

import { ConditionsBox } from './ConditionsBox'
import { LanguageBox } from '../charDetails/LanguageBox'
import { SensesBox } from '../charDetails/SensesBox'

export const MiscBar = () => {
    const [showMiscBar, setShowMiscBar] = useState(true)
	const setShow = () => {
		setShowMiscBar(!showMiscBar)
	}
    return (
        <>
            <Col sm="auto" style={{paddingRight:"0"}}>
                <Button style={{paddingLeft:"0.25em", paddingRight:"0.25em", border:"1px solid black", borderRadius:"0.375em 0 0 0.375em", height:"100%"}} onClick={setShow}>
                    {showMiscBar ? <MdUnfoldLessDouble size="1.5em"/> : <MdUnfoldMoreDouble size="1.5em"/>}
                </Button>
            </Col>
                <ConditionsBox show={showMiscBar}/>
                <LanguageBox show={showMiscBar}/>
                <SensesBox show={showMiscBar}/>
            <Col sm="auto" style={{padding:"0"}}>
                <Button style={{paddingLeft:"0.25em", paddingRight:"0.25em", border:"1px solid black", borderRadius:"0 0.375em 0.375em 0", height:"100%"}} onClick={setShow}>
                    {showMiscBar ? <MdUnfoldLessDouble size="1.5em"/> : <MdUnfoldMoreDouble size="1.5em"/>}
                </Button>
            </Col>
        </>
    )
}