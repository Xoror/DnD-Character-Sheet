import React from 'react';
import { useSelector } from "react-redux"

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';


import { HPBox } from "./HPBox";
import { AttributeBox } from './SoloAttributeBox';

export const MiscAttributes = () => {
    const initiative = useSelector(state => state.attributes.initiative)
    const proficiency = useSelector(state => state.attributes.proficiency)
    const charAC = useSelector(state => state.attributes.charAC)
    const speed = useSelector(state => state.miscAttributes.speed)
	const charHP = useSelector(state => state.miscAttributes.charHP)

	return (
		<>
			{false ? 
				<Container fluid style={{padding:"0"}}>
					<CardGroup>
						<Card className="main-element-card" style={{borderRadius:"0.375em 0em 0em 0em"}}>
							<AttributeBox name="Initiative" attribute={initiative} />
						</Card>
						<Card className="main-element-card">
							<AttributeBox name="Proficiency Bonus" attribute={proficiency}/>
						</Card>
						<Card className="main-element-card" style={{borderRadius:"0em 0.375em 0em 0em"}}>
							<AttributeBox name="AC" attribute={charAC}/>
						</Card>
					</CardGroup>
					<CardGroup>
						<Card className="main-element-card" style={{flexGrow: 2, height: "flex", borderRadius:"0em 0em 0em 0.375em"}}>
							<HPBox charHP={charHP}/>
						</Card>
						<Card className="main-element-card" style={{borderRadius:"0em 0em 0.375em 0em"}}>
							<AttributeBox name="Speed" attribute={speed} />
						</Card>			
					</CardGroup>
				</Container> : 
				<Container fluid style={{padding:"0"}}>
					<div style={{display:"grid"}}> 
						<Card className="misc-attribute-card init">
							<AttributeBox name="Initiative" attribute={initiative} />
						</Card>
						<Card className="misc-attribute-card prof">
							<AttributeBox name="Proficiency Bonus" attribute={proficiency}/>
						</Card>
						<Card className="misc-attribute-card ac">
							<AttributeBox name="AC" attribute={charAC}/>
						</Card>
						<Card className="misc-attribute-card hp">
							<HPBox charHP={charHP}/>
						</Card>
						<Card className="misc-attribute-card speed">
							<AttributeBox name="Speed" attribute={speed} />
						</Card>			
					</div>
				</Container>
				}
		</>
	)
}