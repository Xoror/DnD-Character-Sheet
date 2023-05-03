import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css"

import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";
import { MdUnfoldMoreDouble, MdUnfoldLessDouble } from "react-icons/md";

import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

// Add code to import the components
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
	const [showMiscBar, setShowMiscBar] = useState(true)
	const setShow = () => {
		setShowMiscBar(!showMiscBar)
	}
	return (
		<>
			<div>
				<NavBar/>
			</div>
			<Container fluid className="main-style">
				<div className='row justify-content-md-center' style={{paddingBottom:"6px"}}>
					<div className='col col-lg-3 left-box'>
						<CharacterName/>
					</div>
					<div className='col-lg-auto middle-box'>
						<MiscInfo />
					</div>
					<div className='col col-lg-3 right-box'>
						<CharacterClass />
					</div>
				</div>
				<div className="row">
					<CardGroup style={{paddingBottom:"6px"}}>
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
				</div>
				<div className='row'>
					<div className='col-md-auto' style={{paddingRight:"0"}}>
						<Attributes/>
					</div>
					<div className='col-md-auto' style={{padding:"0"}}>
						<div>
							<MiscAttributes/>
						</div>
						<div>
							<SpellBox/>
						</div>
						<div>
							<ResourcesMiscProficiencies/>
						</div>
					</div>
					<div className='col-md' style={{paddingLeft:"0"}}>
						<ResistancesBox/>
						<ThirdColumn/>
					</div>
				</div>
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
		</>
    )
}

export default App
