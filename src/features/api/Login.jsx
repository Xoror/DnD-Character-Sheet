import React, { useEffect, useState } from "react"
import { nanoid } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Button from '../../BootstrapReplace/CustomButton';
import Form from '../../BootstrapReplace/Form';
import Card from '../../BootstrapReplace/Card';
import Spinner from "../../BootstrapReplace/Spinner";
import Dropdown from "../../BootstrapReplace/Dropdown";

import { loginThunk, userVerificationThunk } from "./Api"
import { ResponseInfoBox } from "../../components/ResponseInfoBox"
import { LoadingAnimation } from "../../components/LoadingAnimation";
import { FancyNav } from "../../components/FancyNav"

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

    const handleSubmit2 = (event) => {
        event.preventDefault()
        console.log(event.target)
    }

    const list = {
        children: [
            {
                name:"src",
                children: [
                    {name: "features"},
                    {name: "components", children: [{name:"login"},{name:"register"}]}
                ]
            },
            {
                name:"public",
                children: [
                    {name:"index.html"},
                    {name:"logo.png"}
                ]
            },
            {
                name:"resources"
            }
        ]
    }
    
    return (
        true ? 
            <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
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

                            <Form.Check classNameContainer="mb-3" type="checkbox" controlId="login-remember-me-checkbox" label="Remember me" onChange={event => handleChange(event, "remember")}/>

                            <Button variant="primary" type="submit" disabled={loginStatus === "pending" || userVerificationStatus === "pending"} aria-disabled={loginStatus === "pending" || userVerificationStatus === "pending"}>
                                Submit 
                                {loginStatus === "pending" || userVerificationStatus === "pending" ? 
                                    <Spinner style={{marginLeft:"0.5em"}} label="Loading..." controlId="waiting-for-login-response" />: null
                                }
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        :
        <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Dropdown>
                <Dropdown.Toggle>Open</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>one</Dropdown.Item>
                    <Dropdown.Item>two</Dropdown.Item>
                    <Dropdown.Item>three</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

const ColorBubbles = ({colorName}) => {
    let numbers = [100,200,300,400,500,600,700,800,900]
    return (
        numbers.map((number,index) => {
            return (
                <div key={`color-number-${number}`} className={`${colorName}-${number}`}></div>
            )
        })
        
    )
}

// <ExpandableTree expanded list={list} />
const ExpandableTree = ({ list, hidden, expanded=false}) => {
    const childrenNames = list.children != undefined && list.children != null ? list.children.map(child => {return child.name}) : []
    const [open, setOpen] = useState([])

    const handleClick = (event, name) => {
        event.stopPropagation()
        console.log(name, open)
        let newList = open.find(item => item === name) ? open.filter(item => item != name) : [...open, name]
        setOpen(newList)
    }

    return (
        <ul className={hidden ? hidden : null}>
            {childrenNames.length != 0 ?
                list.children.map((subList, index) => {
                    return (
                        <li key={`list-entry-${subList.name}`}  onClick={event => handleClick(event, subList.name)}>
                            {subList.name}
                            <ExpandableTree hidden={open.find(item => item === subList.name) ? null:"visually-hidden"} key={subList.name} propsHandleClick={handleClick} list={subList} />
                        </li>
                    )
                })
            : null}
        </ul>
    )
}