import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
	spellSlots: [
		[false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false],
		[false, false, false, false, false],
		[false]
	],
}

const SpellSlice = createSlice({
    name: "spells",
    initialState,
    reducers: {
        changeSpellslot(state, action) {
            state.spellSlots[action.payload[0]][action.payload[1]] = action.payload[2]
        },
        importSpells(state, action) {
            let keys1 = Object.keys(state)
            keys1.map(key => 
                state[key] = action.payload[key]
            )
        }
    }
})

export default SpellSlice.reducer
export const {changeSpellslot, importSpells} = SpellSlice.actions