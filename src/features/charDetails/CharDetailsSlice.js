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
        {name:"Common", knows: true},
    ],
    senses: [
        {name:"Darkvision", has: true, distance: 60},
        {name:"Blindsight", has: false, distance: 30},
        {name:"Truesight", has: false, distance: 20},
        {name:"Tremor Sense", has: false, distance: 20 }
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
                state.languages.push({name: action.payload[0], knows: true})
            }
            else if (id === "Senses") {
                state.senses[action.payload[0]].has = true
            }
            else if (id === "Resistances") {
                state.resistances.push({name: action.payload[0], has: true})
            }
            else if (id === "Immunities") {
                state.immunities.push({name: action.payload[0], has: true})
            }
            else if (id === "Vulnerabilities") {
                state.vulnerabilities.push({name: action.payload[0], has: true})
            }
        },
        importCharDetails(state, action) {
            let keys1 = Object.keys(state)
            keys1.map(key => 
                state[key] = action.payload[key]
            )
        },
        deleteLanguage(state, action) {
            state.languages = state.languages.slice(0,action.payload).concat(state.languages.slice(action.payload + 1))
        },
        deleteSense(state, action) {
            state.senses = state.senses.slice(0,action.payload).concat(state.senses.slice(action.payload + 1))
        },
        changeSenseValue(state, action) {
            state.senses[action.payload[1]].distance = action.payload[0]
        },
        deleteResistances(state, action) {
            state[action.payload[0]] = state[action.payload[0]].slice(0, action.payload[1]).concat(state[action.payload[0]].slice(action.payload[1]+1))
        }
    },
    //extraReducers: (builder) => builder.addCase(revertAll, () => initialState)
})

export default CharDetailsSlice.reducer
export const { changeDetails, importCharDetails, addLanguage, deleteLanguage, deleteSense, changeSenseValue, deleteResistances } = CharDetailsSlice.actions