import React from 'react';
import { useDispatch, useSelector } from "react-redux"

import {fullCaster, halfCaster, thirdCaster, pactCaster, halfPactCaster} from "../../data/spellSlots.js";
import { changeSpellslot } from './SpellSlice';

export const SpellSlotTable = (props) => {
	const dispatch = useDispatch()
    const spellSlots = useSelector(state => state.spells.spellSlots)
	
	const handleSpellMatrix = (event, Row, Column) => {
		dispatch(changeSpellslot([Row, Column, event.target.checked]))
	}
	
	
	const listSlots = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
	var casterLevel = structuredClone(props.level)

	if(casterLevel === "" || casterLevel < 1) {
		casterLevel = "1"
	}
	
	const casterType = structuredClone(props.casting.type)
	var filteredSlots = []
	if(casterType === "full") {
		filteredSlots = fullCaster.filter((test) => {return test.level === parseInt(casterLevel)})[0].slots
	}
	else if(casterType === "half") {
		filteredSlots = halfCaster.filter((test) => {return test.level === parseInt(casterLevel)})[0].slots
	}
	else if(casterType === "third") {
		filteredSlots = thirdCaster.filter((test) => {return test.level === parseInt(casterLevel)})[0].slots
	}
	else if(casterType === "pact") {
		filteredSlots = pactCaster.filter((test) => {return test.level === parseInt(casterLevel)})[0].slots
	}
	else if(casterType === "halfpact") {
		filteredSlots = halfPactCaster.filter((test) => {return test.level === parseInt(casterLevel)})[0].slots
	}
	
	
	var reverseSlots = structuredClone(filteredSlots).reverse()
	var counter = reverseSlots.length
	var spellMatrix = []
	if(filteredSlots.length > 0) {
		for (let i=0; i<reverseSlots.length;i++) {
			for (let j= i>0 ? reverseSlots[i-1]:0 ; j<reverseSlots[i];j++) {
				var testArray = []
				if(j != reverseSlots[i]) {
					for(let k=0; k<counter-i;k++) {
						testArray.push(0)
					}
					spellMatrix.push(testArray)
				}
			}
			
		}
	}

	if(casterType === "full" || casterType === "half" || casterType === "third") {
		return (
			<>
				<label>Spell slots</label>
				<table className="spell-slot-table">
					<thead>
						<tr>
							{filteredSlots.map((slot, index) => (
								<td key={`${listSlots[index]}-tier-spell-slots`} id={`${listSlots[index]}-tier-spell-slots`}> {listSlots[index]} </td>
							))}
						</tr>
					</thead>
					<tbody>
						{spellMatrix.map((row,indexRow) => (
							<tr key={indexRow}>
								{row.map((piece, indexColumn) => (
									<td key={indexColumn}> 
										<input type="checkbox" aria-labelledby={`${listSlots[indexColumn]}-tier-spell-slots`} checked={spellSlots[indexRow][indexColumn]} onChange={(event) => handleSpellMatrix(event, indexRow, indexColumn)}></input>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</>
		)
	}
	else if (casterType === "pact" || casterType === "halfpact") {
		const indexColumn = 0
		return (
			<>
				<label>Spell slots</label>
				<table className="spell-slot-table">
					<thead>
						<tr>
							<td> {spellMatrix[0] != undefined ? listSlots[(spellMatrix[0].length)-1]:"1st" } </td>
						</tr>
					</thead>
					<tbody>
						<tr>
							{spellMatrix.map((row,indexRow) => (
								<td key={indexRow}>
									<td> <input type="checkbox" checked={spellSlots[indexRow][indexColumn]} onChange={(event) => handleSpellMatrix(event, indexRow, indexColumn)}></input> </td>
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</>
		)
	}

}