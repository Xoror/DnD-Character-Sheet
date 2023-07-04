import React from 'react';
import { useSelector } from "react-redux"


import { MiscProficienciesList } from './MiscProficienciesList';

export const MiscProficiencies = () => {
	const proficienciesTypes = useSelector(state => state.attributes.proficienciesTypes)
	return (
		<div className="container-fluid" style={{marginRight:"2em"}}>
			<div className="col">
				{proficienciesTypes.map((proficiencyType, index) => (
						<MiscProficienciesList key={index} id={index} name={proficiencyType.label}/>
					))}
			</div>
		</div>
	);
}