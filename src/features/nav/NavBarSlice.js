import { createAsyncThunk, createSlice, current, isRejectedWithValue, nanoid } from "@reduxjs/toolkit";
import { website, localhost, getCharacterNamesFunction, getCharacterFunction, addCharacterFunction, updateCharacterFunction } from "../../utils/apiCallFunctions"

import { isDev, httpRequestTimout } from "../../config"
import { apiErrorParse } from "../../utils/ErrorParseFunctions.js"

// Import character names
export const importCharacterNames = createAsyncThunk('navBar/importCharacterNames', async (payload, {rejectWithValue}) => {
    const {body, type} = payload
    if(type === "desktop") {
        try {
            let result = await window.api.getFullDB(body)
            console.log(result)
            if(result.status === "ok") {
                return result.body
            }
            else {
                return rejectWithValue(result)
            }
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
    else if(type === "web") {
        let url = isDev ? localhost : website
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), httpRequestTimout)
        try {
            const response = await getCharacterNamesFunction(url, controller.signal)
            const responseJSON = await response.json()
            if(response.ok) {
                let data = []
                responseJSON.body.map((character, index) => {
                    data.push({id: character._id, name: character.characterName})
                })
                return data
            }
            else {
                return rejectWithValue(responseJSON)
            }
        } catch (err) {
            return rejectWithValue(err)
        } finally {
            clearTimeout(timeoutId)
        }
    }
})
export const importCharacter = createAsyncThunk("navBar/importCharacter", async (payload, {rejectWithValue}) => {
    const { body, type} = payload
    if(type === "desktop") {
        let character = payload[0]
        let id = payload[1]
        try {
            let result = await window.api.loadRow(body)
            if(result.status === "ok") {
                console.log(result.body)
                return result.body
            }
            else {
                return rejectWithValue(result)
            }
        } catch(error) {
            return [error]
        }
    }
    else if(type === "web") {
        let url = isDev ? localhost : website
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), httpRequestTimout)
        try {
            const response = await getCharacterFunction(body, url, controller.signal)
            const responseJSON = await response.json()
            if(response.ok) {
                return {id: responseJSON.body[0]._id, state: responseJSON.body[0].characterData}
            }
            else {
                return rejectWithValue(responseJSON)
            }
        } catch (err) {
            return rejectWithValue(err)
        } finally {
            clearTimeout(timeoutId)
        }
    }
})
export const addCharacterToDatabase = createAsyncThunk('navBar/addCharacterToDatabase', async (payload, {rejectWithValue}) => {
    const { body, type} = payload
    if(type === "desktop") {
        try {
            let id=nanoid()
            body[1].push(id)
            let result = await window.api.addRow(body)
            return {data: body[1], type: type}
        } catch (error) {
            console.log(error)
            return ""
        }
    }
    else if(type === "web") {
        let url = isDev ? localhost : website
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), httpRequestTimout)
        try {
            const response = await addCharacterFunction(body, url, controller.signal)
            const responseJSON = await response.json()
            if(response.ok) {
                return {data: responseJSON.body.data, type: type}
            }
            else {
                return rejectWithValue(responseJSON)
            }
        } catch (err) {
            return rejectWithValue(err)
        } finally {
            clearTimeout(timeoutId)
        }
    }
})
export const changeCharacterIndDB = createAsyncThunk("navbar/changeRowInDB", async (payload, {rejectWithValue}) => {
    const { body, type} = payload
    if(type === "desktop") {
        try {
            let result = await window.api.changeRow(body)
            return body[1]
        } catch (error) {
            console.log(error)
            return ""
        }
    }
    else if(type === "web") {// [name, state, lastSaved, id]
        let url = isDev ? localhost : website
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), httpRequestTimout)
        try {
            const response = await updateCharacterFunction(body, url, controller.signal)
            const responseJSON = await response.json()
            if(response.ok) {
                return [responseJSON.body.characterName, responseJSON.body.characterData, responseJSON.body.lastSaved, responseJSON.body._id]
            }
            else {
                return rejectWithValue(responseJSON)
            }
        } catch (err) {
            return rejectWithValue(err)
        } finally {
            clearTimeout(timeoutId)
        }
    }
})

const initialState = {
    characters: {names: [], id: [], status: "idle"},
    importFromDbStatus: "idle",
    addCharactertoDBStatus: "idle",
    changeCharacterInDBStatus: "idle",
    currentlyEditing: {id: 0, name: "None"},
    lastSaved: "Never",
    compareState: {},
}

const NavBarSlice = createSlice({
    name: "navBar",
    initialState,
    reducers: {
        importNavBar(state, action) {
            let keys1 = Object.keys(state)
            keys1.forEach(key => 
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
                action.payload.forEach((character, index) => (
                    bla.push(character.name),
                    bla2.push(character.id)
                ))
                state.characters.names = bla
                state.characters.id = bla2
            })
            .addCase(importCharacterNames.rejected, (state, action) => {
                state.characters.status = "rejected"
                console.log(apiErrorParse(action.payload))
            })


            .addCase(importCharacter.pending, (state, action) => {
                state.importFromDbStatus = "pending"
            })
            .addCase(importCharacter.fulfilled, (state, action) => {
                state.currentlyEditing.id = action.payload.id
                let name = state.characters.names[state.characters.id.indexOf(action.payload.id)]
                state.currentlyEditing.name = name
                state.lastSaved = new Date().toLocaleString()
                state.compareState = JSON.parse(action.payload.state)
                state.importFromDbStatus = "succeeded"
            })
            .addCase(importCharacter.rejected, (state, action) => {
                state.importFromDbStatus = "rejected"
                console.log(apiErrorParse(action.payload))
            })

            .addCase(addCharacterToDatabase.pending, (state, action) => {
                state.addCharactertoDBStatus = "pending"
            })
            .addCase(addCharacterToDatabase.fulfilled, (state, action) => {
                //console.log(action.payload)
                if(action.payload.type === "desktop") {
                    state.currentlyEditing.id = state.characters.id[state.characters.id.length -1] + 1
                    state.currentlyEditing.name = action.payload.data[0]
                    state.lastSaved = action.payload.data[2]
                    state.compareState = JSON.parse(action.payload.data[1])
                    state.addCharactertoDBStatus = "succeeded"
                }
                else if(action.payload.type === "web") {
                    console.log(action.payload)
                    state.currentlyEditing.id = action.payload.data._id
                    state.currentlyEditing.name = action.payload.data.characterName
                    state.lastSaved = action.payload.data.lastSaved
                    state.compareState = JSON.parse(action.payload.data.characterData)
                    state.addCharactertoDBStatus = "succeeded"
                }
            })
            .addCase(addCharacterToDatabase.rejected, (state, action) => {
                state.addCharactertoDBStatus = "rejected"
                console.log(apiErrorParse(action.payload))
            })

            .addCase(changeCharacterIndDB.pending, (state, action) => {
                state.changeCharacterInDBStatus = "pending"
            })
            .addCase(changeCharacterIndDB.fulfilled, (state, action) => {
                console.log(action.payload)
                if( action.payload[0] != "Autosave" && action.payload[0] != undefined) {
                    state.currentlyEditing.name = action.payload[0]
                    state.currentlyEditing.id = action.payload[3]
                    state.lastSaved = action.payload[2]
                    state.compareState = JSON.parse(action.payload[1])
                }
                state.changeCharacterInDBStatus = "succeeded"
            })
            .addCase(changeCharacterIndDB.rejected, (state, action) => {
                state.changeCharacterInDBStatus = "rejected"
                console.log(apiErrorParse(action.payload))
            })
    }
})

export default NavBarSlice.reducer
export const { importNavBar } = NavBarSlice.actions