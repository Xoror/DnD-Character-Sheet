import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import version from '../package.json'

import "./App.css"
import "./features/styles.css"

import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai"

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

            <div style = {{textAlign:"center", color:"white", backgroundColor:"#212529"}}>
                <Container className='p-4'>
                    <section>
                        <a target="_blank" rel="noreferrer" href="https://twitter.com/StargazerWorks">
                            <AiFillTwitterCircle size="3.5em"/>
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://github.com/Xoror/sheettest_redux">
                            <AiFillGithub size="3.5em"/>
                        </a>
                    </section>

                    {false ? <section className='mb-4'>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
                        voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
                        sequi voluptate quas.
                    </p>
                    </section> : null}

                </Container>

                <div className='text-center p-3' style={{ backgroundColor: '#1a1e21' }}>
                    © 2023 Copyright: Stargazer Works, Version {version.version}
                </div>
            </div>
        </>
    )
}