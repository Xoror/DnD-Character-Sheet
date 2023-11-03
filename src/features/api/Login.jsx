import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

//import Button from 'react-bootstrap/Button'
import Button from '../../BootstrapReplace/CustomButton';
import Form from 'react-bootstrap/Form'
//import Card from "react-bootstrap/Card"
import Card from '../../BootstrapReplace/Card';
import Spinner from 'react-bootstrap/Spinner';

import { loginThunk, userVerificationThunk } from "./Api"
import { ResponseInfoBox } from "../../components/ResponseInfoBox"
import { FancyNav } from "../../components/FancyNav";

export const Login = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({name:"", password:"", remember: false})
    const loginStatus = useSelector(state => state.api.loginStatus)
    const loginResponse = useSelector(state => state.api.loginResponse)
    const userVerificationStatus = useSelector(state => state.api.userVerificationStatus)
    const userVerificationResponse = useSelector(state => state.api.userVerificationResponse)
    const [loginResponseThunk, setLoginResponseThunk] = useState("idle")

    let verification = props.verification === undefined ? false : props.verification

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!verification) {
            let thunkResponse = await dispatch(loginThunk(loginData))
            setLoginResponseThunk(thunkResponse.meta.requestStatus)
        }
        else {
            let verificationResponse = await dispatch(userVerificationThunk(loginData))
            props.setVerified(verificationResponse.meta.requestStatus === "fulfilled")
            setLoginResponseThunk(verificationResponse.meta.requestStatus)
        }
    }
    const handleChange =(event, id) => {
        let copy = structuredClone(loginData)
        if(id === "remember") {
            copy[id] = event.target.checked
        }
        else {
            copy[id] = event.target.value
        }
        setLoginData(copy)
    }

    useEffect(() => {
        if(loginStatus === "fulfilled" && !verification) {
            navigate("/sheet")
        }

    }, [loginStatus, navigate, verification])

    return (
        false ? 
            <Card className="main-element-card login-card">
                <Card.Body>
                    <Card.Title as="h2" className="mb-4">Login</Card.Title>
                    {loginResponseThunk === "rejected" ? <ResponseInfoBox status={loginResponseThunk === "rejected" ? "error":"success"} response={verification ? userVerificationResponse : loginResponse }/> : null}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required value={loginData.name} type="text" placeholder="Enter username" onChange={event => handleChange(event, "name")}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required value={loginData.password} type="password" placeholder="Enter password" onChange={event => handleChange(event, "password")}/>
                        </Form.Group>

                        <Form.Check className="mb-3" type="checkbox" id="remember me checkbox" label="Remember me" onChange={event => handleChange(event, "remember")}/>

                        <Button variant="primary" type="submit" disabled={loginStatus === "pending" || userVerificationStatus === "pending"} aria-disabled={loginStatus === "pending" || userVerificationStatus === "pending"}>
                            Submit 
                            {loginStatus === "pending" || userVerificationStatus === "pending" ? 
                                <Spinner style={{marginLeft:"0.5em"}} size="sm" animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>: null
                            }
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        :
            <FancyNav />
        
    )
}