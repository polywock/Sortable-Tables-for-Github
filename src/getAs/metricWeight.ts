import { Cell } from "../types"
import { COMP_METRIC_WEIGHT_A, IMPERIAL_WEIGHT_PARTS, convert } from "./constants"

const conversion = (base: string) => convert([...IMPERIAL_WEIGHT_PARTS], base)

const unitMap = {
    mg: 1,
    cg: 10,
    dg: 100,
    g: 1000,
    dag: 10000,
    hg: 100000,
    kg: 1000000,
    ton: 1000000000,
}

export function asMetricWeight(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = COMP_METRIC_WEIGHT_A.exec(cell.text)
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