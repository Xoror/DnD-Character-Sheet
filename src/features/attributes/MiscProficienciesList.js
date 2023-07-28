import React from 'react';

import { SkillItem } from './AttributeSkills';

export const MiscProficienciesList = (props) => {
	return (
		<dl>
			<dt>{props.name}</dt>
			{props.skills.map((skill) => (
					<SkillItem key={skill.id} skill2={skill}/>
				))}
		</dl>
	);
}