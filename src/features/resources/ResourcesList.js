import React from 'react';
import { useSelector } from "react-redux"


import { ResourceBox } from './ResourceBox';

export const ResourcesList = () => {
	const resources = useSelector(state => state.resources.data)
	return(
		<div>
			{resources.map((resource, index) => (
					<ResourceBox resource={resource} id={index} key={index}/>
				))}
		</div>
	)
}