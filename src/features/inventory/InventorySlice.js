import { createSlice, nanoid, createAsyncThunk, current } from "@reduxjs/toolkit"
import axios from "axios";

export const getClassStartingItems = createAsyncThunk('actions/fetchAPISpelllist', async () => {
    let spellListNames = []
    let spellList = []
    try {
        let response = await axios.get("https://www.dnd5eapi.co/api/classes/fighter")
        console.log(response.data)
        return response.data
        /*
        let response = await axios.get("https://www.dnd5eapi.co/api/spells")
        spellListNames = response.data.results
        await axios.all(
            spellListNames.map(name => (axios.get(`https://www.dnd5eapi.co${name.url}`)))
        ).then((responses => {
            responses.forEach((resp) => {
                spellList.push(resp.data)
            })
        }))
        return spellList
        */
    } catch (error) {
        console.error(error)
        return []
    }
})

const initialState = {
        inventory: [
            {
                filtered:true, 
                id: nanoid(), 
                name: "Test", 
                container: "equipment",
                category: "Weapon",
                qty: 1, 
                worth: 2, 
                weight: 3, 
                isEquipped: false,
                rarity: "Common",
                attunable: false,
                attuned: false,
                attuneRequirement: "requires attunment by a druid",
                description: ["This is a test, a meddle of strength"]
            }
        ],
        containers: [
            {id: "equipment", value: "equipment", label: "Equipment", weight:0}
        ],
        weight: 0,
	    currency: {platinum: 0, electrum: 0, gold: 0, silver: 0, copper: 0},
        startingItems: {}
    }

const InventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        addItem(state, action) {
            action.payload["id"] = nanoid()
            state.inventory.push(action.payload)
        },
        editItem: {
            reducer(state, action) {
                console.log(action.payload)
                let testIndex = state.inventory.indexOf(state.inventory.find(item => {return item.id === action.payload.id}))
                state.inventory[testIndex] = action.payload
            },
            prepare(data) {
                return {
                    payload: data
                }
            }
        },
        deleteItem: {
            reducer(state, action) {
                let testItem = state.inventory.find((action1) => {return action1.id === action.payload[0]})
                let index = state.inventory.indexOf(testItem)
                
                state.inventory = state.inventory.slice(0, index).concat(state.inventory.slice(index + 1))
            },
            prepare(id) {
                return {
                    payload: [id]
                }
            }
        },
        equipItem: {
            reducer(state, action) {
                let testEquipIndex = state.inventory.indexOf(state.inventory.filter(test => {return action.payload[0] === test.id})[0])
			    state.inventory[testEquipIndex].isEquipped = action.payload[1]
            },
            prepare(id, checked) {
                return {
                    payload: [id, checked]
                }
            }
        },
        importInventory(state, action) {
            let keys1 = Object.keys(state)
            keys1.map(key => 
                state[key] = action.payload[key]
            )
        },
        addContainer(state, action) {
            action.payload["id"] = nanoid()
            state.containers.push(action.payload)
        },
        editContainer(state, action) {
            action.payload["id"] = nanoid()
            state.containers.push(action.payload)
        },
        deleteContainer(state, action) {
            action.payload["id"] = nanoid()
            state.containers.push(action.payload)
        },
        updateTotals(state, action) {
            let testWeight = 0
            let testCurrency = 0
            state.inventory.map(item => testWeight += item.weight)
            state.containers.map(container => testWeight += container.weight)
            if(state.weight != testWeight) {
                state.weight = testWeight
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getClassStartingItems.fulfilled, (state, action) => {
                console.log(action.payload)
                state.startingItems = action.payload
            })
    }
})

export default InventorySlice.reducer
export const { addItem, editItem, deleteItem, equipItem, importInventory, 
    addContainer, editContainer, deleteContainer, updateTotals} = InventorySlice.actions