import React from "react";

import "./CounterBox.scss"
/*
    Required inputs:
    - a function called "handleChange" that takes a string as an input, "inc" for the counter increase
      and "dec" for the counter decrease as well as contain a min/max number
    - an integer called "number" which is the counter number
    - an array of strings called "color" containing color codes. The first entry will be the decrease button, the last will
      be the increase button, while the box cotaining the counter will change based on the counter number. Make sure the length
      of this correspondes to the min/max values in the handleChange function so that the counter color starts at the first color
      with the minimum and ends at the last color with the maximum number possible
    Optional Inputs:
    - a string called "optionalText" that can be used to label the counter number
*/
export const CounterBox = (props) => {
    const optionalText = props.optionalText !== undefined ? props.optionalText : ""
    return (
        <div style={{width:"fit-content", height:"fit-content", display:"flex", color:"black", flexWrap:"nowrap"}}>
            <button className="counter-button left" style={{backgroundColor:props.colors[0]}} tabIndex="0" onClick={() => props.handleChange("dec")} aria-label="decrease exhaustion level">-</button>
            <div style={{backgroundColor:props.colors[props.number]}} className="counter-count" aria-label="exhaustion level">
                <span> {optionalText+" "+props.number} </span>
            </div>
            <button className="counter-button right" style={{backgroundColor:props.colors[props.colors.length-1]}} tabIndex="0" onClick={() => props.handleChange("inc")} aria-label="increase exhaustion level">+</button>
        </div>
    )
}
// div: style={{borderRadius:"0 0.375em 0.375em 0", border:"1px solid black", height:"1.5em", width:"1.5em", textAlign:"center", backgroundColor:props.colors[props.colors.length-1]}}
// button: style={{all:"unset", display:"inline-block", userSelect:"none", cursor:"pointer", height:"100%", width:"100%"}}