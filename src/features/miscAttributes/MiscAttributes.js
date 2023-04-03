import React from 'react';
import { useSelector } from "react-redux"

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import "../styles.css"

import { HPBox } from "./HPBox";
import { AttributeBox } from './SoloAttributeBox';

export const MiscAttributes = () => {
    const initiative = useSelector(state => state.attributes.initiative)
    const proficiency = useSelector(state => state.attributes.proficiency)
    const charAC = useSelector(state => state.attributes.charAC)
    const speed = useSelector(state => state.miscAttributes.speed)
	const charHP = useSelector(state => state.miscAttributes.charHP)

	return (
		<div className="container-fluid">
			<CardGroup style={{marginBottom: "-1em"}}>
				<Card bg="secondary" border="dark" className="mb-3" style={{borderRadius:"0.375em 0em 0em 0em"}}>
					<AttributeBox name="Initiative" attribute={initiative} />
				</Card>
				<Card bg="secondary" border="dark" className="mb-3">
					<AttributeBox name="Proficiency Bonus" attribute={proficiency}/>
				</Card>
				<Card bg="secondary" border="dark" className="mb-3" style={{borderRadius:"0em 0.375em 0em 0em"}}>
					<AttributeBox name="AC" attribute={charAC}/>
				</Card>
			</CardGroup>
			<CardGroup>
				<Card bg="secondary" border="dark" style={{flexGrow: 2, height: "flex", borderRadius:"0em 0em 0em 0.375em"}}>
					<HPBox charHP={charHP}/>
				</Card>
				<Card bg="secondary" border="dark" style={{borderRadius:"0em 0em 0.375em 0em"}}>
					<AttributeBox name="Speed" attribute={speed} />
				</Card>			
			</CardGroup>
		</div>
	)
}