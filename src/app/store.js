import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import actionsReducer from "../features/actions/ActionsSlice"
import featuresReducer from "../features/classFeatures/FeaturesSlice"
import inventoryReducer from "../features/inventory/InventorySlice"
import attributesReducer from "../features/attributes/AttributesSlice"
import miscAttributesReducer from "../features/miscAttributes/MiscAttributesSlice"
import notesReducer from "../features/notes/NotesSlice"
import charDetailsReducer from "../features/charDetails/CharDetailsSlice"
import spellsReducer from "../features/spells/SpellSlice"
import resourcesReducer from "../features/resources/ResourcesSlice"
import conditionsReducer from "../features/conditions/ConditionsSlice"
import navBarReducer from "../features/nav/NavBarSlice"
import settingsReducer from "../features/settings/SettingsSlice"
import landingPageReducer from "../features/landingPage/LandingPageSlice"
import apiReducer from "../features/api/Api"


const appReducer = combineReducers({
	actions: actionsReducer,
	features: featuresReducer,
	attributes: attributesReducer,
	inventory: inventoryReducer,
	miscAttributes: miscAttributesReducer,
	notes: notesReducer,
	charDetails: charDetailsReducer,
	spells: spellsReducer,
	resources: resourcesReducer,
	conditions: conditionsReducer,
	navBar: navBarReducer,
	settings: settingsReducer,
	landingPage: landingPageReducer,
	api: apiReducer
})

const rootReducer = (state, action) => {
	if(action.type === 'import/state') {
		return appReducer(action.payload, action)
	}
	return appReducer(state, action)
}


function loadState ()  {
	console.log("initiate loading state")
	const serializedStateTest = JSON.parse(window.sessionStorage.getItem("dnd-sheet-state"))
	console.log(serializedStateTest)
	if(serializedStateTest === null || serializedStateTest === undefined) {
		console.log("yee")
		return {reducer: rootReducer}
	}
	else {
		console.log("loading state")
		return {reducer: rootReducer, preloadedState: serializedStateTest}
	}
	/*
	try {
		const serializedState = window.localStorage.getItem("dnd-sheet-state");
		console.log("loading state", JSON.parse(serializedState.charDetails))
		if (!serializedState) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (e) {
	  return undefined;
	}
	*/
  }

export const configureStoreAsync = () => {	
	return new Promise((resolve, reject) => {
		let preloadedStateLocal = loadState()
		console.log(preloadedStateLocal)
		let store = configureStore({reducer: rootReducer, preloadedState: preloadedStateLocal})
		resolve(store)
	})
}
const saveStateAsync = (state, url) => {
return new Promise((resolve, reject) => {
	fetch(url, {
		method: "POST",
		headers: { "Content-Type":"application/json"},
		body: JSON.stringify(state)
	})
	.then(r => r.json())
	.then(res => resolve(res))
})
}

const store = configureStore(
    loadState()
)

export default store




