import React from "react";

import "./ErrorInfoBox.scss"

import { BiSolidError } from "react-icons/bi";

export const ErrorInfoBox = (props) => {
    const response = props.response
    return (
        <div className="error-box-container">
            <h5 className="error-box-title"><BiSolidError aria-label="error image" color="#dc3545" size="2em"/>Error {response.status}: </h5> 
            <b className="error-box-code">{response.code ? response.code : null}</b>
            <p className="error-box-message">
                Message: {response.message}
            </p>
        </div>
    )
}