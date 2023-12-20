import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import Nav from "../../BootstrapReplace/Nav";
import Navbar from "../../BootstrapReplace/NavBar";
import NavDropdown from "../../BootstrapReplace/NavDropdown";


import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";
import { MdHome, MdMenu } from "react-icons/md";

import { readFileOnUpload, exportToJson } from "../../utils/UtilityFunctions";
import { useScreenSize } from "../../components/CustomHooks";
import { logoutThunk } from "../api/Api";

export const NavMenuDesktop = (props) => {
    const dispatch = useDispatch()
    const preparedImportState = props.preparedImportState
    const dispatchFunction = useCallback((event) => {
        const getFile = (file) => {
            dispatch({type: "import/state", payload: preparedImportState(JSON.parse(file))})
        }
        readFileOnUpload(event.target.files[0], getFile)
    }, [dispatch, preparedImportState])

    const width = useScreenSize().width
    const loginStatus = useSelector(state => state.api.loginStatus)
    const loggedInUser = useSelector(state => state.api.loggedInUser)

    const inputRef = useRef(null)
    const handleInputClick = () => {
        inputRef.current.click()
    }
    const handleLogoutClick = (event) => {
        event.preventDefault()
        dispatch(logoutThunk("logout"))
    }
    const NavMenu = useCallback((webServer) => {
        if(webServer) {
            return (
                <>
                    <NavDropdown style={{marginLeft:"0.5em"}} className="character-menu" controlID="main-menu" id="character-choice-menu" title={"Menu" + (width < 900 ? (props.star ? "*" : "") : "")} >
                        {width < 900 && loginStatus === "fulfilled"?
                            <>
                                <span style={{padding:"0.25em 1em", display:"block", width:"100%", whiteSpace:"nowrap"}}>Last saved{props.star ? "*" : null}: {props.navBarSlice.lastSaved}</span>
                                <span style={{padding:"0.25em 1em", display:"block", width:"100%", whiteSpace:"nowrap"}}>Currently editing: {props.navBarSlice.currentlyEditing.name}</span>
                            </>
                            : null
                        }
                        {loginStatus === "fulfilled" ?
                            <>
                                <NavDropdown.Item onClick={handleLogoutClick}>Logout</NavDropdown.Item>
                                <NavDropdown.Item onClick={(event) => exportToJson(event, props.charName, props.currentState)}>Export to file</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleInputClick}>Import from file</NavDropdown.Item>
                                <NavDropdown.Item ref={inputRef} className="custom-upload" id="file-upload" as="input" type="file" onChange={(event)=>dispatchFunction(event)}></NavDropdown.Item>
                                <NavDropdown.Item onClick={(event) => props.handleNavDropdownClick(event, "new", "new")}>New</NavDropdown.Item>
                            </>
                            :
                            <>
                                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                                <NavDropdown.Item onClick={(event) => exportToJson(event, props.charName, props.currentState)}>Export to file</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleInputClick}>Import from file</NavDropdown.Item>
                                <NavDropdown.Item ref={inputRef} className="custom-upload" id="file-upload" as="input" type="file" onChange={(event)=>dispatchFunction(event)}></NavDropdown.Item>
                                <NavDropdown.Item onClick={(event) => props.handleNavDropdownClick(event, "new", "new")}>New</NavDropdown.Item>
                            </>
                        }
                        {loginStatus === "fulfilled" ?
                            <>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={(event) => props.handleSave(event)}>Save</NavDropdown.Item>
                                <NavDropdown.Item onClick={(event) => (props.setModalType("save-as"), props.setShowSafetyBox(true))}>Save As</NavDropdown.Item>
                                <NavDropdown.Item onClick={props.getCharacterNames}>Sync Characters</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <span style={{padding:"0.25em 1em", display:"block", width:"100%", whiteSpace:"nowrap"}}>Your Characters:</span>
                            </> : null
                        }
                        {props.navBarSlice.characters.status === "pending" ? 
                            ["Loading..."].map((character, index) => (
                                <NavDropdown.Item key={`${character}-${index}`}>{character}</NavDropdown.Item>
                            )) : 
                            ( props.navBarSlice.characters.names.length != 0 ?
                                props.navBarSlice.characters.names.map((character, index) => (
                                    <NavDropdown.Item 
                                        onClick={async (event) => props.handleNavDropdownClick(event, character, props.navBarSlice.characters.id[index])} 
                                        key={`${index}-character-row-${character}`}
                                    >
                                        {character}
                                    </NavDropdown.Item>
                                )) : null
                            )
                        }
                    </NavDropdown>
                    {width >= 650 && loginStatus === "fulfilled" ?
                        <>
                            <Navbar.Text>Last saved{props.star ? "*" : null}: {props.navBarSlice.lastSaved} (currently editing: {props.navBarSlice.currentlyEditing.name})</Navbar.Text>
                        </>
                        : null
                    }
                </>
            )
        }
        else {
            return (
                <>
                    <NavDropdown className="character-menu" controlID="main-menu" id="character-choice-menu" title={"Menu" + (width < 900 ? (props.star ? "*" : "") : "")} >
                        {width < 900?
                            <>
                                <span style={{padding:"0.25em 1em", display:"block", width:"100%", whiteSpace:"nowrap"}}>Last saved{props.star ? "*" : null}: {props.navBarSlice.lastSaved}</span>
                                <span style={{padding:"0.25em 1em", display:"block", width:"100%", whiteSpace:"nowrap"}}>Currently editing: {props.navBarSlice.currentlyEditing.name}</span>
                            </>
                            : null
                        }
                        <NavDropdown.Item onClick={(event) => exportToJson(event, props.charName, props.currentState)}>Export to file</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleInputClick}>Import from file</NavDropdown.Item>
                        <NavDropdown.Item ref={inputRef} className="custom-upload" id="file-upload" as="input" type="file" onChange={(event)=>dispatchFunction(event)}></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={(event) => props.handleNavDropdownClick(event, "new", "new")}>New</NavDropdown.Item>
                        <NavDropdown.Item onClick={(event) => props.handleSave(event)}>Save</NavDropdown.Item>
                        <NavDropdown.Item onClick={(event) => (props.setModalType("save-as"), props.setShowSafetyBox(true))}>Save As</NavDropdown.Item>
                        <NavDropdown.Item onClick={props.getCharacterNames}>Sync Characters</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <span style={{padding:"0.25em 1em", display:"block", width:"100%", whiteSpace:"nowrap"}}>Your Characters:</span>
                        {
                            props.navBarSlice.characters.status === "pending" ? 
                            ["Loading..."].map((character, index) => (
                                <NavDropdown.Item key={`${character}-${index}`}>{character}</NavDropdown.Item>
                            )) : 
                            (props.navBarSlice.characters.names.length != 0 ?
                                props.navBarSlice.characters.names.map((character, index) => (
                                    <NavDropdown.Item 
                                        onClick={async (event) => props.handleNavDropdownClick(event, character, props.navBarSlice.characters.id[index])} 
                                        key={`${index}-character-row-${character}`}
                                    >
                                        {character}
                                    </NavDropdown.Item>
                                )) : null
                            )
                        }
                    </NavDropdown>
                    {width >= 900 ?
                        <Navbar.Text>Last saved{props.star ? "*" : null}: {props.navBarSlice.lastSaved} (currently editing: {props.navBarSlice.currentlyEditing.name})</Navbar.Text>
                        : null
                    }
                </>
            )
        }
    }, [dispatchFunction, loginStatus, props, width])

    return (
        <>
            <Link to="/" tabIndex="0" className="home-button not-draggable" aria-labelledby="home-button" >
                <MdHome aria-labelledby="home-button" size="2em" style={{position: "relative", right: "1px", bottom: "1px"}}/>
                <label id="home-button" className="visually-hidden">Home</label>
            </Link>	
            {props.location.pathname === "/sheet" ? 
                <Nav className="not-draggable">
                    {NavMenu(props.webServer)}
                </Nav>: 
                <Navbar.Brand 
                    id="character-sheet-link" 
                    as={Link} to="/sheet" 
                    className="sheet-button not-draggable"
                    aria-label="link that leads to the sheet"
                >
                    {document.title}
                </Navbar.Brand>
            }
            {!props.webServer ? <div className="not-draggable" style={{marginLeft:"auto"}}>
                <button style={{margin: "0 0.25em", backgroundColor:"var(--nav-color)"}} className="react-icons-button" onClick={() => window.api.buttonInteraction("min")} aria-label="minimize window button">
                    <VscChromeMinimize className="window-button minimize"/>
                </button>
                <button style={{margin: "0 0.25em", backgroundColor:"var(--nav-color)"}} className="react-icons-button" onClick={() => window.api.buttonInteraction("max")} aria-label="maximize window button">
                    <VscChromeMaximize className="window-button maximize"/>
                </button>
                <button style={{margin: "0 0 0 0.25em", backgroundColor:"var(--nav-color)"}} className="react-icons-button" onClick={() => window.api.buttonInteraction("close")} aria-label="minimize window button">
                    <VscChromeClose className="window-button close"/>
                </button>
            </div> : (loginStatus != "fulfilled" ?
                    <div style={{marginLeft:"auto", marginTop:"auto", marginBottom:"auto"}}>
                        <Navbar.Brand 
                            style={{marginRight:"0"}}
                            id="login-page-link" 
                            as={Link} to="/login" 
                            className="sheet-button not-draggable"                        >
                            Login
                        </Navbar.Brand>
                        <Navbar.Brand 
                            style={{marginRight:"0"}}
                            id="register-page-link" 
                            as={Link} to="/register" 
                            className="sheet-button not-draggable"
                        >
                            Register
                        </Navbar.Brand>
                    </div>
                    :
                    <Nav id="logout-settings-menu" style={{marginLeft:"auto"}} className="not-draggable">
                        <NavDropdown className="character-menu" controlID="profile" id="profile-menu" title={`User: ${loggedInUser}`} >
                            <NavDropdown.Item
                                style={{marginRight:"0"}}
                                as={Link} to="/settings"
                                id="logout-button" 
                            >
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                style={{marginRight:"0"}}
                                onClick={handleLogoutClick}
                                id="logout-button" 
                                as="button"
                            >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                )
            }
        </>
    )
}
