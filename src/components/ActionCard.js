import React, {useRef} from "react";

import "./ActionCard.css"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export const ActionCard = (props) => {
    let data = props.data
    return(
            <Card key={`${props.id}-action-card`} className={`${props.show} actioncard`}>
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
                        {data.damage} ({data.damageType})
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
                <section className="actioncard-section">
                    <p>{data.description}</p>
                </section>
                <section>
                    <p className="actioncard-footer"> {data.isProficient ? "Is proficient." : "Is not proficient."}</p>
                </section>
            </Card>
    )
}

/*
<div className="collapse" >
    <TbArrowBigRightFilled color="black" size="24px" style={{position:"absolute", zIndex:"3"}}/>
</div>
*/