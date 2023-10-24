import React from "react";

import "./ResponseInfoBox.scss"

import { BiSolidCheckCircle, BiSolidError } from "react-icons/bi";

export const ResponseInfoBox = (props) => {
    const response = props.response
    const status = props.status
    return (
        <div className={`box-container ${status}`}>
            <h5 className={`box-title ${status}`}>
                {status === "success" ?
                    <><BiSolidCheckCircle aria-label="success image" color="#198754" size="2em"/><span>Success! </span> </>
                    :
                    <><BiSolidError aria-label="error image" color="#dc3545" size="2em"/><span>Error {response.status}: </span> </>
                }
            </h5> 
            <b className={`box-code ${status}`}>{response.code ? response.code : null}</b>
            <p className={`box-message ${status}`}>
                Message: {response.message}
            </p>
        </div>
    )
}