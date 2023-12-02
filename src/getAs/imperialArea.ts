import { Cell } from "../types"

function conversion(base: string) {
    return base.replace("squared", "sq").replace("square", "sq").replace("²", "sq")
        .replace("inches", "in").replace("inch", "in")
        .replace("feets", "ft").replace("feet", "ft").replace("foot", "ft")
        .replace("yards", "yd").replace("yard", "yd")
        .replace("miles", "mi").replace("mile", "mi")
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
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:squared|square|sq|²)\s*(?:inches|inch|in|feets|foot|feet|ft|yards|yard|yd|miles|mile|mi))/.exec(cell.text)
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

export function asImperialAreaReverse(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:inches|inch|in|feets|foot|feet|ft|yards|yard|yd|miles|mile|mi)\s*(?:²|squared|square|sq))/.exec(cell.text)
        if (!match) continue 

        const unit = conversion(match[2])

        cell.number = parseFloat(match[1])
        cell.normal = unitMap[unit as keyof typeof unitMap] * cell.number  
        units.add(unit)
    }

    if (units.size >= 2) {
        return cells 
    }
}