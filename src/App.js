import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css"

import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

// Add code to import the components
import { NavBar } from "./features/nav/NavBar"
import { MiscInfo } from './features/charDetails/CharMisc'
import { CharacterClass } from "./features/charDetails/CharClass"
import { CharacterName } from "./features/charDetails/CharName"
import { Attributes } from './features/attributes/AttributeBox'
import { MiscAttributes } from "./features/miscAttributes/MiscAttributes"
import { ResourcesMiscProficiencies } from './features/resources/ResourcesMiscProficiencies'
import { SpellCard } from "./features/spells/SpellCard.js"
import { ThirdColumn } from './features/classFeatures/3rdColumn';
import { ConditionsBox } from './features/conditions/ConditionsBox';


const App = () => {
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
						<ConditionsBox/>
						<Card border="dark" bg="secondary">
							
						</Card>
						<Card border="dark" bg="secondary">
							
						</Card>
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
							<SpellCard/>
						</div>
						<div>
							<ResourcesMiscProficiencies/>
						</div>
					</div>
					<div className='col-md' style={{paddingLeft:"0"}}>
						<ThirdColumn/>
					</div>
				</div>

				<div className='row mt-3'>
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
