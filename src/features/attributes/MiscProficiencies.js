import React from 'react';


import { MiscProficienciesList } from './MiscProficienciesList';

export const MiscProficiencies = (props) => {
	return (
		<div className="container-fluid" style={{marginRight:"2em"}}>
			<div className="col">
				{props.proficienciesTypes.map((proficiencyType, index) => (
						<MiscProficienciesList key={`prof-list-of-type-${proficiencyType.label}`} id={proficiencyType.label} name={proficiencyType.label} skills={props.skills.filter((skill) => {return skill.supSkill === proficiencyType.label})}/>
					))}
			</div>
		</div>
	);
}