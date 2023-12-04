import { Cell } from "../types"
import { COMP_IMPERIAL_WEIGHT_A, IMPERIAL_WEIGHT_PARTS, convert } from "./constants"

const conversion = (base: string) => convert([...IMPERIAL_WEIGHT_PARTS], base)

const unitMap = {
    oz: 1,
    lb: 16,
    ton: 2000
}

export function asImperialWeight(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = COMP_IMPERIAL_WEIGHT_A.exec(cell.text)
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