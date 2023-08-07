import { createSlice, nanoid } from "@reduxjs/toolkit"

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
                console.log(action.payload)
                if(action.payload[1] === "Speed") {
                    /*{displayed: event.target[0].value, ground: event.target[1].value, swim: event.target[2].value, climb: event.target[3].value, fly: event.target[4].value}*/
                    /*{name: "Speed", value: 30, ground: 30, swim: 15, climb: 15, fly: 0, displayed: "Ground"}*/
                    state.speed.displayed = action.payload[0].displayed
                    state.speed.ground = action.payload[0].ground
                    state.speed.swim = action.payload[0].swim
                    state.speed.climb = action.payload[0].climb
                    state.speed.fly = action.payload[0].fly 
                    if (action.payload[0].displayed === "Ground") {
                        state.speed.value = action.payload[0].ground
                    }
                    else if (action.payload[0].displayed === "Swim") {
                        state.speed.value = action.payload[0].swim
                    }
                    else if (action.payload[0].displayed === "Climb") {
                        state.speed.value = action.payload[0].climb
                    }
                    else if (action.payload[0].displayed === "Fly") {
                        state.speed.value = action.payload[0].fly
                    }
                }
            },
            prepare (data, id) {
                return {
                    payload: [data, id]
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