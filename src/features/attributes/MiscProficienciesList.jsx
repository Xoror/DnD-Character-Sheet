import React from 'react';

import { SkillItem } from './AttributeSkills';

export const MiscProficienciesList = (props) => {
	return (
		<div className="misc-prof-list-item">
			<dl>
				<dt>{props.name}</dt>
				{props.skills.map((skill) => (
						<SkillItem editing={props.editing} setEditing={props.setEditing} key={skill.id} skill2={skill}/>
					))}
			</dl>
		</div>
	);
}