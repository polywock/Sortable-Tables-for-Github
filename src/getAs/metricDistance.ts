import { Cell } from "../types"
import { COMP_METRIC_DISTANCE_A, METRIC_DISTANCE_PARTS, convert } from "./constants"

const conversion = (base: string) => convert([...METRIC_DISTANCE_PARTS], base)

export const metricDistanceUnits = {
    mm: 1,
    cm: 10,
    m: 1000,
    km: 1000000
}

export function asMetricDistance(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = COMP_METRIC_DISTANCE_A.exec(cell.text)
        if (!match) continue 
        const unit = conversion(match[2])
        const scalar = metricDistanceUnits[unit as keyof typeof metricDistanceUnits]
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