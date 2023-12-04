import { Cell } from "../types"

function conversion(base: string) {
    return base
        .replace("millimeters", "mm").replace("millimeter", "mm")
        .replace("centimeters", "cm").replace("centimeter", "cm")
        .replace("kilometers", "km").replace("kilometer", "km")
        .replace("meters", "m").replace("meter", "m")
        .replace(/\s/g, "")
}

const unitMap = {
    mm: 1,
    cm: 10,
    m: 1000,
    km: 1000000
}

export function asMetricDistance(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*(millimeters?|centimeters?|kilometers?|meters?|mm|cm|km|m)(?![a-z0-9])/.exec(cell.text)
        if (!match) continue 
        const unit = conversion(match[2])
        const scalar = unitMap[unit as keyof typeof unitMap]
        if (!scalar) continue 

        cell.number = parseFloat(match[1])
        cell.normal = scalar * cell.number  
        units.add(unit)
    }

    units.delete("m")
    if (units.size >= 2) {
        return cells 
    }
}