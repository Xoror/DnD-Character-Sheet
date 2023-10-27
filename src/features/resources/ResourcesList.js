import React from 'react';

import { ResourceBox } from './ResourceBox';
import { PaginationControl } from '../../components/PaginationControl';

export const ResourcesList = (props) => {
	const resources = props.resources
	return(
		<div className="resource-list">
			<PaginationControl>
				{resources.map((resource, index) => (
					<ResourceBox resource={resource} key={`resource-box-${resource.id}`}/>
				))}
			</PaginationControl>
		</div>
	)
}