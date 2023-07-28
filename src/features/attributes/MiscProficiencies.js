import React from 'react';
import { useSelector } from "react-redux"


import { MiscProficienciesList } from './MiscProficienciesList';

export const MiscProficiencies = () => {
	const proficienciesTypes = useSelector(state => state.attributes.proficienciesTypes)
	const skills = useSelector(state => state.attributes.skills)
	return (
		<div className="container-fluid" style={{marginRight:"2em"}}>
			<div className="col">
				{proficienciesTypes.map((proficiencyType, index) => (
						<MiscProficienciesList key={`prof-list-of-type-${proficiencyType.label}`} id={proficiencyType.label} name={proficiencyType.label} skills={skills.filter((skill) => {return skill.supSkill === proficiencyType.label})}/>
					))}
			</div>
		</div>
	);
}