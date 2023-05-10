import React from "react";

export const CounterBox = (props) => {
    return (
        <div style={{width:"fit-content", height:"fit-content", display:"flex", color:"black", flexWrap:"nowrap"}}>
            <div style={{borderRadius:"0.375em 0 0 0.375em", border:"1px solid black", height:"1.5em", width:"1.5em", textAlign:"center", backgroundColor:props.colors[0]}}>
                <button style={{all:"unset", display:"inline-block", userSelect:"none", cursor:"pointer", height:"100%", width:"100%"}} onClick={() => props.handleChange("dec")}>-</button>
            </div>
            <div style={{backgroundColor:props.colors[props.number], borderTop:"1px solid black", borderBottom:"1px solid black", height:"1.5em", width:"1.5em", textAlign:"center"}}>
                <span> {props.number} </span>
            </div>
            <div style={{borderRadius:"0 0.375em 0.375em 0", border:"1px solid black", height:"1.5em", width:"1.5em", textAlign:"center", backgroundColor:props.colors[props.colors.length-1]}}>
                <button style={{all:"unset", display:"inline-block", userSelect:"none", cursor:"pointer", height:"100%", width:"100%"}} onClick={() => props.handleChange("inc")}>+</button>
            </div>
        </div>
    )
}