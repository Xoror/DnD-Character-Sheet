import React, { useState, lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"

import { isDesktop } from "../../config"

import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import { buildSpelllist, buildSpelllistFromDB } from '../actions/ActionsSlice';

const FeaturesBox = lazy(() => import('./FeaturesBox'));
const ActionsBox = lazy(() => import('../actions/ActionsBox'));
const InventoryBox = lazy(() => import('../inventory/InventoryBox'));
const Notes = lazy(() => import('../notes/Notes'));

export const ThirdColumn = () => {
	const dispatch = useDispatch()
    const actions = useSelector(state => state.actions.actions)
    const spells = useSelector(state => state.actions.spells)
    const charClass = useSelector(state => state.charDetails.charClass)
    const castingAttribute = useSelector(state => state.attributes.casting.scaling)
    const highestSpellSlot = useSelector(state => state.actions.highestSpellSlot)
	const [activePane, setActivePane] = useState("features")

	useEffect(() => {
		if(activePane === "spells"){
			if(!isDesktop) {
				dispatch(buildSpelllist([charClass, castingAttribute]))
			}
			else if(isDesktop) {
				dispatch(buildSpelllistFromDB("SELECT data FROM spells")).then(result => console.log(result))
			}
		}
	}, [activePane, dispatch, charClass, castingAttribute])

	const headersActions = ["Action", "Bonus Action", "Reaction", "Special"];
	const listSlots = ["Cantrip","1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
	const headersSpells = listSlots.slice(0,listSlots.indexOf(highestSpellSlot)+1)
	/*
	const sections = [
        <FeaturesBox/>, 
        <ActionsBox offCanvas={false} actions={actions} id="Actions" options={headersActions} headers={headersActions}/>, 
        <ActionsBox offCanvas={false} actions={spells} id="Spells" options={listSlots} headers={headersSpells} spells={true}/>, 
        <InventoryBox/>, 
        <Notes/>,
    ]{false ? sections[parseInt(radioValue)] : null}
	*/
	
	return (
		<>
			<Card className="main-element-card" > 
				<Tab.Container transition={false} id="third-column-nav" defaultActiveKey="features" activeKey={activePane} onSelect={event => setActivePane(event)}> 
					<>
						<Nav id="third-column-nav" fill variant="tabs" defaultActiveKey="/home">
								<Nav.Link eventKey="features">Features</Nav.Link>
								<Nav.Link eventKey="actions">Actions</Nav.Link>
								<Nav.Link eventKey="spells">Spells</Nav.Link>
								<Nav.Link eventKey="inventory">Inventory</Nav.Link>
								<Nav.Link eventKey="notes">Notes</Nav.Link>
						</Nav>
						<Tab.Content>
							<Suspense>
								<Tab.Pane eventKey="features">
									<FeaturesBox/>
								</Tab.Pane>
								<Tab.Pane eventKey="actions">
									<ActionsBox offCanvas={false} actions={actions} id="Actions" options={headersActions} headers={headersActions}/>
								</Tab.Pane>
								<Tab.Pane eventKey="spells">
									<ActionsBox offCanvas={false} actions={spells} id="Spells" options={listSlots} headers={headersSpells} spells={true}/>
								</Tab.Pane>
								<Tab.Pane eventKey="inventory">
									<InventoryBox/>
								</Tab.Pane>
								<Tab.Pane eventKey="notes">
									<Notes/>
								</Tab.Pane>
							</Suspense>
						</Tab.Content>
					</>
				</Tab.Container>
			</Card>
		</>
	)
}
/*
<ButtonGroup>
	{radios.map((radio, idx) => (
		<ToggleButton key={idx} id={`radio-${idx}`} type="radio" variant='primary' name="radio" value={radio.value} checked={radioValue === radio.value} onChange={handleSwitch} >
			{radio.name}
		</ToggleButton>
	))}
</ButtonGroup>
*/