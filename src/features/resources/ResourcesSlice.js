import { createSlice, nanoid } from "@reduxjs/toolkit"

const testData = [
    {id: nanoid(), name: "Hit Points", current: 1, maximum: 1, dice: ""},
]
for(let i=0; i<20; i++) {
    testData.push({id: nanoid(), name: `Hit Points ${i+1}`, maximum: 1, current: 1, dice:""})
}

const initialState = {
    data: testData
}

const ResourcesSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {
        addResource(state, action) {
            action.payload["id"] = nanoid()
            action.payload.maximum = parseInt(action.payload.maximum)
            action.payload.current = parseInt(action.payload.current)
            state.data.push(action.payload)
        },
        editResource(state, action) {
            if(action.payload[2] === "maximum") {
				state.data.filter((resource) => {return resource.id === action.payload[0]})[0].maximum = parseInt(action.payload[1])
			}
			else if(action.payload[2] === "current") {
				state.data.filter((resource) => {return resource.id === action.payload[0]})[0].current = parseInt(action.payload[1])
			}
			else if(action.payload[2] === "dice") {
				state.data.filter((resource) => {return resource.id === action.payload[0]})[0].dice = parseInt(action.payload[1])
			}
        },
        deleteResource(state, action) {
            let testResource = state.data.find(resource => resource.id === action.payload)
            let testIndex = state.data.indexOf(testResource)
			state.data = state.data.slice(0, testIndex).concat(state.data.slice(testIndex + 1))
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