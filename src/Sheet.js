import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import version from '../package.json'

import { AiFillTwitterCircle, AiOutlineGithub } from "react-icons/ai"
import { FaReact } from "react-icons/fa";
import { GiDiceTwentyFacesOne } from "react-icons/gi";

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

export const Sheet = () => {
    return (
        <>
            <Container fluid className="main-style">
                <Row className="justify-content-md-center" style={{paddingBottom:"0.5em", paddingRight:"1.25em", paddingLeft:"0.75em"}}>
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
                <Row style={{paddingBottom:"0.5em", paddingRight:"1.25em"}}>
                    <MiscBar/>
                </Row>
                <Row>
                    <Col xl="auto" lg={6} md="auto" className="left-column">
                        <Attributes/>
                    </Col>
                    <Col xl="auto" lg={6} md className="middle-column">
                        <div>
                            <MiscAttributes/>
                        </div>
                        <div>
                            <SpellBox/>
                        </div>
                        <div>
                            <ResourcesMiscProficiencies/>
                        </div>
                    </Col>
                    <Col xl md={12} className="right-column">
                        <ResistancesBox/>
                        <ThirdColumn/>
                    </Col>
                </Row>
            </Container>

            <div className="footer">
                <Container className='p-3'>
                    <section className='mb-4'>
                        <a tabIndex="0" className="link-button" style={{marginRight:"0.25em"}} target="_blank" rel="noreferrer" href="https://twitter.com/StargazerWorks">
                            <AiFillTwitterCircle style={{position: "relative"}} size="3.5em"/>
                        </a>
                        <a tabIndex="0" className="link-button" style={{marginLeft:"0.25em"}} target="_blank" rel="noreferrer" href="https://github.com/Xoror/sheettest_redux">
                            <AiOutlineGithub style={{position: "relative"}} size="3.5em"/>
                        </a>
                    </section>

                    <section>
                        <p style={{marginBottom:"0em", height:"2.5em"}}>
                            Powered by React  
                                <a target="_blank" rel="noreferrer" href="https://react.dev/" tabIndex="0" className="home-button" id="react-link-button" aria-label="link to th3 react website" style={{marginLeft:"0.25em",width:"2.5em", height:"2.5em",display:"inline-block"}}>
                                    <FaReact size="2em" style={{position: "relative", right: "1px", bottom: "1px"}}/>
                                </a>
                            and the DnD 5e API
                                <a target="_blank" rel="noreferrer" href="https://www.dnd5eapi.co/" tabIndex="0" className="home-button" id="dnd-5e-api-link-button" aria-label="link to the dnd 5e api website" style={{marginLeft:"0.25em",width:"2.5em", height:"2.5em",display:"inline-block"}}>
                                    <GiDiceTwentyFacesOne size="2em" style={{position: "relative", right: "1px", bottom: "1px"}}/>
                                </a>
                        </p>
                    </section>
                    <section>
                        For problems, comments, bugs etc. contact us  <a href="mailto: stargazerworks.ttrpg@gmail.com">stargazerworks.ttrpg@gmail.com</a> !
                    </section>

                </Container>

                <div className='text-center p-3' style={{ backgroundColor: '#1a1e21' }}>
                    © 2023 Copyright: Stargazer Works, Version {version.version}
                </div>
            </div>
        </>
    )
}