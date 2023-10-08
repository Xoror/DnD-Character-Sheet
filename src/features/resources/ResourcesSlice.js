import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    data: [
        {name: "Hit Points", current: 1, maximum: 1, dice: ""}
    ]
}

const ResourcesSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {
        addResource(state, action) {
            state.data.push(action.payload)
        },
        editResource(state, action) {
            if(action.payload[2] === "maximum") {
				state.data.filter((resource) => {return resource.name === action.payload[0]})[0].maximum = action.payload[1]
			}
			else if(action.payload[2] === "current") {
				state.data.filter((resource) => {return resource.name === action.payload[0]})[0].current = action.payload[1]
			}
			else if(action.payload[2] === "dice") {
				state.data.filter((resource) => {return resource.name === action.payload[0]})[0].dice = action.payload[1]
			}
        },
        deleteResource(state, action) {
			state.data = state.data.slice(0, action.payload).concat(state.data.slice(action.payload + 1))
        },
        importResources(state, action) {
            let keys1 = Object.keys(state)
            keys1.forEach(key => 
                state[key] = action.payload[key]
            )
        }
    }
})

export default ResourcesSlice.reducer
export const {addResource, editResource, deleteResource, importResources} = ResourcesSlice.actions