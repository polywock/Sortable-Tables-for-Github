import { Cell } from "../types"

function conversion(base: string) {
    return base.replace("cubed", "cb").replace("cube", "cb").replace("³", "cb")
        .replace("millimeters", "mm").replace("millimeter", "mm")
        .replace("centimeters", "cm").replace("centimeter", "cm")
        .replace("kilometers", "km").replace("kilometer", "km")
        .replace("meters", "m").replace("meter", "m")
        .replace(/\s/g, "")
}


const unitMap = {
    cbmm: 1,
    cbcm: 1000,
    cbm: 1000000000,
    cbkm: 1000000000000000000,

    mmcb: 1,
    cmcb: 1000,
    mcb: 1000000000,
    kmcb: 1000000000000000000
}

export function asMetricVolume(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:cubed|cube|cb|³)\s*(?:millimeter|centimeter|kilometer|meter|mm|cm|km|m))/.exec(cell.text)
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

export function asMetricVolumeReverse(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:millimeters|millimeter|centimeters|centimeter|kilometers|kilometer|meters|meter|mm|cm|km|m)\s*(?:³|cubed|cube|cb))/.exec(cell.text)
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