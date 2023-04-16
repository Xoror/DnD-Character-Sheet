import React, {useRef} from "react";

import "./SpellCard.css"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { TbArrowBigRightFilled } from "react-icons/tb"

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
    return(
            <div key={props.id} className={`${props.show} spellcard`}>
                <h4>{data.name}</h4>
                {props.offCanvas ? <h6> Classes: {classes} </h6> : null}
                <Row style={{borderTop:"1px solid black", paddingBottom:"0.25em"}}>
                    <Col>
                        Casting Time: 
                    </Col>
                    <Col md="auto">
                        {data.castingTime+" or "} {data.ritual ? "Ritual": ""}
                    </Col>
                </Row>
                <Row style={{borderTop:"1px solid black", paddingBottom:"0.25em"}}>
                    <Col>
                        Range: 
                    </Col>
                    <Col md="auto">
                        {data.range}
                    </Col>
                </Row>
                <Row style={{borderTop:"1px solid black", paddingBottom:"0.25em"}}>
                    <Col>
                        Components: 
                    </Col>
                    <Col md="auto">
                        {data.components[0]+", "+data.components[1]+", "+data.components[2]}
                    </Col>
                </Row>
                <Row style={{borderTop:"1px solid black", borderBottom:"1px solid black", paddingBottom:"0.25em"}}>
                    <Col>
                        Duration: 
                    </Col>
                    <Col md="auto">
                        {data.duration[0]} {data.duration[1] ? "(Concentration)" : null}
                    </Col>
                </Row>
                <section style={{paddingTop:"0.25em"}}>
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
                    <p style={{backgroundColor:"#212529", margin:"-0.25em -0.75em 0em -0.75em", padding:"0.25em 0.75em 0.5em 0.75em", textAlign:"end"}}>{data.type} level {data.school} spell</p>
                </section>
            </div>
    )
}

/*
<div className="collapse" >
    <TbArrowBigRightFilled color="black" size="24px" style={{position:"absolute", zIndex:"3"}}/>
</div>
*/