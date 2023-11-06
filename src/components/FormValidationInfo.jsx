import { BsFillPatchCheckFill, BsFillPatchExclamationFill } from "react-icons/bs";

import "./FormValidationInfo.scss"

export const FormValidationInfo = ({children, className, show, variant="danger", ...restProps}) => {
    let showComputed
    if(show) {
        showComputed = show
    } else {
        showComputed = variant === "danger" ? true : false
    }

    let computedClassName = "sg-form-validation-info-box" + (className ? " "+className : "") + (" "+variant)

    let visuallyHidden = {border:"0", clip:"rect(0 0 0 0)", height:"auto", margin:"0", padding:"0", position:"absolute", width:"1px", overflow:"hidden", whiteSpace:"nowrap"}
    
    return (
        <div className={computedClassName} {...restProps} style={show ? null : visuallyHidden} >
            {variant === "success" ? 
                <h6 style={{display:"flex", alignItems:"center"}}>
                    <BsFillPatchCheckFill size="1.5em" color="#198754" />
                    <span style={{marginLeft:"0.5em"}}>All form input values are valid!</span>
                </h6>
                :
                <>
                    <h6 style={{display:"flex", alignItems:"center"}}>
                        <BsFillPatchExclamationFill size="1.5em" color="#dc3545" />
                        <span style={{marginLeft:"0.5em"}}>Some form input values are invalid:</span>
                    </h6>
                    {children}
                </>
            }
        </div>
    )
}