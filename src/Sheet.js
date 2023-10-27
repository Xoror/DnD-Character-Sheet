import React from 'react'
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Add code to import the components
import { MiscInfo } from './features/charDetails/CharMisc'
import { CharacterClass } from "./features/charDetails/CharClass"
import { CharacterName } from "./features/charDetails/CharName"
import { Attributes } from './features/attributes/AttributeBox'
import { MiscAttributes } from "./features/miscAttributes/MiscAttributes"
import { ResourcesMiscProficiencies } from './features/resources/ResourcesMiscProficiencies'
import { SpellBox } from "./features/spells/SpellBox.js"
import { ThirdColumn } from './features/classFeatures/3rdColumn'
import { ResistancesBox } from './features/charDetails/ResistancesBox'
import { MiscBar } from './features/conditions/MiscBar'
import { DiceLog } from './features/settings/DiceLog';


export const Sheet = () => {
    return (
        <>
            <DiceLog />
            <Container fluid className="main-style">
                <Row className="justify-content-md-center" style={{paddingBottom:"0.5em", paddingRight:"0.75em", paddingLeft:"0.75em"}}>
                    <Col lg={{order:1, span:3}} md={{order:1, span:6}} sm={{order:1, span:6}} className="left-box">
                        <CharacterName/>
                    </Col>
                    <Col lg={{order:2, span:"auto"}} md={{order:3}} sm= {{order:3}} className='middle-box'>
                        <MiscInfo />
                    </Col>
                    <Col lg={{order:3, span:3}} md={{order:2, span:6}} sm= {{order:2, span:6}} className="right-box">
                        <CharacterClass />
                    </Col>
                </Row>
                <Row lg={4} md={2} sm={1} xs={1} style={{paddingBottom:"0.5em", paddingRight:"0.75em", paddingLeft:"0.75em"}}>
                    <MiscBar/>
                </Row>
                <Row style={{paddingBottom:"0.5em", paddingRight:"0.75em", paddingLeft:"0.75em"}}>
                    <Col xl="auto" lg={6} md className="left-column">
                        <Attributes/>
                    </Col>
                    <Col xl="auto" lg={6} md="auto" className="middle-column">
                        <MiscAttributes/>
                        <SpellBox/>
                        <ResourcesMiscProficiencies/>
                    </Col>
                    <Col xl md={12} className="right-column">
                        <ResistancesBox/>
                        <ThirdColumn/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}