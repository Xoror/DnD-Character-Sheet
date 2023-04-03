import { createSlice, nanoid } from "@reduxjs/toolkit"
import AttributesSlice from "../attributes/AttributesSlice"

const initialState = {
	speed: {name: "Speed", value: 30, ground: 30, swim: 15, climb: 15, fly: 0, displayed: "Ground"},
    charHP: {current: '', max: '', temp: '',}
}

const miscAttributesSlice = createSlice({
    name: "miscAttributes",
    initialState,
    reducers: {
        changeMiscAttribute: {
            reducer(state, action) {
                if(action.id === "Speed") {
                    /*{displayed: event.target[0].value, ground: event.target[1].value, swim: event.target[2].value, climb: event.target[3].value, fly: event.target[4].value}*/
                    /*{name: "Speed", value: 30, ground: 30, swim: 15, climb: 15, fly: 0, displayed: "Ground"}*/
                    state.speed.displayed = action.payload.displayed
                    state.speed.ground = action.payload.ground
                    state.speed.swim = action.payload.swim
                    state.speed.climb = action.payload.climb
                    state.speed.fly = action.payload.fly 
                    if (action.payload.displayed === "Ground") {
                        state.speed.value = action.payload.ground
                    }
                    else if (action.payload.displayed === "Swim") {
                        state.speed.value = action.payload.swim
                    }
                    else if (action.payload.displayed === "Climb") {
                        state.speed.value = action.payload.climb
                    }
                    else if (action.payload.displayed === "Fly") {
                        state.speed.value = action.payload.fly
                    }
                }
            },
            prepare (data, id) {
                return {
                    payload: data,
                    id: id
                }
            }
        },
        changeHP(state, action) {
            if(action.payload[0] === "currentHP") {
                state.charHP.current = action.payload[1]
            }
            else if(action.payload[0] === "maxHP") {
                state.charHP.max = action.payload[1]
            }
            else if(action.payload[0] === "tempHP") {
                state.charHP.temp = action.payload[1]
            }
        },
        importMiscAttributes(state, action) {
            let keys1 = Object.keys(state)
            keys1.map(key => 
                state[key] = action.payload[key]
            )
        }
    }
})

export default miscAttributesSlice.reducer
export const { changeMiscAttribute, changeHP, importMiscAttributes } = miscAttributesSlice.actions