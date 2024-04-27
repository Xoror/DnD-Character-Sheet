import React from 'react'
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from './BootstrapReplace/Container.jsx';
import Row from './BootstrapReplace/Row.jsx';
import Col from './BootstrapReplace/Col.jsx';

// Add code to import the components
import { MiscInfo } from './features/charDetails/CharMisc.jsx'
import { CharacterClass } from "./features/charDetails/CharClass.jsx"
import { CharacterName } from "./features/charDetails/CharName.jsx"
import { Attributes } from './features/attributes/AttributeBox.jsx'
import { MiscAttributes } from "./features/miscAttributes/MiscAttributes.jsx"
import { ResourcesMiscProficiencies } from './features/resources/ResourcesMiscProficiencies.jsx'
import { SpellBox } from "./features/spells/SpellBox.jsx"
import { ThirdColumn } from './features/classFeatures/3rdColumn.jsx'
import { ResistancesBox } from './features/charDetails/ResistancesBox.jsx'
import { MiscBar } from './features/conditions/MiscBar.jsx'
import { DiceLog } from './features/settings/DiceLog.jsx';


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
                    <Col xl lg={12} md={12} className="right-column">
                        <ResistancesBox/>
                        <ThirdColumn/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}