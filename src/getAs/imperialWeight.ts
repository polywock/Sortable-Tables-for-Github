import { Cell } from "../types"

function conversion(base: string) {
    return base
        .replace(/pounds?/, "lb")
        .replace(/lbs/, "lb")
        .replace(/tons/, "ton")
        .replace(/(ounces|ounce)/, "oz")
        .replace(/\s/g, "")
}

const unitMap = {
    oz: 1,
    lb: 16,
    ton: 2000
}

export function asImperialWeight(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*(tons?|pounds?|ounces|ounce|lbs?|oz)(?![a-z0-9])/.exec(cell.text)
        if (!match) continue 
        const unit = conversion(match[2])
        const scalar = unitMap[unit as keyof typeof unitMap]
        if (!scalar) continue 

        cell.number = parseFloat(match[1])
        cell.normal = scalar * cell.number  
        units.add(unit)
    }

    if (units.size >= 2) {
        return cells 
    }
}