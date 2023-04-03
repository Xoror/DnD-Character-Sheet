import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MDBFooter, MDBContainer, MDBIcon, MDBBtn} from 'mdb-react-ui-kit';

import "./App.css"

import Container from 'react-bootstrap/Container';

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


const App = () => {
	return (
		<>
			<div>
				<NavBar/>
			</div>
			<Container fluid className="main-style">
				<div className='row justify-content-md-center' style={{paddingBottom:"12px"}}>
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
				<h3 className='mt-3'>Change allocation</h3>
				<div className='row mt-3'>
					<div className='col-sm'>
						
					</div>
				</div>
			</Container>
			<MDBFooter className='text-center' color='white' bgColor='dark'>
				<MDBContainer className='p-4'>
					<section className='mb-4'>
					<MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
						<MDBIcon fab icon='twitter' />
					</MDBBtn>

					<MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
						<MDBIcon fab icon='github' />
					</MDBBtn>
					</section>

					<section className='mb-4'>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
						voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
						sequi voluptate quas.
					</p>
					</section>

				</MDBContainer>

				<div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
					© 2020 Copyright: Stargazer Works
				</div>
			</MDBFooter>
		</>
    )
}

export default App
