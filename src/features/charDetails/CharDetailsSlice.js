import { createSlice, nanoid, current } from "@reduxjs/toolkit"


const initialState = {
    charLevel: 1,
	charName: "",
	charClass: "",
	charSubclass: "",
    charLineage: "",
    charBackground: "",
    charExperience: 0,
    languages: [
        {id: nanoid(), name:"Common"},
    ],
    senses: [
        {id: nanoid(), name:"Darkvision", distance: 60},
        {id: nanoid(), name:"Blindsight", distance: 30},
        {id: nanoid(), name:"Truesight", distance: 20},
        {id: nanoid(), name:"Tremor Sense", distance: 20}
    ],
    sensesHas: [

    ],
    resistances: [

    ],
    immunities: [

    ],
    vulnerabilities: [
        
    ]
}

const CharDetailsSlice = createSlice({
    name: "charDetails",
    initialState,
    reducers: {
        changeDetails(state, action) {
            let id = action.payload[1];
			if(id === "NameChange") {
				state.charName = action.payload[0]
			}
			else if (id === "ClassChange") {
				state.charClass = action.payload[0]
			}
			else if (id === "SubClassChange") {
				state.charSubclass = action.payload[0]
			}
			else if (id === "Level") {
				state.charLevel = action.payload[0]
			}
            else if (id === "Lineage") {
                state.charLineage = action.payload[0]
            }
            else if (id === "Background") {
                state.charBackground = action.payload[0]
            }
            else if( id === "Experience Points") {
                state.charExperience = action.payload[0]
            }
            else if( id === "Languages") {
                state.languages.push({id: nanoid(), name: action.payload[0]})
            }
            else if (id === "Senses") {
                state.sensesHas.push(state.senses.find(sense => sense.id === action.payload[0]))
            }
            else if (id === "Resistances") {
                state.resistances.push({id: nanoid(), name: action.payload[0]})
            }
            else if (id === "Immunities") {
                state.immunities.push({id: nanoid(), name: action.payload[0]})
            }
            else if (id === "Vulnerabilities") {
                state.vulnerabilities.push({id: nanoid(), name: action.payload[0]})
            }
        },
        importCharDetails(state, action) {
            let keys1 = Object.keys(state)
            keys1.map(key => 
                state[key] = action.payload[key]
            )
        },
        deleteLanguage(state, action) {
            state.languages = state.languages.filter(language => (language.id != action.payload.id))
        },
        deleteSense(state, action) {
            state.sensesHas = state.sensesHas.filter(sense => sense.id != action.payload.id)
        },
        changeSenseValue(state, action) {
            state.sensesHas.find(sense => sense.id === action.payload[1]).distance = action.payload[0]
        },
        deleteResistances(state, action) {
            state[action.payload[0]] = state[action.payload[0]].filter(item => item.id != action.payload[1].id)
        }
    },
    //extraReducers: (builder) => builder.addCase(revertAll, () => initialState)
})

export default CharDetailsSlice.reducer
export const { changeDetails, importCharDetails, addLanguage, deleteLanguage, deleteSense, changeSenseValue, deleteResistances } = CharDetailsSlice.actions