import { createSlice } from "@reduxjs/toolkit"

const initialState = {
        inventory: [],
        weight: 0,
	    currency: {platinum: 0, electrum: 0, gold: 0, silver: 0, copper: 0},
    }

var isEqualsJson = (obj1,obj2)=>{
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    //return true when the two json has same length and all the properties has same value key by key
    return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]===obj2[key]);
}

const InventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        addItem(state, action) {
            state.inventory.push(action.payload)
        },
        editItem: {
            reducer(state, action) {
                let testItemIndex = state.inventory.indexOf(state.inventory.filter(action1 => {return isEqualsJson(action1, action.payload[1])})[0])
			    state.inventory[testItemIndex] = action.payload[0]
            },
            prepare(data, oldData) {
                return {
                    payload: [data, oldData]
                }
            }
        },
        deleteItem: {
            reducer(state, action) {
                let testItem = state.inventory.filter((action1) => {return action1.type === action.payload[0]})[action.payload[1]]
                let index = state.inventory.indexOf(testItem)
                
                state.inventory = state.inventory.slice(0, index).concat(state.inventory.slice(index + 1))
            },
            prepare(type, index) {
                return {
                    payload: [type, index]
                }
            }
        },
        equipItem: {
            reducer(state, action) {
                let testEquipIndex = state.inventory.indexOf(state.inventory.filter(test => {return action.payload.name === test.name})[0])
			    state.inventory[testEquipIndex].isEquipped = action.checked
            },
            prepare(body, checked) {
                return {
                    payload: body,
                    checked: checked
                }
            }
        },
        importInventory(state, action) {
            let keys1 = Object.keys(state)
            keys1.map(key => 
                state[key] = action.payload[key]
            )
        }
    }
})

export default InventorySlice.reducer
export const { addItem, editItem, deleteItem, equipItem, importInventory} = InventorySlice.actions