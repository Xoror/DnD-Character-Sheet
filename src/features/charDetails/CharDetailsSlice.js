import { createSlice, nanoid } from "@reduxjs/toolkit"


const initialState = {
    charLevel: 1,
	charName: "",
	charClass: "",
	charSubclass: "",
    charLineage: "",
    charBackground: "",
    charExperience: 0,
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
        },
        importCharDetails(state, action) {
            let keys1 = Object.keys(state)
            keys1.map(key => 
                state[key] = action.payload[key]
            )
        }
    },
    //extraReducers: (builder) => builder.addCase(revertAll, () => initialState)
})

export default CharDetailsSlice.reducer
export const { changeDetails, importCharDetails } = CharDetailsSlice.actions