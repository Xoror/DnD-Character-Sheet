import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Button from '../../BootstrapReplace/CustomButton';
import Form from '../../BootstrapReplace/Form';
import Card from '../../BootstrapReplace/Card';
import Spinner from "../../BootstrapReplace/Spinner";

import { registerThunk } from "./Api"
import { ResponseInfoBox } from "../../components/ResponseInfoBox"
import { usernameValidator, passwordValidator, confirmPasswordValidator } from "../../utils/UserInfoValidation"

import { debounce } from "lodash"

export const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registerData, setRegisterData] = useState({
        name:"", 
        password:"", 
        passwordConfirm: "", 
        email: "", 
        emailConfirm: ""
    })
    const registerStatus = useSelector(state => state.api.registerStatus)
    const registerResponse = useSelector(state => state.api.registerResponse)
    const [registerThunkStatus, setRegisterThunkStatus] = useState("idle")

    
    let samePassword = true
    if(registerData.passwordConfirm !== "") {
        samePassword = registerData.password === registerData.passwordConfirm
    }
    let sameEmail = true
    if(registerData.emailConfirm !== "") {
        sameEmail = registerData.email === registerData.emailConfirm
    }
    const isSubmitDisabled = () => {
        if(registerStatus === "pending") {
            return false
        }
        else {
            return sameEmail && samePassword && usernameValidator(registerData.name) && passwordValidator(registerData.password) && confirmPasswordValidator(registerData.password, registerData.passwordConfirm)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let thunkResponse = await dispatch(registerThunk(registerData))
        setRegisterThunkStatus(thunkResponse.meta.requestStatus)
    }
    const handleChange = debounce((event, id) => {
        let copy = structuredClone(registerData)
        if(id === "remember") {
            copy[id] = event.target.checked
        }
        else {
            copy[id] = event.target.value
        }
        console.log(copy[id])
        setRegisterData(copy)
    }, 250)

    useEffect(() => {
        if(registerStatus === "fulfilled") {
            navigate("/login")
        }
    }, [registerStatus, navigate])

    return (
        <Card className="main-element-card login-card">
            <Card.Body>
                <Card.Title as="h3" className="mb-4">Register</Card.Title>
                {registerThunkStatus === "rejected" ? <ResponseInfoBox status={registerThunkStatus === "rejected" ? "error":"success"} response={registerResponse}/> : null}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-5" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            required defaultValue={registerData.name} type="text"
                            className={`login-control ${!usernameValidator(registerData.name) ? "invalid" : "valid"}`} 
                            placeholder="Enter username" onChange={event => handleChange(event, "name")}/>
                        {usernameValidator(registerData.name) ? null : <p>Username can only contain numbers or letters and hast to be at least 3 characters long!</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required className="login-control valid" defaultValue={registerData.email} type="email" placeholder="Enter email" onChange={event => handleChange(event, "email")}/>
                    </Form.Group>
                    <Form.Group className="mb-5" controlId="formBasicEmailConfirm">
                        <Form.Label>Confirm email</Form.Label>
                        <Form.Control required className={`login-control ${!sameEmail ? "invalid" : "valid"}`} defaultValue={registerData.emailConfirm} type="email" placeholder="Confirm email" onChange={event => handleChange(event, "emailConfirm")}/>
                        {sameEmail ? null : <p>Email addresses must be the same!</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            required defaultValue={registerData.password} type="password"
                            className={`login-control ${!passwordValidator(registerData.password) ? "invalid" : "valid"}`} 
                            placeholder="Enter password" onChange={event => handleChange(event, "password")}/>
                        {passwordValidator(registerData.password) ? null :
                            <p>
                                Hint: Must contain at least one upper and one lower case letter, one number, one  
                                special character (#, ?, !, @, $, %, ^, &, *, -, .) and be at least 8 characters long
                            </p>
                        }
                    </Form.Group>

                    <Form.Group className="mb-5" controlId="formBasicPasswordConfirm">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control 
                            required defaultValue={registerData.passwordConfirm} type="password"
                            className={`login-control ${!samePassword ? "invalid" : "valid"}`} style={samePassword ? null : {borderColor:"#dc3545"}}
                            placeholder="Confirm password" onChange={event => handleChange(event, "passwordConfirm")}/>
                        {confirmPasswordValidator(registerData.password, registerData.passwordConfirm) ? null : <p>Passwords must be the same!</p>}
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={!isSubmitDisabled()} aria-disabled={!isSubmitDisabled()}>
                        Submit 
                        {registerStatus === "pending" ? 
                            <Spinner style={{marginLeft:"0.5em"}} label="Loading..." controlId="waiting-for-register-response" />: null
                        }
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}