import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from "react-bootstrap/Card"
import Spinner from 'react-bootstrap/Spinner';

import { registerThunk } from "./Api"
import { ErrorInfoBox } from "../../components/ErrorInfoBox"

const _ = require("lodash")

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

    const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
    const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
    const atLeastOneNumber = /\d/g; // numbers from 0 to 9
    const atLeastOneSpecialChar = /[#?!@$%^&*-.]/g; // any of the special characters within the square brackets
    const eightCharsOrMore= /.{8,}/g; // eight characters or more

    const usernameTracker = (name) => {
        let upper = name.match(atLeastOneUppercase) != null
        let lower = name.match(atLeastOneLowercase) != null
        let number = name.match(atLeastOneNumber) != null
        let three = name.match(/.{3,}/g) != null
        if(registerData.name !== "") {
            return (upper || lower || number) && three
        }
        else {
            return true
        }
    }
    const passwordTracker = (pass) => {
        let upper = pass.match(atLeastOneUppercase) != null
        let lower = pass.match(atLeastOneLowercase) != null
        let number = pass.match(atLeastOneNumber) != null
        let special = pass.match(atLeastOneSpecialChar) != null
        let eight = pass.match(eightCharsOrMore) != null
        return upper && lower && number && special && eight
    }
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
            return true
        }
        else {
            return sameEmail && samePassword && usernameTracker(registerData.name) && passwordTracker(registerData.password)
        }
    }
    console.log(isSubmitDisabled())

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(registerThunk(registerData))
    }
    const handleChange = _.debounce((event, id) => {
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
                {registerStatus === "rejected" ? <ErrorInfoBox response={registerResponse}/> : null}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-5" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required className={`login-control ${!usernameTracker(registerData.name) ? "invalid" : "valid"}`} defaultValue={registerData.name} type="text" placeholder="Enter username" onChange={event => handleChange(event, "name")}/>
                        {usernameTracker(registerData.name) ? null : <p>Username can only contain numbers or letters!!</p>}
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
                        <Form.Control required className={`login-control ${!passwordTracker(registerData.password) && registerData.password != "" ? "invalid" : "valid"}`} defaultValue={registerData.password} type="password" placeholder="Enter password" onChange={event => handleChange(event, "password")}/>
                        {!passwordTracker(registerData.password) && registerData.password != "" ? 
                            <p>
                                Hint: Must contain at least one upper and one lower case letter, one number, one  
                                special character (#, ?, !, @, $, %, ^, &, *, -, .) and be at least 8 characters long
                            </p> : null}
                    </Form.Group>
                    <Form.Group className="mb-5" controlId="formBasicPasswordConfirm">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control required className={`login-control ${!samePassword ? "invalid" : "valid"}`} style={samePassword ? null : {borderColor:"#dc3545"}} defaultValue={registerData.passwordConfirm} type="password" placeholder="Confirm password" onChange={event => handleChange(event, "passwordConfirm")}/>
                        {samePassword ? null : <p>Passwords must be the same!</p>}
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={!isSubmitDisabled()} aria-disabled={registerStatus === "pending"}>
                        Submit 
                        {registerStatus === "pending" ? 
                            <Spinner style={{marginLeft:"0.5em"}} size="sm" animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>: null
                        }
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}