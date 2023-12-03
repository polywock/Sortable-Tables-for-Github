import { Cell } from "../types"

function conversion(base: string) {
    return base.replace("squared", "sq").replace("square", "sq").replace("²", "sq")
        .replace(/(inches|inch)/, "in")
        .replace(/(feets?|foots?)/, "ft")
        .replace(/yards?/, "yd")
        .replace(/(miles|mile)/, "mi")
        .replace(/\s/g, "")
}


const unitMap = {
    sqin: 1,
    sqft: 12,
    sqyd: 36,
    sqmi: 72913,

    insq: 1,
    ftsq: 12,
    ydsq: 36,
    misq: 72913
}

export function asImperialArea(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const matchA = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:squared|square|sq|²)\s*(?:inches|inch|foots?|feets?|yards|miles|mile|mi|in|ft|yd))(?![a-z0-9])/.exec(cell.text)
        const matchB = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:inches|inch|foots?|feets?|yards|miles|mile|mi|in|ft|yd)\s*(?:²|squared|square|sq))(?![a-z0-9])/.exec(cell.text)
        const match = matchA ?? matchB 
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

