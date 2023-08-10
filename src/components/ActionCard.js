import React from "react";

import "./ActionCard.scss"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

/*
    Required Inputs: 
    - A string as "id", which should uniquely identify any given certain card
    - The details of the action can be inserted with either
        - a JSON object as "data" containing
            - A string as "name", which is what the action is called
            - A string as "type", which is the action type (aka in DnD 5e Action/Bonus Action/Reaction/Special)
            - A string as "range", which is the range of the action
            - A string as "damage", which is the amount of damage an action does (ideally use "-" or "none" if it doesn't do any damage)
            - A string as "damageType" or left undefined, which is the type of damage an action does. WIll not be shown if it is either "None" or undefined
            - A string as "scaling", which is the attribute which the damage of the action scales with
            - A string or array of strings as "description", which is a description of what the action is or does
            - A boolean as "isProficient" or left undefined, which determines if the character is proficient in the action. If undefined, the footer will be left empty
        or each data point as its own variable, with the same restrictions and labels as above
            
    Optional Inputs
    - A string as "show", which can be used to show/hide the vard via a CSS class   
*/

export const ActionCard = (props) => {
    let data
    if(props.data != undefined) {
        data = props.data
    }
    else {
        data = {
            name: props.name,
            type: props.type,
            range: props.range,
            damage: props.damage,
            damageType: props.damageType,
            scaling: props.scaling,
            description: props.description,
            isProficient: props.isProficient
        }
    }
    
    return(
            <Card key={`${props.id}`} className={`${props.show} actioncard`}>
                <h4>{data.name}</h4>
                <Row className="actioncard-row">
                    <Col>
                        <span>Action Type: </span>
                    </Col>
                    <Col md="auto">
                        {data.type}
                    </Col>
                </Row>
                <Row className="actioncard-row">
                    <Col>
                        <span>Range: </span>
                    </Col>
                    <Col md="auto">
                        {data.range}
                    </Col>
                </Row>
                <Row className="actioncard-row">
                    <Col>
                        <span>Damage: </span>
                    </Col>
                    <Col md="auto">
                        {data.damage} { data.damageType != undefined && data.damageType != "None" ? "(" + data.damageType + ")" : null}
                    </Col>
                </Row>
                <Row className="actioncard-row">
                    <Col>
                        <span>Scales with: </span>
                    </Col>
                    <Col md="auto">
                        {data.scaling}
                    </Col>
                </Row>
                <Row>
                    <Col className="actioncard-section">
                        <p>{data.description}</p>
                    </Col>
                </Row>
                <section>
                    <p className="actioncard-footer"> {data.isProficient != undefined ? (data.isProficient ? "Is proficient." : "Is not proficient.") : null}</p>
                </section>
            </Card>
    )
}

/*
<div className="collapse" >
    <TbArrowBigRightFilled color="black" size="24px" style={{position:"absolute", zIndex:"3"}}/>
</div>
*/