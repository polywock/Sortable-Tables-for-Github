import { Cell } from "../types"
import { COMP_IMPERIAL_AREA_A, COMP_IMPERIAL_AREA_B, IMPERIAL_DISTANCE_PARTS, SQUARED_PARTS, convert } from "./constants"
import { imperialDistanceUnits } from "./imperialDistance"

const conversion = (base: string) => convert([...IMPERIAL_DISTANCE_PARTS, ...SQUARED_PARTS], base)

const unitMap = {
    sqin: imperialDistanceUnits.in ** 2,
    sqft: imperialDistanceUnits.ft ** 2,
    sqyd: imperialDistanceUnits.yd ** 2,
    sqmi: imperialDistanceUnits.mi ** 2,

    insq: imperialDistanceUnits.in ** 2,
    ftsq: imperialDistanceUnits.ft ** 2,
    ydsq: imperialDistanceUnits.yd ** 2,
    misq: imperialDistanceUnits.mi ** 2,
}

export function asImperialArea(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const matchA = COMP_IMPERIAL_AREA_A.exec(cell.text)
        const matchB = COMP_IMPERIAL_AREA_B.exec(cell.text)
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

