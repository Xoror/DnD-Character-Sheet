import React from "react"

import "./LoadingAnimation.scss"

export const LoadingAnimation = (props) => {
    let numberofBars = 10
    let array = []
    for(let i=0; i<numberofBars; i++) {
        array.push(i+1)
    }
    return (
        <div className="sg-loading-animation-box">
            <div className="sg-loading-animation-container">
                {array.map((number, index) => (
                    <span key={`loading-bar-${number}`} className={`sg-loading-animation-bar bar${number}`}></span>
                ))}
            </div>
        </div>
    )
}