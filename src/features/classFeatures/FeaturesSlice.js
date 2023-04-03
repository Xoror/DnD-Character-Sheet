import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    data: [
        {name: "Lineage Features", level: 1, featureClass: "-", featureSubclass: "-", description: "Placeholder"},
        {name: "Lineage Features", level: 1, featureClass: "-", featureSubclass: "-", description: "Placeholder"},
    ]
}

const FeaturesSlice = createSlice({
    name: "features",
    initialState,
    reducers: {
        addFeature(state, action) {
            state.data.push(action.payload)
        },
        editFeature: {
            reducer (state, action) {
                state.data[action.payload[1]] = action.payload[0]
            },
            prepare(data, indexArray) {
                return {
                    payload: [data, indexArray]
                }
            }
        },
        deleteFeature(state, action) {
			state.data = state.data.slice(0, action.payload).concat(state.data.slice(action.payload + 1))
        },
        importFeatures(state, action) {
            let keys1 = Object.keys(state)
            keys1.map(key => 
                state[key] = action.payload[key]
            )
        }
    }
})

export default FeaturesSlice.reducer
export const {addFeature, editFeature, deleteFeature, importFeatures} = FeaturesSlice.actions
