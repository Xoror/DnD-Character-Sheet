export const parseSpellAPIResponse = (spell, scaling, id) => {
    const listSlots = ["cantrip", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
    const returnSpellslot = (number) => {
        if(number === 0) {
            return "Cantrip"
        }
        else {
            return listSlots[parseInt(number)]
        }
    }
    const prepareDescription = (desc, higher_level) => {
        if(higher_level.length === 0) {
            if( desc[desc.length - 1].includes("5th level") ) {
                return [desc.slice(0, desc.length-1), desc[desc.length - 1]]
            }
            else {
                return [desc, "-"]
            }
        }
        else {
            return [desc, higher_level]
        }
    }
    return {
        id: id, 
        name: spell.name, 
        range: spell.range, 
        damage: spell.damage === undefined ? 
            (spell.heal_at_slot_level === undefined ? "None" : spell.heal_at_slot_level[spell.level+1]) 
                : 
            (spell.level === 0 ? spell.damage.damage_at_character_level[spell.level+1] : spell.damage.damage_at_slot_level[spell.level]), 
        damageAtHigherLevel: spell.damage === undefined ? 
            (spell.heal_at_slot_level === undefined ? "None" : spell.heal_at_slot_level) 
                : 
            (spell.level === 0 ? spell.damage.damage_at_character_level : spell.damage.damage_at_slot_level),
        type: returnSpellslot(spell.level), 
        scaling: scaling === "" || scaling === undefined ? "None": scaling, 
        isPrepared: false, 
        damageType: spell.damage === undefined ? 
            (spell.heal_at_slot_level === undefined ? "None" : "Heal") 
                : 
            (spell.damage.damage_type === undefined ? "None": spell.damage.damage_type.name), 
        description: prepareDescription(spell.desc, spell.higher_level),
        school: spell.school.name, 
        ritual: spell.ritual, 
        classes: spell.classes, 
        components: spell.components,
        duration: [spell.duration, spell.concentration], 
        castingTime: spell.casting_time
    }
}

export const parseItemAPIResponse = (item, id, header, selectedContainer = "", addItemCounter= "", add = "") => {
    let temp = {}
    temp["isEquipped"] = false
    if (header === "Mundane Items") {
        temp["id"] = id
        temp["name"] = item.name
        temp["qty"] = item.quantity === undefined ? 1 : item.quantity
        if(item.cost.unit === "gp") {
            temp["worth"] = item.cost.quantity
        }
        else if(item.cost.unit === "sp") {
            temp["worth"] = item.cost.quantity/10
        }
        else if(item.cost.unit === "cp") {
            temp["worth"] = item.cost.quantity/100
        }
        temp["weight"] = item.weight != undefined ? item.weight : 0
        temp["rarity"] = "Mundane"
        temp["attunable"] = false
        temp["description"] = item.desc
        if(item.equipment_category.index === "equipment-packs") {
            temp["category"] = "Other"
        }
        else if(item.equipment_category.index === "kits") {
            temp["category"] = "Other"
        }
        else if(item.equipment_category.index === "weapon") {
            temp["category"] = item.weapon_category + " " + item.weapon_range + " Weapon";
        }
        else if(item.equipment_category.index === "armor") {
            temp["category"] = item.armor_category === "Shield" ? "Shield" : item.armor_category + " Armor";
        }

        else if(item.equipment_category.index === "mounts-and-vehicles") {
            if(item.vehicle_category === "mounts-and-other-animals") {
                temp["category"] = "Vehicle (Land)";
            }
            else if(item.vehicle_category === "Waterborne Vehicles") {
                temp["category"] = "Vehicle (Water)";
            }
            else {
                temp["category"] = "Vehicle (Land)";
            }
          }

        else if(item.equipment_category.index === "mounts-and-other-animals") {
            temp["category"] = "Other";
        }
        else if(item.equipment_category.index === "other-tools") {
            temp["category"] = "Other";
        }
        else if(item.equipment_category.index === "shields") {
            temp["category"] = "Shield";
        }
        else if(item.equipment_category.index === "tools") {
            if(item.tool_category === "Gaming Sets") {
                temp["category"] = "Gaming Set";
            }
            else if(item.tool_category === "Musical Instrument") {
                temp["category"] = "Instrument";
            }
            else if(item.tool_category === "Artisan's Tools") {
                temp["category"] = "Artisan's Tools";
            }
            else {
                temp["category"] = item.tool_category;
            }
          }
        else {
            temp["category"] = item.equipment_category.name
        }
        if(item.gear_category != undefined ? item.gear_category.name === "Ammunition" : false) {
            temp["category"] = "Ammunition";
        }
        if(item.gear_category != undefined ? item.gear_category.name === "Arcane Foci" : false) {
            temp["category"] = "Arcane Focus";
        }
        if(item.gear_category != undefined ? item.gear_category.name === "Druidic Foci" : false) {
            temp["category"] = "Druidic Focus";
        }
        if(item.gear_category != undefined ? item.gear_category.name === "Holy Symbols" : false) {
            temp["category"] = "Holy Symbol";
        }
    }
    else if (header === "Wondrous Items") {
        temp["id"] = id
        temp["name"] = item.name
        temp["qty"] = item.quantity === undefined ? 1 : item.quantity
        temp["worth"] = "-"
        temp["weight"] = "-"
        let descSplit = item.desc[0].split(",")
        let descSplitSpace = descSplit[1].split(" ")
        let paranthesisIndex1 = descSplit[1].indexOf("(")
        let paranthesisIndex2 = descSplit[1].indexOf(")")
        temp["rarity"] = item.rarity.name
        temp["attunable"] = item.desc[0].includes("requires attunement") ? true : false
        temp["attuneRequirement"] = !temp["attunable"] ? "bla" : descSplit[1].slice(paranthesisIndex1 + 1, paranthesisIndex2)
        temp["description"] = item.desc
        temp["category"] = "Wondrous Item"
    }
    
    if(add === "addItemList") {
        temp["container"] = selectedContainer
        temp["qty"] = addItemCounter
        if(temp["worth"] === "-") {
            temp["worth"] = 0
        }
        if(temp["weight"] === "-") {
            temp["weight"] = 0
        }
        //dispatch(addItem(temp))
    }
    else if(false) {
        temp["id"] = item.name
    }
    return temp
    //setCurrentItem(temp)
}