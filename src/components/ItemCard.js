import React, {useRef} from "react";

import "./ItemCard.css"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const ItemCard = (props) => {
    let data = props.data
    var itemTemplate = {

		worth: "", 
		weight: "", 
		description: ""
	}
    console.log(data.category)
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
            <section className="itemcard-section">
                <p> {data.description} </p>
            </section>
            <section>
                {data.attunable ? <p className="actioncard-footer"> (Attunement: {data.attuneRequirement}) </p> : <p className="actioncard-footer"> No attunement required </p>}
            </section>
        </div>
    )
}