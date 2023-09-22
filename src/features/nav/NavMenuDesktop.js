import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";
import { MdHome, MdMenu } from "react-icons/md";

import { readFileOnUpload, exportToJson } from "../../utils/UtilityFunctions";

export const NavMenuDesktop = (props) => {
    const dispatch = useDispatch()
    const dispatchFunction = (event) => {
        const getFile = (file) => {
            dispatch({type: "import/state", payload: props.preparedImportState(JSON.parse(file))})
        }
        readFileOnUpload(event.target.files[0], getFile)
    }

    const inputRef = useRef(null)
    const handleInputClick = () => {
        inputRef.current.click()
    }

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
                    <NavDropdown className="character-menu" id="character-choice-menu" title="Menu" menuVariant="dark" onClick={props.getCharacterNames}>
                        <NavDropdown.Item role="menuitem" onClick={(event) => props.handleNavDropdownClick(event, "new", "new")}>New</NavDropdown.Item>
                        <NavDropdown.Item role="menuitem" onClick={(event) => props.handleSave(event)}>Save</NavDropdown.Item>
                        <NavDropdown.Item role="menuitem" onClick={(event) => (props.setModalType("save-as"), props.setShowSafetyBox(true))}>Save As</NavDropdown.Item>
                        <NavDropdown.Item role="menuitem" onClick={(event) => exportToJson(event, props.charName, props.currentState)}>Export to file</NavDropdown.Item>
                        <NavDropdown.Item role="menuitem" onClick={handleInputClick}>Import from file</NavDropdown.Item>
                        <NavDropdown.Item ref={inputRef} className="custom-upload" id="file-upload" as="input" type="file" onChange={(event)=>dispatchFunction(event)}></NavDropdown.Item>
                        
                        <NavDropdown.Divider />
                        {
                            props.navBarSlice.characters.status === "pending" ? 
                            ["Loading..."].map((character, index) => (
                                <NavDropdown.Item key={`${character}-${index}`}>{character}</NavDropdown.Item>
                            )) : 
                            props.navBarSlice.characters.names.map((character, index) => (
                                <NavDropdown.Item 
                                    onClick={async (event) => props.handleNavDropdownClick(event, character, props.navBarSlice.characters.id[index])} 
                                    key={`${index}-character-row-${character}`}
                                >
                                    {character}
                                </NavDropdown.Item>
                            ))
                        }
                    </NavDropdown>
                    <Navbar.Text>Last saved{props.star ? "*" : null}: {props.navBarSlice.lastSaved} (currently editing: {props.navBarSlice.currentlyEditing.name})</Navbar.Text>
                </Nav>: null}
            <div className="controls" style={{marginLeft:"auto"}}>
                <VscChromeMinimize tabIndex="0" type="button" onClick={() => window.api.buttonInteraction("min")} className="button minimize" size="2em"/>
                <VscChromeMaximize tabIndex="0" type="button"  onClick={() => window.api.buttonInteraction("max")} className="button maximize" size="2em"/>
                <VscChromeClose tabIndex="0" type="button" onClick={() => window.api.buttonInteraction("close")} className="button close" size="2em" />
            </div>
        </>
    )
}
