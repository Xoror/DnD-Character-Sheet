import { isDesktop } from "../config"

export const initialStateActions = (nanoid) => {
    return {
        actions: [
            {id:nanoid, name: "Unarmed Attack", range: "Melee",  damage: 1, type: "Action", scaling: "Strength", isProficient: true, damageType:"Bludgeoning", description:"An attack with your fist, ellbow, head etc."},
        ],
        spells: [
        ],
        spellListImportStatues: "idle",
        sortedSpellList: [],
        highestSpellSlot: "1st",
        spellListAPI: []
    }
}

export const initialStateAttributes = (nanoid) => {
    return {
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
            {id: nanoid, name: "Strength Saving Throw", shortName: "Saving Throw", supSkill: "Strength", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name:"Athletics", shortName:"Athletic", supSkill: "Strength", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Dexterity Saving Throw", shortName: "Saving Throw", supSkill: "Dexterity", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name:"Acrobatics", shortName:"Acrobatics", supSkill: "Dexterity", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name:"Slight of Hand", shortName:"Slight of Hand", supSkill: "Dexterity", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name:"Stealth", shortName:"Stealth", supSkill: "Dexterity", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Constitution Saving Throw", shortName: "Saving Throw", supSkill: "Constitution", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Intelligence Saving Throw", shortName: "Saving Throw", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name:"Arcana", shortName:"Arcana", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name:"History", shortName:"History", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name:"Investigation", shortName:"Investigation", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name:"Nature", shortName:"Nature", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name:"Religion", shortName:"Religion", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Wisdom Saving Throw", shortName: "Saving Throw", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Animal Handling", shortName: "Animal Handling", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Insight", shortName: "Insight", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Medicine", shortName: "Medicine", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Perception", shortName: "Perception", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Survival", shortName: "Survival", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Charisma Saving Throw", shortName: "Saving Throw", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Deception", shortName: "Deception", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Intimidation", shortName: "Intimidation", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Performance", shortName: "Performance", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Persuasion", shortName: "Persuasion", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false, advantage: false, disadvantage: false},
            {id: nanoid, name: "Simple Weapons", shortName: "Simple Weapons", supSkill: "Weapon", bonus: "", proficient: false, expertise: false},
            {id: nanoid, name: "Martial Weapons", shortName: "Martial Weapons", supSkill: "Weapon", bonus: "", proficient: false, expertise: false},
            {id: nanoid, name: "Shield", shortName: "Shield", supSkill: "Weapon", bonus: "", proficient: false, expertise: false},
            {id: nanoid, name: "Light Armor", shortName: "Light Armor", supSkill: "Armor", bonus: "", proficient: false, expertise: false},
            {id: nanoid, name: "Medium Armor", shortName: "Medium Armor", supSkill: "Armor", bonus: "", proficient: false, expertise: false},
            {id: nanoid, name: "Heavy Armor", shortName: "Heavy Armor", supSkill: "Armor", bonus: "", proficient: false, expertise: false},
        ],
        proficienciesTypes: [
            {value: "weapon", label: "Weapon"}, 
            {value: "armor", label: "Armor"}, 
            {value: "tool", label: "Tool"}, 
            {value: "instrument", label: "Instrument"},
        ],
        proficiency: {id: "proficiency", name: "Proficiency", value: 2},
        charAC: {id: "AC", name: "AC", value: 10, baseAC: 10, scalingPrimary: "Dexterity", unarmoredDefense: true, scalingSecondary: "None", wearsArmor: false, maxBonus: 100, stealthDisadvantage: false},
        initiative: {id: "initiative", name: "Initiative", value: 0, scalingPrimary: "Dexterity", scalingSecondary: "None", flatBonus: 0 }
    }
}

export const initialStateCharDetails = (nanoid) => {
    return {
        charLevel: 1,
        charName: "",
        charClass: "",
        charSubclass: "",
        charLineage: "",
        charBackground: "",
        charExperience: 0,
        languages: [
            {id: nanoid, name:"Common"},
        ],
        senses: [
            {id: nanoid, name:"Darkvision", distance: 60},
            {id: nanoid, name:"Blindsight", distance: 30},
            {id: nanoid, name:"Truesight", distance: 20},
            {id: nanoid, name:"Tremor Sense", distance: 20}
        ],
        sensesHas: [

        ],
        resistances: [

        ],
        immunities: [

        ],
        vulnerabilities: [
            
        ]
    }
}

export const initialStateFeatures = {
    data: [
        {name: "Lineage Features", level: 1, featureClass: "-", featureSubclass: "-", description: "Placeholder"},
    ]
}

export const initialStateConditions = (nanoid) => {
    return {
        conditions: [
            {id: nanoid, name: "Blinded", description: "A blinded creature: \n can't see and automatically fails any ability check that requires sight. \n Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage."},
            {id: nanoid, name: "Charmed", description: "A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects. \n The charmer has advantage on any ability check to interact socially with the creature."},
            {id: nanoid, name: "Deafened", description: "A deafened creature can't hear and automatically fails any ability check that requires hearing."},
            {id: nanoid, name: "Frightened", description: "A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight. \n The creature can't willingly move closer to the source of its fear."},
            {id: nanoid, name: "Grappled", description: "A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed. \n The condition ends if the grappler is incapacitated. \n The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the thunderwave spell."},
            {id: nanoid, name: "Incapacitated", description: "A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed. \n The condition ends if the grappler is incapacitated. \n The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the thunderwave spell."},
            {id: nanoid, name: "Invisible", description: "An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature's location can be detected by any noise it makes or any tracks it leaves. \n Attack rolls against the creature have disadvantage, and the creature's attack rolls have advantage."},
            {id: nanoid, name: "Paralyzed", description: "A paralyzed creature is incapacitated and can't move or speak. \n The creature automatically fails Strength and Dexterity saving throws. \n Attack rolls against the creature have advantage. \n Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."},
            {id: nanoid, name: "Petrified", description: "A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging. \n The creature is incapacitated, can't move or speak, and is unaware of its surroundings. \n Attack rolls against the creature have advantage. \n The creature automatically fails Strength and Dexterity saving throws. \n The creature has resistance to all damage. \n The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized."},
            {id: nanoid, name: "Poisoned", description: "A poisoned creature has disadvantage on attack rolls and ability checks."},
            {id: nanoid, name: "Prone", description: "A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition. \n The creature has disadvantage on attack rolls. \n An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage."},
            {id: nanoid, name: "Restrained", description: "A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed. \n Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage. \n The creature has disadvantage on Dexterity saving throws."},
            {id: nanoid, name: "Stunned", description: "A stunned creature is incapacitated, can't move, and can speak only falteringly. \n The creature automatically fails Strength and Dexterity saving throws. \n Attack rolls against the creature have advantage."},
            {id: nanoid, name: "Unconscious", description: "An unconscious creature is incapacitated, can't move or speak, and is unaware of its surroundings. \n The creature drops whatever it's holding and falls prone. \n The creature automatically fails Strength and Dexterity saving throws. \n Attack rolls against the creature have advantage. \n Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."}
        ],
        conditionsHas: [

        ],
        exhaustion: {name: "Exhaustion", level: 0, effects: ["Disadvantage on ability checks", "Speed halved", "Disadvantage on attack rolls and saving throws", "Hit point maximum halved", "Speed reduced to 0", "Death"]}
    }
}

export const initialStateInventory = (nanoid) => {
    return {
        inventory: [
            {
                filtered:true, 
                id: nanoid, 
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
        currency: {platinum: 0, gold: 0, electrum: 0, silver: 0, copper: 0},
        startingItems: {}
    }
}

export const initialStateLandingPage = {
    todos: {
        big: [],
        medium: [],
        small: []
    },
    todosUpdated: "Never",
    news: [
    ],
    newsUpdated: "Never"
}

export const initialStateMiscAttributes = {
	speed: {name: "Speed", value: 30, ground: 30, swim: 15, climb: 15, fly: 0, displayed: "Ground"},
    charHP: {current: '', max: '', temp: '',}
}

export const initialStateNavBar = {
    characters: {names: [""], id: [""], status: "idle"},
    importFromDbStatus: "idle",
    addCharactertoDBStatus: "idle",
    changeCharacterInDBStatus: "idle",
    currentlyEditing: {id: 0, name: "None"},
    lastSaved: "Never",
    compareState: {},
}

export const initialStateNotes = {
    data: []
}

export const initialStateResources = {
    data: [
        {name: "Hit Points", current: 1, maximum: 1, dice: ""}
    ]
}

export const initialStateSettings = {
    autoSaveTimer: 15,
    desktop: isDesktop,
    diceLog: []
}

export const initialStateSpells = {
	spellSlots: [
		[false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false],
		[false, false, false, false, false],
		[false]
	],
}

export const initialState = (nanoid) => {
    return {
        actions: initialStateActions(nanoid),
        features: initialStateFeatures,
        attributes: initialStateAttributes(nanoid),
        inventory: initialStateInventory(nanoid),
        miscAttributes: initialStateMiscAttributes,
        notes: initialStateNotes,
        charDetails: initialStateCharDetails(nanoid),
        spells: initialStateSpells,
        resources: initialStateResources,
        conditions: initialStateConditions(nanoid),
        navBar: initialStateNavBar,
        settings: initialStateSettings,
        landingPage: initialStateLandingPage
    }
}