import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    autoSaveTimer: 15,
    desktop: false
}

const SettingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        importSettings(state, action) {
            let keys1 = Object.keys(state)
            keys1.map(key => 
                state[key] = action.payload[key]
            )
        }
    }
})

export default SettingsSlice.reducer
export const { importSettings } = SettingsSlice.actions