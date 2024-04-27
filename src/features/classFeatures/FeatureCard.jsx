import { useEffect, useRef } from "react";
import "./FeatureCard.scss"

import { AiFillCloseSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";

const FeatureCard = ({data, startEdit, handleDelete}) => {
    const featureDescriptionRef = useRef(null)

    useEffect(() => {
        if(featureDescriptionRef.current) {
            const element = featureDescriptionRef.current
            element.classList.toggle("scrollbar-on", element.scrollHeight > element.clientHeight)
        }
    }, [])

    return (
        <div className="feature-card">
            <div className="feature-row">
                <div className="feature-text">
                    <p>Name: {data.name}</p>
                </div>
                <div className="feature-column">
                    <div className="feature-row">
                        <button className="react-icons-button edit" onClick={startEdit} aria-label="edit feature button">
                            <RiFileEditFill size="1.5em" className="edit-button" />
                        </button>
                        <button className="react-icons-button delete" onClick={handleDelete} aria-label="delete feature button">
                            <AiFillCloseSquare size="1.5em" className="delete-button"/> 
                        </button>
                    </div>
                </div>
            </div>
            <div className="feature-row">
                <div className="feature-text">
                    <span>Class: {data.featureClass}</span>
                </div>
                <div className="feature-text">
                    <span> Subclass: {data.featureSubclass}</span>
                </div>
            </div>
            <div className="feature-row">
                <div ref={featureDescriptionRef} className="feature-description">
                    {Array.isArray(data.description) ?
                        data.description.map((paragraph, index) => 
                            <p key={index}>{paragraph}</p>
                        )
                            :
                        <p>Description: {data.description}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default FeatureCard
/*
<Container fluid>
    <Row>
        <Col>
            <span>Name: {props.feature.name}</span>
        </Col>
        <Col xs="auto">
            <Row>
                <Col xs="auto" style={{paddingRight:"6px",paddingLeft:"0"}}> <span>Level: {props.feature.level}</span> </Col>
                <Col xs="auto" style={{paddingRight:"0em",paddingLeft:"0"}}>
                    <button className="react-icons-button edit" onClick={startEdit} aria-label="edit feature button">
                        <RiFileEditFill size="1.5em" className="edit-button" />
                    </button>
                    <button className="react-icons-button delete" onClick={handleDelete} aria-label="delete feature button">
                        <AiFillCloseSquare size="1.5em" className="delete-button"/> 
                    </button>
                </Col>
            </Row>
        </Col>
    </Row>
    <Row>
        <Col md="auto">
            <span>Class: {props.feature.featureClass}</span>
        </Col>
        <Col md="auto">
            <span> Subclass: {props.feature.featureSubclass}</span>
        </Col>
    </Row>
    <Row style={{maxHeight:"150px", overflow:"auto"}}> 
        <p style={{marginBottom:"0.5em"}}>Description: {props.feature.description}</p>
    </Row>
</Container>
*/