import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    data: []
}

const NotesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        changeNotes(state, action) {
            state.data = action.payload
        },
        importNotes(state, action) {
            let keys1 = Object.keys(state)
            keys1.map(key => 
                state[key] = action.payload[key]
            )
        }
    }
})

export default NotesSlice.reducer
export const {changeNotes, importNotes} = NotesSlice.actions