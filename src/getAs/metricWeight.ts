import { Cell } from "../types"

function conversion(base: string) {
    return base
        .replace("milligrams", "mg").replace("milligram", "mg")
        .replace("centigrams", "cg").replace("centigram", "cg")
        .replace("decigrams", "dg").replace("decigram", "dg")
        .replace("decagras", "dag").replace("decagram", "dag")
        .replace("hectograms", "hg").replace("hectogram", "hg")
        .replace("kilograms", "kg").replace("kilogram", "kg").replace("kilo", "kg")
        .replace("tons", "ton")
        .replace("grams", "g").replace("gram", "g")
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
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*(milligram|centigram|decigram|decagras|hectogram|kilogram|ton|gram|mg|cg|dg|g|dag|hg|kg)/.exec(cell.text)
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