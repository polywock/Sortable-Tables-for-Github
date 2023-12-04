import { Cell } from "../types"
import { COMP_METRIC_VOL_A, COMP_METRIC_VOL_B, COMP_METRIC_VOL_C, CUBIC_PARTS, METRIC_DISTANCE_PARTS, METRIC_VOL_PARTS, convert } from "./constants"
import { metricDistanceUnits } from "./metricDistance"

const conversion = (base: string) => convert([...CUBIC_PARTS, ...METRIC_VOL_PARTS, ...METRIC_DISTANCE_PARTS], base)

const unitMap = {
    lt: metricDistanceUnits.mm ** 3 * 1000000,
    ml: metricDistanceUnits.mm ** 3 * 1000,

    cumm: metricDistanceUnits.mm ** 3,
    cucm: metricDistanceUnits.cm ** 3,
    cum: metricDistanceUnits.m ** 3,
    cukm: metricDistanceUnits.km ** 3,

    mmcu: metricDistanceUnits.mm ** 3,
    cmcu: metricDistanceUnits.cm ** 3,
    mcu: metricDistanceUnits.m ** 3,
    kmcu: metricDistanceUnits.km ** 3
}

export function asMetricVolume(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const matchA = COMP_METRIC_VOL_A.exec(cell.text)
        const matchB = COMP_METRIC_VOL_B.exec(cell.text)
        const matchC = COMP_METRIC_VOL_C.exec(cell.text)
        const match = matchA ?? matchB ?? matchC 
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