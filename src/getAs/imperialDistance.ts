import { Cell } from "../types"

function conversion(base: string) {
    return base
        .replace(/(inches|inch)/, "in")
        .replace(/(feets?|foots?)/, "ft")
        .replace(/yards?/, "yd")
        .replace(/(miles|mile)/, "mi")
        .replace(/\s/g, "")
}

const unitMap = {
    in: 1,
    ft: 12,
    yd: 36,
    mi: 63360
}

export function asImperialDistance(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*(inches|inch|feets?|foots?|yards?|miles|mile|in|ft|yd|mi)(?![a-z0-9])/.exec(cell.text)
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