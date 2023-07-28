import React, {useRef} from "react";

import "./SpellCard.css"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const SpellCard = (props) => {
    let data = props.data
    let classes = ""
    for(let i=0; i<data.classes.length; i++) {
        if(i === data.classes.length - 1) {
            classes += `${data.classes[i].name}`
        } else {
            classes += `${data.classes[i].name}, `
        }
    }
    let components = ""
    for(let i=0; i<data.components.length; i++) {
        if(i === data.components.length - 1) {
            components += `${data.components[i]}`
        } else {
            components += `${data.components[i]}, `
        }
    }
    return(
        <div key={props.id} className={`${props.show} spellcard`}>
            <h4>{data.name}</h4>
            {props.offCanvas ? <h6> Classes: {classes} </h6> : null}
            <Row className="spellcard-row">
                <Col>
                    Casting Time: 
                </Col>
                <Col md="auto">
                    {data.castingTime} {data.ritual ? " or Ritual": ""}
                </Col>
            </Row>
            <Row className="spellcard-row">
                <Col>
                    Range: 
                </Col>
                <Col md="auto">
                    {data.range}
                </Col>
            </Row>
            <Row className="spellcard-row">
                <Col>
                    Components: 
                </Col>
                <Col md="auto">
                    {components}
                </Col>
            </Row>
            <Row className="spellcard-row">
                <Col>
                    Duration: 
                </Col>
                <Col md="auto">
                    {data.duration[0]} {data.duration[1] ? "(Concentration)" : null}
                </Col>
            </Row>
            <section className="spellcard-section overflow">
            {data.type === "Cantrip" ?
                <>
                    <p style={{paddingRight:"0.5em", textAlign:"justify"}}>{data.description[0][0]}</p>
                    <p style={{paddingRight:"0.5em", textAlign:"justify"}}> <b>At higher levels: </b> {data.description[0][1] ? data.description[0][1] : "-"}</p> 
                </> :
                <>
                    <p style={{paddingRight:"0.5em", textAlign:"justify"}}>{data.description[0]}</p>
                    <p style={{paddingRight:"0.5em", textAlign:"justify"}}> <b>At higher levels: </b> {data.description[1] != undefined ? data.description[1] : "-"}</p>
                </>
            }
            </section>
            <section>
                <p className="spellcard-footer">{data.type} level {data.school} spell</p>
            </section>
        </div>
    )
}

/*
<div className="collapse" >
    <TbArrowBigRightFilled color="black" size="24px" style={{position:"absolute", zIndex:"3"}}/>
</div>
*/