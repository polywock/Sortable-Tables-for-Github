import { Cell } from "../types"
import { COMP_IMPERIAL_DISTANCE_A, IMPERIAL_DISTANCE_PARTS, convert } from "./constants"

const conversion = (base: string) => convert([...IMPERIAL_DISTANCE_PARTS], base)

export const imperialDistanceUnits = {
    in: 1,
    ft: 12,
    yd: 36,
    mi: 63360
}

export function asImperialDistance(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = COMP_IMPERIAL_DISTANCE_A.exec(cell.text)
        if (!match) continue 
        const unit = conversion(match[2])
        const scalar = imperialDistanceUnits[unit as keyof typeof imperialDistanceUnits]
        if (!scalar) continue 

        cell.number = parseFloat(match[1])
        cell.normal = scalar * cell.number  
        units.add(unit)
    }

    if (units.size >= 2) {
        return cells 
    }
}