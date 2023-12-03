import { Cell } from "../types"

function conversion(base: string) {
    return base
        .replace(/milligrams?/, "mg")
        .replace(/centigrams?/, "cg")
        .replace(/decigrams?/, "dg")
        .replace(/decagrams?/, "dag")
        .replace(/hectograms?/, "hg")
        .replace(/kilograms?/, "kg")
        .replace(/kilos?/, "kg")
        .replace(/tons?/, "ton")
        .replace(/grams?/, "g")
        .replace(/\s/g, "")
}

const unitMap = {
    mg: 1,
    cg: 10,
    dg: 100,
    g: 1000,
    dag: 10000,
    hg: 100000,
    kg: 1000000,
    ton: 1000000000,
}

export function asMetricWeight(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*(milligrams?|centigrams?|decigrams?|decagras|hectograms?|kilograms?|kilos?|tons?|grams?|mgs?|cg|dg|g|dag|hg|kgs?)(?![a-z0-9])/.exec(cell.text)
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