import React from "react";

import "./ItemCard.scss"

import Row from '../BootstrapReplace/Row';
import Col from '../BootstrapReplace/Col';

/*
    Required Inputs: 
    - A string as "id", which should uniquely identify any given certain card
    - The details of the action can be inserted with either
        - a JSON object as "data" containing
            - A string as "name", which is what the item is called
            - A string as "category", which is a general description of the item
            - A string as "rarity", which specifies how rare the item is
            - A string or integer as "quantity", which will be how many there are in your inventory
            - A string or float as "worth", which describes how much money the item is worth in gold pieces. This should be for one item.
            - A string or float as "weight", which describes how heave the item is. This should be for one item.
            - A string or array of strings as "description", which describes the item and its effects
            - A boolean as "attunable", which specifies wheter or not the item is attunable
            - A string as "attuneRequirement", which specifies the requirements for attunement
        or each data point as its own variable, with the same restrictions and labels as above
            
    Optional Inputs
    - A string as "show", which can be used to show/hide the vard via a CSS class   
*/

export const ItemCard = (props) => {
    let data
    if(props.data != undefined) {
        data = props.data
    }
    else {
        data = {
            name: props.name,
            category: props.category,
            rarity: props.rarity,
            quantity: props.quantity,
            worth: props.worth,
            weight: props.weight,
            description: props.description,
            attunable: props.attunable,
            attuneRequirement: props.attuneRequirement
        }
    }
    //console.log(data.category)
    return(
        <div key={props.id} className={`${props.show} itemcard`}>
            <h4>{data.name}</h4>
            <h6> ({data.category}, {data.rarity}) </h6>
           
            <Row className="itemcard-row">
                <Col>
                    <span> Quantity: </span>
                </Col>
                <Col md="auto">
                    {data.qty}
                </Col>
            </Row>
            <Row className="itemcard-row">
                <Col>
                    <span> Worth: </span>
                </Col>
                <Col md="auto">
                    {data.worth === "-" ?  "-" : parseInt(data.qty)*parseFloat(data.worth)} {parseInt(data.qty) > 1 ? <span>({data.worth}) </span> : null} gp
                </Col>
            </Row>
            <Row className="itemcard-row">
                <Col>
                    <span> Weight: </span>
                </Col>
                <Col md="auto">
                    {data.weight === "-" ?  "-" : parseInt(data.qty)*parseFloat(data.weight)} {parseInt(data.qty) > 1 ? <span>({data.weight})  </span> : null} lbs
                </Col>
            </Row>
            <Row>
                <Col className="itemcard-section overflow">
                    {data.description.map((desc, index) => (
                        <p key={`item-description-paragraph-${index}`} style={{paddingRight:"0.5em", textAlign:"justify"}}> {desc} </p> 
                    ))}
                </Col>
            </Row>
            <section>
                {data.attunable ? <p className="actioncard-footer"> Attunement: {data.attuneRequirement} </p> : <p className="actioncard-footer"> No attunement required </p>}
            </section>
        </div>
    )
}