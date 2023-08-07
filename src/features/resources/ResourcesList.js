import React from 'react';
import { useSelector } from "react-redux"


import { ResourceBox } from './ResourceBox';

export const ResourcesList = (props) => {
	const resources = props.resources
	return(
		<div>
			{resources.map((resource, index) => (
					<ResourceBox resource={resource} id={index} key={`resource-box-${resource.name}`}/>
				))}
		</div>
	)
}