import React from 'react';

import Container from 'react-bootstrap/Container'

import { MiscProficienciesList } from './MiscProficienciesList';

export const MiscProficiencies = (props) => {
	return (
		<div className="misc-prof-list">
			{props.proficienciesTypes.map((proficiencyType, index) => (
					<MiscProficienciesList editing={props.editing} setEditing={props.setEditing} key={`prof-list-of-type-${proficiencyType.label}`} id={proficiencyType.label} name={proficiencyType.label} skills={props.skills.filter((skill) => {return skill.supSkill === proficiencyType.label})}/>
				))}
		</div>
	);
}