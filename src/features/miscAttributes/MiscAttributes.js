import React from 'react';
import { useSelector } from "react-redux"

//import Card from 'react-bootstrap/Card';
import Card from '../../BootstrapReplace/Card';
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
	)
}