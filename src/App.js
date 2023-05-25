import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css"

import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";
import { MdUnfoldMoreDouble, MdUnfoldLessDouble } from "react-icons/md";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

// Add code to import the components
import { ScrollBar } from './features/scrollbar/ScrollBar';
import { NavBar } from "./features/nav/NavBar"
import { MiscInfo } from './features/charDetails/CharMisc'
import { CharacterClass } from "./features/charDetails/CharClass"
import { CharacterName } from "./features/charDetails/CharName"
import { Attributes } from './features/attributes/AttributeBox'
import { MiscAttributes } from "./features/miscAttributes/MiscAttributes"
import { ResourcesMiscProficiencies } from './features/resources/ResourcesMiscProficiencies'
import { SpellBox } from "./features/spells/SpellBox.js"
import { ThirdColumn } from './features/classFeatures/3rdColumn'
import { ConditionsBox } from './features/conditions/ConditionsBox'
import { LanguageBox } from './features/charDetails/LanguageBox'
import { SensesBox } from './features/charDetails/SensesBox'
import { ResistancesBox } from './features/charDetails/ResistancesBox';


const App = () => {
	const full_state = useSelector(state => state)
	const [showMiscBar, setShowMiscBar] = useState(true)
	const setShow = () => {
		setShowMiscBar(!showMiscBar)
	}
	useEffect(() => {
		//console.log(full_state)
	},[full_state])
	return (
		<>
			<ScrollBar>
				<NavBar/>
				<div> 
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
							<section className='mb-4'>
								<button>
									<AiFillTwitterCircle size="40px"/>
								</button>
								<button>
									<AiFillGithub size="40px"/>
								</button>
							</section>

							<section className='mb-4'>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
								voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
								sequi voluptate quas.
							</p>
							</section>

						</Container>

						<div className='text-center p-3' style={{ backgroundColor: '#1a1e21' }}>
							© 2023 Copyright: Stargazer Works
						</div>
					</div>
				</div>
			</ScrollBar>
		</>
    )
}

export default App
/*
<CardGroup style={{paddingBottom:"0.5em", paddingRight:"1.25em"}}>
	<Button style={{paddingLeft:"0.25em", paddingRight:"0.25em", border:"1px solid black", borderRadius:"0.375em 0 0 0.375em"}} onClick={setShow}>
		{showMiscBar ? <MdUnfoldLessDouble size="1.5em"/> : <MdUnfoldMoreDouble size="1.5em"/>}
	</Button>
	<ConditionsBox show={showMiscBar}/>
	<LanguageBox show={showMiscBar}/>
	<SensesBox show={showMiscBar}/>
	<Button style={{paddingLeft:"0.25em", paddingRight:"0.25em", border:"1px solid black", borderRadius:"0 0.375em 0.375em 0"}} onClick={setShow}>
		{showMiscBar ? <MdUnfoldLessDouble size="1.5em"/> : <MdUnfoldMoreDouble size="1.5em"/>}
	</Button>
</CardGroup>
*/