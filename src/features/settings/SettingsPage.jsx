import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";

import Button from '../../BootstrapReplace/CustomButton';
import Form from '../../BootstrapReplace/Form';
import Card from '../../BootstrapReplace/Card';
import Spinner from "stargazer-ui/Spinner"
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';

import { Login } from "../api/Login";
import { userUpdateThunk, resetUserUpdate } from "../api/Api";
import { ResponseInfoBox } from "../../components/ResponseInfoBox";
import { usernameValidator, passwordValidator, confirmUsernameValidator, confirmPasswordValidator } from "../../utils/UserInfoValidation";

export const SettingsPage = () => {
    const dispatch = useDispatch()
    const userUpdateStatus = useSelector(state => state.api.userUpdateStatus)
    const userUpdateResponse = useSelector(state => state.api.userUpdateResponse)
    const [updateResponseThunk, setUpdateResponseThunk] = useState("")

    let location = useLocation()
    let path = location.pathname.split("/")[2]
    if(path === "" || path === undefined) {
        path = "profile"
    }
    const template = useMemo(() => { 
        return {path:path, oldPassword:"", newName:"", confirmNewName:"", newEmail:"", newEmailConfirm:"", newPassword:"", newPasswordConfirm:""}
    }, [path])
    const [activePane, setActivePane] = useState(path)
    const [verified, setVerified] = useState(false)
    const [defaultInputValues, setDefaultInputValues] = useState(template)

    let sameEmail = true
    if(defaultInputValues.newEmailConfirm !== "") {
        sameEmail = defaultInputValues.newEmail === defaultInputValues.newEmailConfirm
    }
    useEffect(() => {
        if(userUpdateStatus === "fulfilled") {
            dispatch(resetUserUpdate())
            setDefaultInputValues(template)
        }
    }, [userUpdateStatus, dispatch, setDefaultInputValues, template])
    
    const handleInputChange = (e) => {
        setDefaultInputValues({
          ...defaultInputValues,
          [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        defaultInputValues.path = path
        let thunkResponse = await dispatch(userUpdateThunk(defaultInputValues))
        setUpdateResponseThunk(thunkResponse.meta.requestStatus)
    }
    return (
        <>
            {verified ?
                <div className="settings-container">
                    <Tab.Container id="settings-nav-list" defaultActiveKey="profile" activeKey={activePane} onSelect={(e) => setActivePane(e)}>
                        <div className="settings-navigation">
                            <h3 className="settings-nav-title">Settings</h3>
                            <ListGroup className="settings-nav-list" aria-orientation="vertical">
                                <ListGroup.Item eventKey="profile" className="settings-nav-tab" as={Link} action to="/settings/profile">
                                    Manage Profile
                                </ListGroup.Item>
                                <ListGroup.Item eventKey="email" className="settings-nav-tab" as={Link} action to="/settings/email">
                                    Manage email
                                </ListGroup.Item>
                                <ListGroup.Item eventKey="password" className="settings-nav-tab" as={Link} action to="/settings/password">
                                    Manage password
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                        <div className="settings-content">
                            <Tab.Content>
                                <Tab.Pane eventKey="profile">
                                    <Card className="main-element-card settings-card">
                                        <Card.Body>
                                            <Card.Title as="h2" className="mb-4">Change username</Card.Title>
                                            {updateResponseThunk === "rejected" || updateResponseThunk === "fulfilled" ? <ResponseInfoBox status={updateResponseThunk === "rejected" ? "error":"success"} response={userUpdateResponse}/> : null}
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3" controlId="formOldPassword">
                                                    <Form.Label>Current password</Form.Label>
                                                    <Form.Control 
                                                        required value={defaultInputValues.oldPassword} name="oldPassword" type="password" 
                                                        placeholder="Enter current password" onChange={handleInputChange}/>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formNewUsername">
                                                    <Form.Label>New username</Form.Label>
                                                    <Form.Control 
                                                        required defaultValue={defaultInputValues.newName} name="newName" type="text"
                                                        className={`login-control ${!usernameValidator(defaultInputValues.newName) ? "invalid" : "valid"}`} 
                                                        placeholder="Enter new username" onChange={handleInputChange} 
                                                    />
                                                    {usernameValidator(defaultInputValues.newName) ? null : <p>Username can only contain numbers or letters and hast to be at least 3 characters long!</p>}
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formConfirmNewUsername">
                                                    <Form.Label>Confirm new username</Form.Label>
                                                    <Form.Control 
                                                        required defaultValue={defaultInputValues.confirmNewName} name="confirmNewName" type="text"
                                                        className={`login-control ${confirmUsernameValidator(defaultInputValues.newName, defaultInputValues.confirmNewName) ? "valid" : "invalid"}`} 
                                                        placeholder="Confirm new username" onChange={handleInputChange} 
                                                    />
                                                    {confirmUsernameValidator(defaultInputValues.newName, defaultInputValues.confirmNewName) ? null : <p>Email addresses must be the same!</p>}
                                                </Form.Group>

                                                <Button variant="primary" type="submit" disabled={userUpdateStatus === "pending" || !confirmUsernameValidator(defaultInputValues.newName, defaultInputValues.confirmNewName)} aria-disabled={userUpdateStatus === "pending" || !confirmUsernameValidator(defaultInputValues.newName, defaultInputValues.confirmNewName)}>
                                                    Submit 
                                                    {userUpdateStatus === "pending" ? 
                                                        <Spinner style={{marginLeft:"0.5em"}} size="sm" animation="border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>: null
                                                    }
                                                </Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="email">
                                    <Card className="main-element-card settings-card">
                                        <Card.Body>
                                            <Card.Title as="h2" className="mb-4">Change email</Card.Title>
                                            {updateResponseThunk === "rejected" || updateResponseThunk === "fulfilled" ? <ResponseInfoBox status={updateResponseThunk === "rejected" ? "error":"success"} response={userUpdateResponse}/> : null}                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3" controlId="formOldPassword">
                                                    <Form.Label>Current password</Form.Label>
                                                    <Form.Control 
                                                        required value={defaultInputValues.oldPassword} name="oldPassword" type="password" 
                                                        placeholder="Enter current password" onChange={handleInputChange}/>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formNewEmail">
                                                    <Form.Label>New email</Form.Label>
                                                    <Form.Control 
                                                        required value={defaultInputValues.newEmail} name="newEmail" type="email" 
                                                        placeholder="Enter new email" onChange={handleInputChange}/>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formConfirmEmail">
                                                    <Form.Label>Confirm new email</Form.Label>
                                                    <Form.Control 
                                                        required value={defaultInputValues.newEmailConfirm} name="newEmailConfirm" type="email" 
                                                        placeholder="Confirm new email" onChange={handleInputChange}/>
                                                    {sameEmail ? null : <p>Email addresses must be the same!</p>}
                                                </Form.Group>

                                                <Button variant="primary" type="submit" disabled={userUpdateStatus === "pending" || defaultInputValues.newEmail != defaultInputValues.newEmailConfirm} aria-disabled={userUpdateStatus === "pending" || defaultInputValues.newEmail != defaultInputValues.newEmailConfirm}>
                                                    Submit 
                                                    {userUpdateStatus === "pending" ? 
                                                        <Spinner style={{marginLeft:"0.5em"}} size="sm" animation="border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>: null
                                                    }
                                                </Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="password">
                                    <Card className="main-element-card settings-card">
                                        <Card.Body>
                                            <Card.Title as="h2" className="mb-4">Change password</Card.Title>
                                            {updateResponseThunk === "rejected" || updateResponseThunk === "fulfilled" ? <ResponseInfoBox status={updateResponseThunk === "rejected" ? "error":"success"} response={userUpdateResponse}/> : null}                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3" controlId="formOldPassword">
                                                    <Form.Label>Current password</Form.Label>
                                                    <Form.Control 
                                                        required value={defaultInputValues.oldPassword} name="oldPassword" type="password" 
                                                        placeholder="Enter current password" onChange={handleInputChange}/>
                                                </Form.Group>
                                                
                                                <Form.Group className="mb-3" controlId="formNewUsername">
                                                    <Form.Label>New password</Form.Label>
                                                    <Form.Control 
                                                        required defaultValue={defaultInputValues.newPassword} name="newPassword" type="password"
                                                        className={`login-control ${!passwordValidator(defaultInputValues.newPassword) ? "invalid" : "valid"}`} 
                                                        placeholder="Enter new username" onChange={handleInputChange} 
                                                    />
                                                    {passwordValidator(defaultInputValues.newPassword) ? null : 
                                                        <p>
                                                            Hint: Must contain at least one upper and one lower case letter, one number, one  
                                                            special character (#, ?, !, @, $, %, ^, &, *, -, .) and be at least 8 characters long
                                                        </p>
                                                    }
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formConfirmNewUsername">
                                                    <Form.Label>Confirm new password</Form.Label>
                                                    <Form.Control 
                                                        required defaultValue={defaultInputValues.newPasswordConfirm} name="newPasswordConfirm" type="password"
                                                        className={`login-control ${confirmPasswordValidator(defaultInputValues.newPassword, defaultInputValues.newPasswordConfirm) ? "valid" : "invalid"}`} 
                                                        placeholder="Confirm new username" onChange={handleInputChange} 
                                                    />
                                                    {confirmPasswordValidator(defaultInputValues.newPassword, defaultInputValues.newPasswordConfirm) ? null : <p>Passwords must be the same!</p>}
                                                </Form.Group>

                                                <Button variant="primary" type="submit" disabled={userUpdateStatus === "pending" || !confirmPasswordValidator(defaultInputValues.newPassword, defaultInputValues.newPasswordConfirm)} aria-disabled={userUpdateStatus === "pending" || !confirmPasswordValidator(defaultInputValues.newPassword, defaultInputValues.newPasswordConfirm)}>
                                                    Submit 
                                                    {userUpdateStatus === "pending" ? 
                                                        <Spinner style={{marginLeft:"0.5em"}} size="sm" animation="border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>: null
                                                    }
                                                </Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                        </Tab.Content>
                        </div>
                    </Tab.Container>
                </div>
                :
                <Login verification={true} setVerified={setVerified}/>
            }
        </>
    )
}