import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
                    <NavDropdown className="character-menu" id="character-choice-menu" title={"Menu" + (width < 900 ? (props.star ? "*" : "") : "")} menuVariant="dark" >
                        {width < 900 && loginStatus === "fulfilled"?
                            <>
                                <span style={{padding:"0.25em 1em", display:"block", width:"100%", whiteSpace:"nowrap"}}>Last saved{props.star ? "*" : null}: {props.navBarSlice.lastSaved}</span>
                                <span style={{padding:"0.25em 1em", display:"block", width:"100%", whiteSpace:"nowrap"}}>Currently editing: {props.navBarSlice.currentlyEditing.name}</span>
                            </>
                            : null
                        }
                        {loginStatus === "fulfilled" ?
                            <>
                                <NavDropdown.Item role="menuitem" onClick={handleLogoutClick}>Logout</NavDropdown.Item>
                                <NavDropdown.Item role="menuitem" onClick={(event) => exportToJson(event, props.charName, props.currentState)}>Export to file</NavDropdown.Item>
                                <NavDropdown.Item role="menuitem" onClick={handleInputClick}>Import from file</NavDropdown.Item>
                                <NavDropdown.Item ref={inputRef} className="custom-upload" id="file-upload" as="input" type="file" onChange={(event)=>dispatchFunction(event)}></NavDropdown.Item>
                                <NavDropdown.Item role="menuitem" onClick={(event) => props.handleNavDropdownClick(event, "new", "new")}>New</NavDropdown.Item>
                            </>
                            :
                            <>
                                <NavDropdown.Item role="menuitem" as={Link} to="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item role="menuitem" as={Link} to="/register">Register</NavDropdown.Item>
                                <NavDropdown.Item role="menuitem" onClick={(event) => exportToJson(event, props.charName, props.currentState)}>Export to file</NavDropdown.Item>
                                <NavDropdown.Item role="menuitem" onClick={handleInputClick}>Import from file</NavDropdown.Item>
                                <NavDropdown.Item ref={inputRef} className="custom-upload" id="file-upload" as="input" type="file" onChange={(event)=>dispatchFunction(event)}></NavDropdown.Item>
                                <NavDropdown.Item role="menuitem" onClick={(event) => props.handleNavDropdownClick(event, "new", "new")}>New</NavDropdown.Item>
                            </>
                        }
                        {loginStatus === "fulfilled" ?
                            <>
                                <NavDropdown.Divider />
                                <NavDropdown.Item role="menuitem" onClick={(event) => props.handleSave(event)}>Save</NavDropdown.Item>
                                <NavDropdown.Item role="menuitem" onClick={(event) => (props.setModalType("save-as"), props.setShowSafetyBox(true))}>Save As</NavDropdown.Item>
                                <NavDropdown.Item role="menuitem" onClick={props.getCharacterNames}>Sync Characters</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <span style={{padding:"0.25em 1em", display:"block", width:"100%", whiteSpace:"nowrap"}}>Your Characters:</span>
                            </> : null
                        }
                        {
                            props.navBarSlice.characters.status === "pending" ? 
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
                    {width >= 900 && loginStatus === "fulfilled" ?
                        <Navbar.Text>Last saved{props.star ? "*" : null}: {props.navBarSlice.lastSaved} (currently editing: {props.navBarSlice.currentlyEditing.name})</Navbar.Text>
                        : null
                    }
                </>
            )
        }
        else {
            return (
                <>
                    <NavDropdown className="character-menu" id="character-choice-menu" title={"Menu" + (width < 900 ? (props.star ? "*" : "") : "")} menuVariant="dark" >
                        {width < 900?
                            <>
                                <span style={{padding:"0.25em 1em", display:"block", width:"100%", whiteSpace:"nowrap"}}>Last saved{props.star ? "*" : null}: {props.navBarSlice.lastSaved}</span>
                                <span style={{padding:"0.25em 1em", display:"block", width:"100%", whiteSpace:"nowrap"}}>Currently editing: {props.navBarSlice.currentlyEditing.name}</span>
                            </>
                            : null
                        }
                        <NavDropdown.Item role="menuitem" onClick={(event) => exportToJson(event, props.charName, props.currentState)}>Export to file</NavDropdown.Item>
                        <NavDropdown.Item role="menuitem" onClick={handleInputClick}>Import from file</NavDropdown.Item>
                        <NavDropdown.Item ref={inputRef} className="custom-upload" id="file-upload" as="input" type="file" onChange={(event)=>dispatchFunction(event)}></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item role="menuitem" onClick={(event) => props.handleNavDropdownClick(event, "new", "new")}>New</NavDropdown.Item>
                        <NavDropdown.Item role="menuitem" onClick={(event) => props.handleSave(event)}>Save</NavDropdown.Item>
                        <NavDropdown.Item role="menuitem" onClick={(event) => (props.setModalType("save-as"), props.setShowSafetyBox(true))}>Save As</NavDropdown.Item>
                        <NavDropdown.Item role="menuitem" onClick={props.getCharacterNames}>Sync Characters</NavDropdown.Item>
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
            <Link to="/" tabIndex="0" className="home-button not-draggable" id="home-button" aria-label="home button that leads to landing page">
                <MdHome size="2em" style={{position: "relative", right: "1px", bottom: "1px"}}/>
            </Link>	
            <Navbar.Brand 
                id="character-sheet-link" 
                as={Link} to="/sheet" 
                className="sheet-button not-draggable"
                aria-label="link that leads to the sheet"
            >
                {document.title}
            </Navbar.Brand>
            {props.location.pathname === "/sheet" ? 
                <Nav className="not-draggable">
                    {NavMenu(props.webServer)}
                </Nav>: null}
            {!props.webServer ? <div className="controls" style={{marginLeft:"auto"}}>
                <VscChromeMinimize tabIndex="0" type="button" onClick={() => window.api.buttonInteraction("min")} className="button minimize" size="2em"/>
                <VscChromeMaximize tabIndex="0" type="button"  onClick={() => window.api.buttonInteraction("max")} className="button maximize" size="2em"/>
                <VscChromeClose tabIndex="0" type="button" onClick={() => window.api.buttonInteraction("close")} className="button close" size="2em" />
            </div> : null}
        </>
    )
}
