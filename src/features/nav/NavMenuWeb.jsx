import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import Navbar from "../../BootstrapReplace/NavBar";
import NavDropdown from "../../BootstrapReplace/NavDropdown";

import { MdHome, MdMenu } from "react-icons/md";

import { readFileOnUpload, exportToJson } from "../../utils/UtilityFunctions";
import { useScreenSize } from "../../components/CustomHooks";

export const NavMenuWeb = (props) => {
    const dispatch = useDispatch()
    const dispatchFunction = (event) => {
        const getFile = (file) => {
            dispatch({type: "import/state", payload: props.preparedImportState(JSON.parse(file))})
        }
        readFileOnUpload(event.target.files[0], getFile)
    }
    const width = useScreenSize().width

    const inputRef = useRef(null)
    const handleInputClick = () => {
        inputRef.current.click()
    }

    const NavMenu = useCallback((location) => {
        if(location === "/") {
            if(width >= 800) {
                return (
                    <>
                        <Link to="/" tabIndex="0" className="home-button not-draggable" id="home-button" aria-label="home button that leads to landing page">
                            <MdHome size="2em" style={{position: "relative", right: "1px", bottom: "1px"}}/>
                        </Link>
                        <Navbar.Brand id="character-sheet-link" as={Link} to="/sheet" className="sheet-button not-draggable">
                            {document.title}
                        </Navbar.Brand>
                        <Navbar.Brand as={Link} id="inventory-spell-manager" to="https://xoror.github.io/spells-inventory-manager/" className="sheet-button not-draggable">
                            Standalone Spells and Inventory Manager
                        </Navbar.Brand>
                    </>
                )
            }
            else {
                return (
                    <>
                        <Link to="/" tabIndex="0" className="home-button not-draggable" id="home-button" aria-label="home button that leads to landing page">
                            <MdHome size="2em" style={{position: "relative", right: "1px", bottom: "1px"}}/>
                        </Link>
                        <NavDropdown style={{marginLeft:"0.5em"}} id="menu" controlID={"main-menu"} className="character-menu" title="Menu">
                            <NavDropdown.Item id="character-sheet-link" as={Link} to="/sheet" className="sheet-button not-draggable">
                                {document.title}
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} id="inventory-spell-manager" to="https://xoror.github.io/spells-inventory-manager/" className="sheet-button not-draggable" >
                                Standalone Spells and Inventory Manager
                            </NavDropdown.Item>
                        </NavDropdown>
                    </>
                )
            }
        }
        else if (location === "/sheet") {
            if(width >= 800) {
                return (    
                    <>
                        <Link to="/" tabIndex="0" className="home-button not-draggable" id="home-button" aria-label="home button that leads to landing page">
                            <MdHome size="2em" style={{position: "relative", right: "1px", bottom: "1px"}}/>
                        </Link>	
                        {false?<Navbar.Brand id="character-sheet-link" as={Link} to="/sheet" className="sheet-button not-draggable" >
                            {document.title}
                        </Navbar.Brand>:null}
                        <Navbar.Brand id="character-sheet-link" to="/sheet" role="button" as="button" className="sheet-button not-draggable" onClick={event => props.handleNavDropdownClick(event, "web", "new")}>
                            New Character
                        </Navbar.Brand>
                        
                        <Navbar.Brand as="button" htmlFor="file-upload" className="sheet-button not-draggable" onClick={handleInputClick} style={{marginRight:"0.5em"}}>
                            Import from file
                        </Navbar.Brand>
                        <input ref={inputRef} className="custom-upload" id="file-upload" type="file" onChange={(event)=>dispatchFunction(event)}></input>
                        <Navbar.Brand as="button" className="sheet-button not-draggable" type="submit" onClick={(event) => exportToJson(event, props.charName, props.currentState)}>
                            Export to file
                        </Navbar.Brand>
                        
                    </>
                )
            }
            else {
                return (
                    <>
                        <Link to="/" tabIndex="0" className="home-button not-draggable" id="home-button" aria-label="home button that leads to landing page">
                            <MdHome size="2em" style={{position: "relative", right: "1px", bottom: "1px"}}/>
                        </Link>	
                        <NavDropdown style={{marginLeft:"0.5em"}} id="menu" controlID="main-menu" className="character-menu" title="Menu">
                            <NavDropdown.Item role="menuitem" onClick={event => props.handleNavDropdownClick(event, "web", "new")}>New Character</NavDropdown.Item>
                            <NavDropdown.Item role="menuitem" onClick={(event) => exportToJson(event, props.charName, props.currentState)}>Export to file</NavDropdown.Item>
                            <NavDropdown.Item role="menuitem" onClick={handleInputClick}>Import from file</NavDropdown.Item>
                            <NavDropdown.Item ref={inputRef} className="custom-upload" id="file-upload" as="input" type="file" onChange={(event)=>dispatchFunction(event)}></NavDropdown.Item>
                        </NavDropdown>
                    </>
                )
            }
        }
    }, [dispatchFunction, width, props.handleNavDropdownClick, props.charName, props.currentState])
    return (
        <>  
            {NavMenu(props.location.pathname)}
        </>
    )
}