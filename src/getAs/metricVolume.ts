import { Cell } from "../types"

function conversion(base: string) {
    return base.replace("cubed", "cb").replace("cubic", "cb").replace("cube", "cb").replace("³", "cb")
        .replace(/millimeters?/, "mm")
        .replace(/centimeters?/, "cm")
        .replace(/kilometers?/, "km")
        .replace(/meters?/, "m")
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
        const matchA = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:cubed|cubic|cube|cb|³)\s*(?:millimeters?|centimeters?|kilometers?|meters?|mm|cm|km|m))(?![a-z0-9])/.exec(cell.text)
        const matchB = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:millimeters?|centimeters?|kilometers?|meters?|mm|cm|km|m)\s*(?:³|cubed|cubic|cube|cb))(?![a-z0-9])/.exec(cell.text)
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