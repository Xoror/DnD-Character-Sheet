import React from "react";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const SpellCard = (props) => {
    return(
        <div id="spellcard" style={{bottom:"187px",left:"-340px", position:"absolute", zIndex:"2",border:"2px solid black", borderRadius:"0.375em", width:"350px", padding:"0.25em 0.75em 0em 0.75em", backgroundColor:"#343a40"}}>
            <h4>Detect Magic</h4>
            <h6> Level 1 divination </h6>
            <Row style={{borderTop:"1px solid black", paddingBottom:"0.25em"}}>
                <Col>
                    Casting Time: 
                </Col>
                <Col md="auto">
                    casting time test
                </Col>
            </Row>
            <Row style={{borderTop:"1px solid black", paddingBottom:"0.25em"}}>
                <Col>
                    Range: 
                </Col>
                <Col md="auto">
                    range test
                </Col>
            </Row>
            <Row style={{borderTop:"1px solid black", paddingBottom:"0.25em"}}>
                <Col>
                    Components: 
                </Col>
                <Col md="auto">
                    components test
                </Col>
            </Row>
            <Row style={{borderTop:"1px solid black", borderBottom:"1px solid black", paddingBottom:"0.25em"}}>
                <Col>
                    Duration: 
                </Col>
                <Col md="auto">
                    duration test
                </Col>
            </Row>
            <section style={{paddingTop:"0.25em"}}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.</p>
            </section>
            <section>
                <p style={{backgroundColor:"#212529", margin:"-0.25em -0.75em 0em -0.75em", padding:"0.25em 0.75em 0.5em 0.75em"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.</p>
            </section>
        </div>
    )
}