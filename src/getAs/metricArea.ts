import { Cell } from "../types"

function conversion(base: string) {
    return base.replace("squared", "sq").replace("square", "sq").replace("²", "sq")
        .replace("millimeters", "mm").replace("millimeter", "mm")
        .replace("centimeters", "cm").replace("centimeter", "cm")
        .replace("kilometers", "km").replace("kilometer", "km")
        .replace("meters", "m").replace("meter", "m")
        .replace(/\s/g, "")
}


const unitMap = {
    sqmm: 1,
    sqcm: 100,
    sqm: 1000000,
    sqkm: 1000000000000,

    mmsq: 1,
    cmsq: 100,
    msq: 1000000,
    kmsq: 1000000000000,
}

export function asMetricArea(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:squared|square|sq|²)\s*(?:millimeter|centimeter|kilometer|meter|mm|cm|km|m))/.exec(cell.text)
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

export function asMetricAreaReverse(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:millimeters|millimeter|centimeters|centimeter|kilometers|kilometer|meters|meter|mm|cm|km|m)\s*(?:²|squared|square|sq))/.exec(cell.text)
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