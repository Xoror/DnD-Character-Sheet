import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    autoSaveTimer: 15,
    diceLog: []
}

const SettingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        addRoll(state, action) {
            let name= action.payload[0]
            let defaultValue = action.payload[1]
            let rolls = action.payload[2]
            let bonus = action.payload[3]
            let result = action.payload[4]
            state.diceLog.push({
                name: name,
                dice: defaultValue,
                rolls: rolls,
                bonus: bonus,
                result: result
            })
            if(state.diceLog.length > 50) {
                state.diceLog = state.diceLog.splice(1)
            }
        },
        importSettings(state, action) {
            let keys1 = Object.keys(state)
            keys1.forEach(key => 
                state[key] = action.payload[key]
            )
        }
    }
})

export default SettingsSlice.reducer
export const { importSettings, addRoll } = SettingsSlice.actions