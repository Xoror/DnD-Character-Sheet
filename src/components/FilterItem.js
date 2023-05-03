import React from "react";
import "./FilterBox.css"

import { AiOutlineCloseCircle } from "react-icons/ai";

export const FilterItem = (props) => {
	return (
		<div className="filter-body">
			<span> {props.name} </span>
			{props.hasValue ? (<><input value={props.value} onChange={(event) => props.handleInputChange(event, props.index, props.type)} style={{width:"1.75em", height:"1.4em"}}></input><span>ft</span></>) : null } 
			<AiOutlineCloseCircle type="button" color="black" size="20" id="delete-button" 
							onClick={(event) => props.handleDelete(event, props.index, props.type)} className="filter-delete-button"/>
		</div>
	)
}