import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import "../styles.css"

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