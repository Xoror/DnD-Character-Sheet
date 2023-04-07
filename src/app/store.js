import { configureStore } from "@reduxjs/toolkit";

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

const store = configureStore({
    reducer: {
        actions: actionsReducer,
        features: featuresReducer,
        attributes: attributesReducer,
        inventory: inventoryReducer,
		miscAttributes: miscAttributesReducer,
		notes: notesReducer,
		charDetails: charDetailsReducer,
		spells: spellsReducer,
		resources: resourcesReducer,
        conditions: conditionsReducer
    },
})

export default store


