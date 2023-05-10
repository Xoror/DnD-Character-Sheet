import React, {useRef} from "react";

import "./SpellCard.css"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const SpellCard = (props) => {
    let data = props.data

    return(
        <div key={props.id} className={`${props.show} itemcard`}>
            <h4>{data.name}</h4>
            {props.offCanvas ? <h6> Classes: {classes} </h6> : null}
            <Row className="itemcard-row">
                <Col>
                    Casting Time: 
                </Col>
                <Col md="auto">
                    {data.castingTime+" or "} {data.ritual ? "Ritual": ""}
                </Col>
            </Row>
            <Row className="itemcard-row">
                <Col>
                    Range: 
                </Col>
                <Col md="auto">
                    {data.range}
                </Col>
            </Row>
            <Row className="itemcard-row">
                <Col>
                    Components: 
                </Col>
                <Col md="auto">
                    {data.components[0]+", "+data.components[1]+", "+data.components[2]}
                </Col>
            </Row>
            <Row className="itemcard-row">
                <Col>
                    Duration: 
                </Col>
                <Col md="auto">
                    {data.duration[0]} {data.duration[1] ? "(Concentration)" : null}
                </Col>
            </Row>
            <section className="itemcard-section">
            {data.type === "Cantrip" ?
                <>
                    <p>{data.description[0][0]}</p>
                    <p> <b>At higher levels: </b> {data.description[0][1] ? data.description[0][1] : "-"}</p> 
                </> :
                <>
                    <p>{data.description[0]}</p>
                    <p> <b>At higher levels: </b> {data.description[1] != undefined ? data.description[1] : "-"}</p>
                </>
            }
            </section>
            <section>
                <p className="itemcard-footer">{data.type} level {data.school} spell</p>
            </section>
        </div>
    )
}