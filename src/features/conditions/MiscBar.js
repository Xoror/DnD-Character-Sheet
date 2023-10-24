import React, { useState } from 'react';

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
            {false ? <Col lg="auto" md="auto" sm="auto" style={{padding:"0"}}>
                <Button aria-labelledby="fold-unfold-misc-bar" style={{paddingLeft:"0.25em", paddingRight:"0.25em", border:"1px solid black", borderRadius:"0.375em 0 0 0.375em", height:"100%"}} onClick={setShow}>
                    {showMiscBar ? <MdUnfoldLessDouble aria-labelledby="fold-unfold-misc-bar" size="1.5em"/> : <MdUnfoldMoreDouble size="1.5em"/>}
                    <label className="visually-hidden" id="fold-unfold-misc-bar">{showMiscBar ? "Collapse condition/lanugages/senses bar" : "Expand condition/lanugages/senses bar"}</label>
                </Button>
            </Col > : null}
            <ConditionsBox showMiscBar={showMiscBar} setShow={setShow} show={showMiscBar}/>
            <LanguageBox show={showMiscBar}/>
            <SensesBox showMiscBar={showMiscBar} setShow={setShow} show={showMiscBar}/>
            {false ? <Col lg="auto" md="auto" sm="auto" style={{padding:"0"}}>
                <Button style={{paddingLeft:"0.25em", paddingRight:"0.25em", border:"1px solid black", borderRadius:"0 0.375em 0.375em 0", height:"100%"}} onClick={setShow}>
                    {showMiscBar ? <MdUnfoldLessDouble size="1.5em"/> : <MdUnfoldMoreDouble size="1.5em"/>}
                </Button>
            </Col> : null}
        </>
    )
}