import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import actionsReducer from "../features/actions/ActionsSlice"
import featuresReducer from "../features/classFeatures/FeaturesSlice"
import inventoryReducer from "../features/inventory/InventorySlice"
import attributesReducer from "../features/attributes/AttributesSlice"
import miscAttributesReducer from "../features/miscAttributes/MiscAttributesSlice"
import notesReducer from "../features/notes/NotesSlice"
import charDetailsReducer from "../features/charDetails/CharDetailsSlice"
import spellsReducer from "../features/spells/SpellSlice"
import resourcesReducer from "../features/resources/ResourcesSlice"
import conditionsReducer from "../features/conditions/ConditionsSlice"
import navBarReducer from "../features/nav/NavBarSlice"
import settingsReducer from "../features/settings/SettingsSlice"
import landingPageReducer from "../features/landingPage/LandingPageSlice"

const appReducer = combineReducers({
	actions: actionsReducer,
	features: featuresReducer,
	attributes: attributesReducer,
	inventory: inventoryReducer,
	miscAttributes: miscAttributesReducer,
	notes: notesReducer,
	charDetails: charDetailsReducer,
	spells: spellsReducer,
	resources: resourcesReducer,
	conditions: conditionsReducer,
	navBar: navBarReducer,
	settings: settingsReducer,
	landingPage: landingPageReducer
})

const rootReducer = (state, action) => {
	if(action.type === 'import/state') {
		return appReducer(action.payload, action)
	}
	return appReducer(state, action)
}

const emptyState = {
	"actions": {
		"actions": [
			{
				"id": "XfeLXBjC4jSw1-xvRyGb2",
				"name": "Unarmed Attack",
				"range": "Melee",
				"damage": 1,
				"type": "Action",
				"scaling": "Strength",
				"isProficient": true,
				"damageType": "Bludgeoning",
				"description": "An attack with your fist, ellbow, head etc."
			}
		],
		"spells": [],
		"spellListImportStatues": "idle",
		"sortedSpellList": [],
		"highestSpellSlot": "1st",
		"spellListAPI": []
	},
	"features": {
		"data": [
			{
				"name": "Lineage Features",
				"level": 1,
				"featureClass": "-",
				"featureSubclass": "-",
				"description": "Placeholder"
			}
		]
	},
	"attributes": {
		"casting": {
			"isCaster": true,
			"type": "",
			"spellAttribute": "",
			"spellHit": 2,
			"spellDC": 10
		},
		"charAttributes": [
			{
				"id": "Strength",
				"name": "Strength",
				"value": 10,
				"bonus": 0
			},
			{
				"id": "Dexterity",
				"name": "Dexterity",
				"value": 10,
				"bonus": 0
			},
			{
				"id": "Constitution",
				"name": "Constitution",
				"value": 10,
				"bonus": 0
			},
			{
				"id": "Intelligence",
				"name": "Intelligence",
				"value": 10,
				"bonus": 0
			},
			{
				"id": "Wisdom",
				"name": "Wisdom",
				"value": 10,
				"bonus": 0
			},
			{
				"id": "Charisma",
				"name": "Charisma",
				"value": 10,
				"bonus": 0
			}
		],
		"jackOfAllTrades": false,
		"skills": [
			{
				"id": "a8bziEYSFzmqopnBsvBA7",
				"name": "Strength Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Strength",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "w6gxQfhhuTEgGKkuqs8oi",
				"name": "Athletics",
				"shortName": "Athletic",
				"supSkill": "Strength",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "J5nvCkGQnc_PGgHca7tqW",
				"name": "Dexterity Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Dexterity",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "eAMhmmmOQJCcP8tWIkmdY",
				"name": "Acrobatics",
				"shortName": "Acrobatics",
				"supSkill": "Dexterity",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "G97JGFp--sxGWj7YNEOMJ",
				"name": "Slight of Hand",
				"shortName": "Slight of Hand",
				"supSkill": "Dexterity",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "VXCd7L2uhs_WTQzJp9ec3",
				"name": "Stealth",
				"shortName": "Stealth",
				"supSkill": "Dexterity",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "k5vnOYDJDsURObm5O5Kl8",
				"name": "Constitution Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Constitution",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "b9syxbvWWFRsZgQmpcIIq",
				"name": "Intelligence Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "jYJsSBWhqpe05GuAHiBNY",
				"name": "Arcana",
				"shortName": "Arcana",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "93FwcDrmtnOjSIAyLHV9Q",
				"name": "History",
				"shortName": "History",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "x9jacrai7IVuvjgwHEh5-",
				"name": "Investigation",
				"shortName": "Investigation",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "kwe14xca0p-p0MqoYfbS6",
				"name": "Nature",
				"shortName": "Nature",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "ZMb8_itPxMaKYLsjTqN5r",
				"name": "Religion",
				"shortName": "Religion",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "DxloWmpLVaeVNvLzlBQz4",
				"name": "Wisdom Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "EWgpGpIW4vFlETdtnI4dk",
				"name": "Animal Handling",
				"shortName": "Animal Handling",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "D0wpQ53QSwukb2agWHuqO",
				"name": "Insight",
				"shortName": "Insight",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "vuIELl1IEMVDCbklrL-wW",
				"name": "Medicine",
				"shortName": "Medicine",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "7GibTJq-EAMEcqAaNbVY0",
				"name": "Perception",
				"shortName": "Perception",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "E7meUGKr3e_Jr-Y_rt6_c",
				"name": "Survival",
				"shortName": "Survival",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "YODVq1yxztLNMEx3F-Lih",
				"name": "Charisma Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "OPqKmPmJEkxRLnJ5aS0oL",
				"name": "Deception",
				"shortName": "Deception",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "5q42RXexuBnaxdTD9aQWe",
				"name": "Intimidation",
				"shortName": "Intimidation",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "BkTjZrOhyNsr1GIYWbSAS",
				"name": "Performance",
				"shortName": "Performance",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "iyNgxl4F_sYgDwtN0W_Jf",
				"name": "Persuasion",
				"shortName": "Persuasion",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "Rg2kmQnqdH3iRXSrllW0M",
				"name": "Simple Weapons",
				"shortName": "Simple Weapons",
				"supSkill": "Weapon",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "bwm0aCi-TcSqC15VWECIv",
				"name": "Martial Weapons",
				"shortName": "Martial Weapons",
				"supSkill": "Weapon",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "M4ghuix9AXYHINhrEOFuG",
				"name": "Shield",
				"shortName": "Shield",
				"supSkill": "Weapon",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "3EGXCz0MbFRgsJeUrnLli",
				"name": "Light Armor",
				"shortName": "Light Armor",
				"supSkill": "Armor",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "6wk3E-o3A-LbQ4EqkhKME",
				"name": "Medium Armor",
				"shortName": "Medium Armor",
				"supSkill": "Armor",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "L-UtOQ4JjT_59A87YoJl4",
				"name": "Heavy Armor",
				"shortName": "Heavy Armor",
				"supSkill": "Armor",
				"bonus": "",
				"proficient": false,
				"expertise": false
			}
		],
		"proficienciesTypes": [
			{
				"value": "weapon",
				"label": "Weapon"
			},
			{
				"value": "armor",
				"label": "Armor"
			},
			{
				"value": "tool",
				"label": "Tool"
			},
			{
				"value": "instrument",
				"label": "Instrument"
			}
		],
		"proficiency": {
			"id": "proficiency",
			"name": "Proficiency",
			"value": 2
		},
		"charAC": {
			"id": "AC",
			"name": "AC",
			"value": 10,
			"baseAC": 10,
			"scalingPrimary": "Dexterity",
			"unarmoredDefense": true,
			"scalingSecondary": "None",
			"wearsArmor": false,
			"maxBonus": 100,
			"stealthDisadvantage": false
		},
		"initiative": {
			"id": "initiative",
			"name": "Initiative",
			"value": 0,
			"scalingPrimary": "Dexterity",
			"scalingSecondary": "None",
			"flatBonus": 0
		}
	},
	"inventory": {
		"inventory": [
			{
				"filtered": true,
				"id": "DDrh9WmB4AaHy91L_y0Cs",
				"name": "Test",
				"container": "equipment",
				"category": "Weapon",
				"qty": 1,
				"worth": 2,
				"weight": 3,
				"isEquipped": false,
				"rarity": "Common",
				"attunable": false,
				"attuned": false,
				"attuneRequirement": "requires attunment by a druid",
				"description": [
					"This is a test, a meddle of strength"
				]
			}
		],
		"containers": [
			{
				"id": "equipment",
				"value": "equipment",
				"label": "Equipment",
				"weight": 0
			}
		],
		"weight": 0,
		"currency": {
			"platinum": 0,
			"gold": 0,
			"electrum": 0,
			"silver": 0,
			"copper": 0
		},
		"startingItems": {}
	},
	"miscAttributes": {
		"speed": {
			"name": "Speed",
			"value": 30,
			"ground": 30,
			"swim": 15,
			"climb": 15,
			"fly": 0,
			"displayed": "Ground"
		},
		"charHP": {
			"current": "",
			"max": "",
			"temp": ""
		}
	},
	"notes": {
		"data": []
	},
	"charDetails": {
		"charLevel": 1,
		"charName": "",
		"charClass": "",
		"charSubclass": "",
		"charLineage": "",
		"charBackground": "",
		"charExperience": 0,
		"languages": [
			{
				"id": "Ojbo9bGpH6cpWVC7w914R",
				"name": "Common"
			}
		],
		"senses": [
			{
				"id": "WRt3G27tjyEvVR2VKUum8",
				"name": "Darkvision",
				"distance": 60
			},
			{
				"id": "G-zIllhH1wUQ7MQ7iFcHZ",
				"name": "Blindsight",
				"distance": 30
			},
			{
				"id": "u9tJlKqTGf03oIjRXSay4",
				"name": "Truesight",
				"distance": 20
			},
			{
				"id": "Tr667dMn8iZ8Ydkq1bvQQ",
				"name": "Tremor Sense",
				"distance": 20
			}
		],
		"sensesHas": [],
		"resistances": [],
		"immunities": [],
		"vulnerabilities": []
	},
	"spells": {
		"spellSlots": [
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false
			],
			[
				false,
				false,
				false,
				false,
				false
			],
			[
				false
			]
		]
	},
	"resources": {
		"data": [
			{
				"name": "Hit Points",
				"current": "",
				"maximum": "",
				"dice": ""
			}
		]
	},
	"conditions": {
		"conditions": [
			{
				"id": "jEx4OSKYNEmv2bsYK5h48",
				"name": "Blinded",
				"description": "A blinded creature: \n can't see and automatically fails any ability check that requires sight. \n Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage."
			},
			{
				"id": "a1LJFqJdHQAxL_JbCrWBg",
				"name": "Charmed",
				"description": "A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects. \n The charmer has advantage on any ability check to interact socially with the creature."
			},
			{
				"id": "oseX5c8t04-3vSEy-4dYv",
				"name": "Deafened",
				"description": "A deafened creature can't hear and automatically fails any ability check that requires hearing."
			},
			{
				"id": "zXwVVMZhTQinGTd1npP86",
				"name": "Frightened",
				"description": "A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight. \n The creature can't willingly move closer to the source of its fear."
			},
			{
				"id": "PqPPcw6mebvKesjM_KA8X",
				"name": "Grappled",
				"description": "A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed. \n The condition ends if the grappler is incapacitated. \n The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the thunderwave spell."
			},
			{
				"id": "eQJ-ldwCxIHzd3v17fkSq",
				"name": "Incapacitated",
				"description": "A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed. \n The condition ends if the grappler is incapacitated. \n The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the thunderwave spell."
			},
			{
				"id": "GU2xtdMPqQY4c4l2tE3DY",
				"name": "Invisible",
				"description": "An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature's location can be detected by any noise it makes or any tracks it leaves. \n Attack rolls against the creature have disadvantage, and the creature's attack rolls have advantage."
			},
			{
				"id": "Rhfb-J6_SIeu7RoSkLzw-",
				"name": "Paralyzed",
				"description": "A paralyzed creature is incapacitated and can't move or speak. \n The creature automatically fails Strength and Dexterity saving throws. \n Attack rolls against the creature have advantage. \n Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
			},
			{
				"id": "9qpfsjpurU6fProTHd930",
				"name": "Petrified",
				"description": "A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging. \n The creature is incapacitated, can't move or speak, and is unaware of its surroundings. \n Attack rolls against the creature have advantage. \n The creature automatically fails Strength and Dexterity saving throws. \n The creature has resistance to all damage. \n The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized."
			},
			{
				"id": "FubFpV1HLgy4zLXJCtR-B",
				"name": "Poisoned",
				"description": "A poisoned creature has disadvantage on attack rolls and ability checks."
			},
			{
				"id": "jI7pQYke68-U-7DKQyuI-",
				"name": "Prone",
				"description": "A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition. \n The creature has disadvantage on attack rolls. \n An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage."
			},
			{
				"id": "Faj1EIbX820QLDcjonnOb",
				"name": "Restrained",
				"description": "A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed. \n Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage. \n The creature has disadvantage on Dexterity saving throws."
			},
			{
				"id": "SeTPfZFeGLEQ50ALlIbDc",
				"name": "Stunned",
				"description": "A stunned creature is incapacitated, can't move, and can speak only falteringly. \n The creature automatically fails Strength and Dexterity saving throws. \n Attack rolls against the creature have advantage."
			},
			{
				"id": "PpKRZmWJ4UgSJ19i3hMF3",
				"name": "Unconscious",
				"description": "An unconscious creature is incapacitated, can't move or speak, and is unaware of its surroundings. \n The creature drops whatever it's holding and falls prone. \n The creature automatically fails Strength and Dexterity saving throws. \n Attack rolls against the creature have advantage. \n Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
			}
		],
		"conditionsHas": [],
		"exhaustion": {
			"name": "Exhaustion",
			"level": 0,
			"effects": [
				"Disadvantage on ability checks",
				"Speed halved",
				"Disadvantage on attack rolls and saving throws",
				"Hit point maximum halved",
				"Speed reduced to 0",
				"Death"
			]
		}
	},
	"navBar": {
		"characters": {
			"names": [
				""
			],
			"id": [
				""
			],
			"status": "idle"
		},
		"importFromDbStatus": "idle",
		"addCharactertoDBStatus": "idle",
		"changeCharacterInDBStatus": "idle",
		"currentlyEditing": {
			"id": 0,
			"name": "None"
		},
		"lastSaved": "Never",
		"compareState": {}
	},
	"settings": {
		"autoSaveTimer": 15,
		"desktop": false
	},
	"landingPage": {
		"todos": {
			"big": [],
			"medium": [],
			"small": []
		},
		"todosUpdated": "Never",
		"news": [],
		"newsUpdated": "Never"
	}
}
function loadState ()  {
	console.log("initiate loading state")
	const serializedStateTest = JSON.parse(window.sessionStorage.getItem("dnd-sheet-state"))
	if(serializedStateTest === null || serializedStateTest === undefined) {
		return {reducer: rootReducer}
	}
	else {
		if(!serializedStateTest.settings.desktop) {
			console.log("loading state")
			return {reducer: rootReducer, preloadedState: serializedStateTest}
		}
	}
	/*
	try {
		const serializedState = window.localStorage.getItem("dnd-sheet-state");
		console.log("loading state", JSON.parse(serializedState.charDetails))
		if (!serializedState) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (e) {
	  return undefined;
	}
	*/
  }

  export const configureStoreAsync = () => {
	return new Promise((resolve, reject) => {
		let preloadedStateLocal = loadState()
		console.log(preloadedStateLocal)
		let store = configureStore({reducer: rootReducer, preloadedState: preloadedStateLocal})
		resolve(store)
	})
  }
  const saveStateAsync = (state, url) => {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: "POST",
			headers: { "Content-Type":"application/json"},
			body: JSON.stringify(state)
		})
		.then(r => r.json())
		.then(res => resolve(res))
	})
  }

const store = configureStore(
    loadState()
)

export default store




