import { Cell } from "../types"
import { COMP_METRIC_AREA_A, COMP_METRIC_AREA_B, METRIC_DISTANCE_PARTS, SQUARED_PARTS, convert } from "./constants"
import { metricDistanceUnits } from "./metricDistance"


const conversion = (base: string) => convert([...METRIC_DISTANCE_PARTS, ...SQUARED_PARTS], base)


const unitMap = {
    sqmm: metricDistanceUnits.mm ** 2,
    sqcm: metricDistanceUnits.cm ** 2,
    sqm: metricDistanceUnits.m ** 2,
    sqkm: metricDistanceUnits.km ** 2,

    mmsq: metricDistanceUnits.mm ** 2,
    cmsq: metricDistanceUnits.cm ** 2,
    msq: metricDistanceUnits.m ** 2,
    kmsq: metricDistanceUnits.km ** 2,
}

export function asMetricArea(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const matchA = COMP_METRIC_AREA_A.exec(cell.text)
        const matchB = COMP_METRIC_AREA_B.exec(cell.text)
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