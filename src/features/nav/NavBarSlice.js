import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export const importCharacterNames = createAsyncThunk('navBar/importCharacterNames', async (payload) => {
    try {
        let result = await window.api.getFullDB(payload)
        return result
    } catch (error) {
        console.log(error)
        return []
    }
})
export const importCharacter = createAsyncThunk("navBar/importCharacter", async (payload) => {
    let character = payload[0]
    let id = payload[1]
    try {
        let result = await window.api.loadRow(payload)
        return result[0]
    } catch(error) {
        console.log(error)
        return []
    }
})
export const importCharacterReadOnly = createAsyncThunk("navBar/importCharacterReadOnly", async (payload) => {
    let character = payload[0]
    let id = payload[1]
    try {
        let result = await window.api.loadRow(payload)
        return result[0]
    } catch(error) {
        console.log(error)
        return []
    }
})
export const addCharacterToDatabase = createAsyncThunk('navBar/addCharacterToDatabase', async (payload) => {
    try {
        let result = await window.api.addRow(payload)
        console.log("Row added!")
        return payload[1]
    } catch (error) {
        console.log(error)
        return ""
    }
})
export const changeCharacterIndDB = createAsyncThunk("navbar/changeRowInDB", async (payload) => {
    try {
        let result = await window.api.changeRow(payload)
        return payload[1]
    } catch (error) {
        console.log(error)
        return ""
    }
})

const initialState = {
    characters: {names: [""], id: [""], status: "idle"},
    importFromDbStatus: "idle",
    addCharactertoDBStatus: "idle",
    changeCharacterInDBStatus: "idle",
    currentlyEditing: {id: 0, name: "None"},
    lastSaved: "Never",
    compareState: {},
    autoSaveTimer: 15,
    desktop: false,
}

const NavBarSlice = createSlice({
    name: "navBar",
    initialState,
    reducers: {
        importNavBar(state, action) {
            let keys1 = Object.keys(state)
            keys1.map(key => 
                state[key] = action.payload[key]
            )
        }
    },
    extraReducers(builder) {
        builder
            .addCase(importCharacterNames.pending, (state, action) => {
                state.characters.status = "pending"
            })
            .addCase(importCharacterNames.fulfilled, (state, action) => {
                state.characters.status = "succeeded"
                let bla = []
                let bla2 = []
                action.payload.map((character, index) => (
                    bla.push(character.name),
                    bla2.push(character.id)
                ))
                state.characters.names = bla
                state.characters.id = bla2
            })
            .addCase(importCharacterNames.rejected, (state, action) => {
                state.characters.status = "rejected"
            })

            .addCase(importCharacter.pending, (state, action) => {
                state.importFromDbStatus = "pending"
            })
            .addCase(importCharacter.fulfilled, (state, action) => {
                state.currentlyEditing.id = action.payload.id
                state.currentlyEditing.name = state.characters.names[action.payload[1]]
                state.lastSaved = new Date().toLocaleString()
                state.compareState = JSON.parse(action.payload.state)
                state.importFromDbStatus = "succeeded"
            })
            .addCase(importCharacter.rejected, (state, action) => {
                state.importFromDbStatus = "rejected"
            })

            .addCase(addCharacterToDatabase.pending, (state, action) => {
                state.addCharactertoDBStatus = "pending"
            })
            .addCase(addCharacterToDatabase.fulfilled, (state, action) => {
                //console.log(action.payload)
                state.currentlyEditing.id = state.characters.id[state.characters.id.length -1] + 1
                state.currentlyEditing.name = action.payload[0]
                state.lastSaved = action.payload[2]
                state.compareState = JSON.parse(action.payload[1])
                state.addCharactertoDBStatus = "succeeded"
            })
            .addCase(addCharacterToDatabase.rejected, (state, action) => {
                state.addCharactertoDBStatus = "rejected"
            })

            .addCase(changeCharacterIndDB.pending, (state, action) => {
                state.changeCharacterInDBStatus = "pending"
            })
            .addCase(changeCharacterIndDB.fulfilled, (state, action) => {
                //console.log(action.payload)
                if( action.payload[0] != "Autosave" && action.payload[0] != undefined) {
                    state.currentlyEditing.name = state.characters.names[action.payload[3]]
                    state.currentlyEditing.id = action.payload[3]
                    state.lastSaved = action.payload[2]
                    state.compareState = JSON.parse(action.payload[1])
                }
                state.changeCharacterInDBStatus = "succeeded"
            })
            .addCase(changeCharacterIndDB.rejected, (state, action) => {
                state.changeCharacterInDBStatus = "rejected"
            })
    }
})

export default NavBarSlice.reducer
export const { importNavBar } = NavBarSlice.actions