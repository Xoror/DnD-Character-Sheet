import { createSlice, nanoid, current, createAction } from "@reduxjs/toolkit"


export const attributeChange = createAction(
	"attributes/attributeChange",
	async (payload, dispatch) => {
		dispatch(attributeChange2(payload))
		dispatch(computeInitiative())
		dispatch(updateProficiencies())
		dispatch(computeAC())
		dispatch(computeHitDC())
	}
  )

const initialState = {
	casting: {isCaster: true, type: "", spellAttribute: "", spellHit: 2, spellDC: 10},
    charAttributes: [
		{ id: 'Strength', name: 'Strength', value: 10, bonus: 0},
		{ id: 'Dexterity', name: 'Dexterity', value: 10, bonus: 0},
		{ id: 'Constitution', name: 'Constitution', value: 10, bonus: 0},
		{ id: 'Intelligence', name: 'Intelligence', value: 10, bonus: 0},
		{ id: 'Wisdom', name: 'Wisdom', value: 10, bonus: 0},
		{ id: 'Charisma', name: 'Charisma', value: 10, bonus: 0},
	],
	jackOfAllTrades: false,
	skills: [
		{id: nanoid(), name: "Strength Saving Throw", shortName: "Saving Throw", supSkill: "Strength", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name:"Athletics", shortName:"Athletic", supSkill: "Strength", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Dexterity Saving Throw", shortName: "Saving Throw", supSkill: "Dexterity", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name:"Acrobatics", shortName:"Acrobatics", supSkill: "Dexterity", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name:"Slight of Hand", shortName:"Slight of Hand", supSkill: "Dexterity", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name:"Stealth", shortName:"Stealth", supSkill: "Dexterity", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Constitution Saving Throw", shortName: "Saving Throw", supSkill: "Constitution", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Intelligence Saving Throw", shortName: "Saving Throw", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name:"Arcana", shortName:"Arcana", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name:"History", shortName:"History", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name:"Investigation", shortName:"Investigation", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name:"Nature", shortName:"Nature", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name:"Religion", shortName:"Religion", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Wisdom Saving Throw", shortName: "Saving Throw", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Animal Handling", shortName: "Animal Handling", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Insight", shortName: "Insight", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Medicine", shortName: "Medicine", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Perception", shortName: "Perception", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Survival", shortName: "Survival", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Charisma Saving Throw", shortName: "Saving Throw", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Deception", shortName: "Deception", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Intimidation", shortName: "Intimidation", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Performance", shortName: "Performance", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Persuasion", shortName: "Persuasion", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
		{id: nanoid(), name: "Simple Weapons", shortName: "Simple Weapons", supSkill: "Weapon", bonus: "", proficient: false, expertise: false},
		{id: nanoid(), name: "Martial Weapons", shortName: "Martial Weapons", supSkill: "Weapon", bonus: "", proficient: false, expertise: false},
		{id: nanoid(), name: "Shield", shortName: "Shield", supSkill: "Weapon", bonus: "", proficient: false, expertise: false},
		{id: nanoid(), name: "Light Armor", shortName: "Light Armor", supSkill: "Armor", bonus: "", proficient: false, expertise: false},
		{id: nanoid(), name: "Medium Armor", shortName: "Medium Armor", supSkill: "Armor", bonus: "", proficient: false, expertise: false},
		{id: nanoid(), name: "Heavy Armor", shortName: "Heavy Armor", supSkill: "Armor", bonus: "", proficient: false, expertise: false},
	],
	proficienciesTypes: [
		{value: "weapon", label: "Weapon"}, 
		{value: "armor", label: "Armor"}, 
		{value: "tool", label: "Tool"}, 
		{value: "instrument", label: "Instrument"},
		{value: "other", label: "Other"}
	],
	proficiency: {id: "proficiency", name: "Proficiency", value: 2},
    charAC: {id: "AC", name: "AC", value: 10, baseAC: 10, scalingPrimary: "Dexterity", unarmoredDefense: true, scalingSecondary: "None", wearsArmor: false, maxBonus: 100, stealthDisadvantage: false},
	initiative: {id: "initiative", name: "Initiative", value: 0, scalingPrimary: "Dexterity", scalingSecondary: "None", flatBonus: 0 }
}

const AttributeSlice = createSlice({
    name: "attributes",
    initialState,
    reducers: {
        changeJackOfAllTrades(state, action) {
            state.jackOfAllTrades = action.payload
        },
        attributeChange2(state, action) {
            let id = action.payload[1];
            const bonus = (value) => {
                return Math.floor( (value - 10)/2);
            }
            /* Dangerous bc "change" IS the state.charattribute object, so change that directly and not a copy like in python!! */
            let change = state.charAttributes.filter(attribute => attribute.id=== id)[0]
            change.value = action.payload[0]
            change.bonus = bonus(action.payload[0])
        },
        proficiencyChange(state, action) {
            let id2 = action.payload[2];
			let name2 = action.payload[1];
			let skill = state.skills.filter((skill) => {return skill.name === name2})[0]
			if(id2 === "Proficiency") {
				skill.proficient = action.payload[0]
				if(action.payload[0] === false) {
					skill.expertise = action.payload[0]
				}
			}
			else if (id2 === "Expertise") {
				skill.expertise = action.payload[0]
				if(action.payload[0] === true) {
					skill.proficient = action.payload[0]
				}
			}
        },
		addMiscProficiency(state, action) {
			state.skills.push( 
				{id: nanoid(), name: action.payload[0], shortName: action.payload[0], supSkill: action.payload[1], bonus: "", proficient: action.payload[2], expertise: action.payload[3]}, 
			)
		},
		deleteMiscProficiency(state, action) {
			state.skills = state.skills.filter(skill => skill.id != action.payload)
		},
		addProficiencyType(state, action) {
			state.proficienciesTypes.push(action.payload)
			//console.log(current(state.proficienciesTypes))
		},
		updateProficiency(state, action) {
			state.proficiency.value =  Math.floor( 2 + ((action.payload-1)/4) );
		},
		updateProficiencies(state, action) {
			for(let j=0;j<24;j++) {
				let skill = state.skills[j];
				let modifier = 0;
				if(skill.proficient === true) {
					modifier += state.proficiency.value;
					if(skill.expertise === true) {
						modifier += state.proficiency.value;
					}
				}
				else if(state.jackOfAllTrades === true) {
					modifier += Math.floor(state.proficiency.value/2)
				}
				skill.bonus = state.charAttributes.filter((attribute) => {return attribute.name === skill.supSkill})[0].bonus + modifier
			}
		},
		changeAC: {
			reducer(state, action) {
				if(action.payload.wearsArmor) {
					state.charAC.wearsArmor = true
					state.charAC.unarmoredDefense = false
					state.charAC.baseAC = parseInt(action.payload.baseAC)
					state.charAC.scalingPrimary = action.payload.scalingPrimary
					state.charAC.maxBonus = parseInt(action.payload.maxBonus)
					state.charAC.stealthDisadvantage = action.payload.stealthDisadvantage
				}
				/*{wearsArmor: false, unarmoredDefense: true, baseAC: event.target[1].value, scalingPrimary: event.target[2].value, scalingSecondary: event.target[3].value}*/
				else if(action.payload.unarmoredDefense) {
					state.charAC.wearsArmor = false
					state.charAC.unarmoredDefense = true
					state.charAC.baseAC = parseInt(action.payload.baseAC)
					state.charAC.scalingPrimary = action.payload.scalingPrimary
					state.charAC.scalingSecondary = action.payload.scalingSecondary
				}
			},
			prepare (data, id) {
                return {
                    payload: data,
                    id: id
                }
            }
		},
		computeAC(state, action) {
			let ACtest = 0
			if(state.charAC.unarmoredDefense) {
				ACtest = state.charAC.baseAC + state.charAttributes.filter(attribute => {return attribute.name === state.charAC.scalingPrimary})[0].bonus
				if(state.charAC.scalingSecondary != "None") {
					ACtest += state.charAttributes.filter(attribute => {return attribute.name === state.charAC.scalingSecondary})[0].bonus
				}
			}
			else if(state.charAC.wearsArmor) {
				let bonus = state.charAttributes.filter(attribute => {return attribute.name === state.charAC.scalingPrimary})[0].bonus
				ACtest = state.charAC.baseAC + (bonus > state.charAC.maxBonus ? state.charAC.maxBonus : bonus)
			}
			state.charAC.value = ACtest
		},
		changeInitiative: {
			reducer(state, action) {
				/*{scalingPrimary: event.target[0].value, scalingSecondary: event.target[1].value, flatBonus: event.target[2].value}*/
				state.initiative.scalingPrimary = action.payload.scalingPrimary
				state.initiative.scalingSecondary = action.payload.scalingSecondary
				state.initiative.flatBonus = parseInt(action.payload.flatBonus)
				computeInitiative()
			},
			prepare (data, id) {
                return {
                    payload: data,
                    id: id
                }
            }
		},
		computeInitiative(state, action) {
			state.initiative.value = 0 + (state.initiative.flatBonus)
			if(state.initiative.scalingPrimary != "None") {
				state.initiative.value += state.charAttributes.filter(attribute => {return attribute.name === state.initiative.scalingPrimary})[0].bonus
			}
			if(state.initiative.scalingSecondary != "None") {
				state.initiative.value += state.charAttributes.filter(attribute => {return attribute.name === state.initiative.scalingSecondary})[0].bonus
			}
		},
		computeHitDC(state, action) {
			let filteredAttribute = state.charAttributes.filter(attribute => {return attribute.name === state.casting.spellAttribute})
			if(filteredAttribute.length != 0) {
				state.casting.spellHit = parseInt(state.proficiency.value) + parseInt(filteredAttribute[0].bonus)
				state.casting.spellDC = 8 + state.casting.spellHit
			}
			else {
				state.casting.spellHit = parseInt(state.proficiency.value)
				state.casting.spellDC = 8 + state.casting.spellHit
			}
		},
		changeIsCaster(state, action) {
            state.casting.isCaster = action.payload
        },
        changeCastingAttribute(state, action) {
            state.casting.spellAttribute = action.payload
        },
        changeCasterType(state, action) {
            state.casting.type = action.payload
        },
		importAttributes(state, action) {
			let keys1 = Object.keys(state)
            keys1.forEach(key => 
                state[key] = action.payload[key]
            )
		}
    }
})

export default AttributeSlice.reducer
export const {changeAC, computeAC, 
	changeJackOfAllTrades, attributeChange2,
	proficiencyChange, addMiscProficiency, addProficiencyType, deleteMiscProficiency, updateProficiency, updateProficiencies, 
	changeInitiative, computeInitiative,
	computeHitDC, changeIsCaster, changeCasterType, changeCastingAttribute, importAttributes} = AttributeSlice.actions