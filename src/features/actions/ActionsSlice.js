import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

import {spellList} from "../../data/spells.js";


export const getAPISPelllist = createAsyncThunk('actions/fetchAPISpelllist', async () => {
    let spellListNames = []
    let spellList = []
    try {
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
    } catch (error) {
        console.error(error)
        return []
    }
})

const initialState = {
    actions: [
        {name: "Unarmed Attack", range: "Melee",  damage: 1, type: "Action", scaling: "Strength", isProficient: true, damageType:"Bludgeoning", description:"An attack with your fist, ellbow, head etc."},
    ],
    spells: [
	],
	sortedSpellList: [],
    highestSpellSlot: "1st",
    spellListAPI: []
}

const ActionsSlice = createSlice({
    name: "actions",
    initialState,
    reducers: {
        addAction: {
            reducer(state, action) {
                if(action.payload[1] === "Actions") {
                    state.actions.push(action.payload[0])
                }
                else if(action.payload[1] === "Spells") {
                    let slots = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
                    let test1 = slots.indexOf(action.payload[0].type)
                    let test2 = slots.indexOf(state.highestSpellSlot)
                    if(test1 > test2) {
                        state.highestSpellSlot = action.payload[0].type
                    }
                    state.spells.push(action.payload[0])
                }
            },
            prepare(data, id) {
                data["id"] = nanoid()
                return {
                    payload: [data, id]
                }
            }
        },
        editAction: {
            reducer(state, action) {
                if(action.payload[2] === "Actions") {				
                    let testIndex = state.actions.indexOf(state.actions.find(action1 => {return action1.id === action.payload[1].id}))
                    state.actions[testIndex] = action.payload[0]
                }
                else if(action.payload[2] === "Spells") {
                    let slots = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
                    let test1 = slots.indexOf(action.payload[0].type)
                    let test2 = slots.indexOf(state.highestSpellSlot)
                    if(test1 > test2) {
                        state.highestSpellSlot = action.payload[0].type
                    }
                    
                    let testIndex = state.spells.indexOf(state.spells.find(action1 => {return action1.id === action.payload[1].id }))
                    state.spells[testIndex] = action.payload[0]
                }
            },
            prepare(data, oldData, id) {
                return {
                    payload: [data, oldData, id]
                }
            }
        },
        deleteAction: {
            reducer(state, action) {
                if(action.payload[2] === "Actions") {
                    let test = state.actions.filter((action1) => {return action1.type === action.payload[0]})[action.payload[1]]
                    let index = state.actions.indexOf(test)
                    
                    state.actions = state.actions.slice(0, index).concat(state.actions.slice(index + 1))		
                }
                else if(action.payload[2] === "Spells") {
                    let test = state.spells.filter((action1) => {return action1.type === action.payload[0]})[action.payload[1]]
                    let index = state.spells.indexOf(test)
                    
                    let test2 = state.sortedSpellList.filter(spell => {return spell.name === test.name})[0]
                    if(test2) {
                        test2.isPrepared = false
                    }
                    
                    state.spells = state.spells.slice(0, index).concat(state.spells.slice(index + 1))
                    
                    var slots = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
                    var maxIndex = slots.indexOf(state.highestSpellSlot)
                    
                    for(let i=maxIndex; i>=0; i--) {
                        if(i > 0) {
                            if( state.spells.filter(spell => {return spell.type === slots[i]}).length === 0) {
                            }
                            else {
                                state.highestSpellSlot = slots[i]
                                break
                            }
                        }
                        else {
                            state.highestSpellSlot = slots[i]
                            break
                        }
                    }
                }
            },
            prepare(type, index, id){
                return {
                    payload: [type, index, id] 
                }
            }
        },
        setPrepared: {
            reducer(state, action) {
                if(action.payload[1]) {
                    if(state.spells.filter(spell => {return spell.name === action.payload[0]}).length === 0) {
                        let spell = state.sortedSpellList.filter(spell => {return spell.name === action.payload[0]})[0]
                        state.spells.push(spell)
                        spell.isPrepared = true
                        let slots = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
                        let test1 = slots.indexOf(spell.type)
                        let test2 = slots.indexOf(state.highestSpellSlot)
                        if(test1 > test2) {
                            state.highestSpellSlot = slots[test1]
                        }
                    }
                    else {
                        state.spells.filter(spell => {return spell.name === action.payload[0]})[0].isPrepared = action.payload[1]
                    }
                }
                else {
                    if(action.payload[2]) {
                        let test = state.spells.filter(spell => {return spell.name === action.payload[0]})[0]
                        test.isPrepared=false
                        let test2 = state.sortedSpellList.filter(spell => {return spell.name === action.payload[0]})[0]
                        if(test2) {
                            test2.isPrepared = action.payload[1]
                        }
                        let index = state.spells.indexOf(test)
                        state.spells = state.spells.slice(0, index).concat(state.spells.slice(index + 1))
                        
                        
                        var slots = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
                        var maxIndex = slots.indexOf(state.highestSpellSlot)
                        
                        for(let i=maxIndex; i>=0; i--) {
                            if(i > 0) {
                                if( state.spells.filter(spell => {return spell.type === slots[i]}).length === 0) {
                                }
                                else {
                                    state.highestSpellSlot = slots[i]
                                    break
                                }
                            }
                            else {
                                state.highestSpellSlot = slots[i]
                                break
                            }
                        }
                    }
                    else {
                        let test = state.spells.filter(spell => {return spell.name === action.payload[0]})[0]
                        test.isPrepared=false
                    }
                }
            },
            prepare(id, checked, offCanvas) {
                return{
                    payload: [id, checked, offCanvas]
                }
            }
        },
        buildSpelllist(state, action) {
            if(state.sortedSpellList.length === 0) {
				const listSlots = ["cantrip", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
				function returnSpellslot(number) {
					if(number === "cantrip") {
						return "Cantrip"
					}
					else {
						return listSlots[parseInt(number)]
					}
				}
				var spellLiistUnformatted = []
				spellList.map(spell => (
					spellLiistUnformatted.push({name: spell.name, range: spell.range, damage: "", type: returnSpellslot(spell.level), scaling: action.payload[1], isPrepared: false, damageType: "", description: spell.description, school: spell.school, ritual: spell.ritual, classes: spell.classes})
				))
				var spellLiistFormatted = spellLiistUnformatted.sort((a, b) => {
					const nameA = a.name.toUpperCase(); // ignore upper and lowercase
					const nameB = b.name.toUpperCase(); // ignore upper and lowercase
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}

					// names must be equal
					return 0;
				});
				state.sortedSpellList = spellLiistFormatted
				console.log(state.sortedSpellList)
			}
        },

        importActions(state, action) {
            let keys1 = Object.keys(state)
            keys1.map(key => 
                state[key] = action.payload[key]
            )
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAPISPelllist.fulfilled, (state, action) => {
                state.spellListAPI = action.payload
            })
    }
})


export default ActionsSlice.reducer

export const { addAction, editAction, deleteAction, setPrepared, buildSpelllist, buildSpelllistAPI, importActions } = ActionsSlice.actions