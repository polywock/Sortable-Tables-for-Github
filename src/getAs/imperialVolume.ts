import { Cell } from "../types"
import { COMP_IMPERIAL_VOL_A, COMP_IMPERIAL_VOL_B, COMP_IMPERIAL_VOL_C, CUBIC_PARTS, IMPERIAL_DISTANCE_PARTS, IMPERIAL_VOL_PARTS, convert } from "./constants"
import { imperialDistanceUnits } from "./imperialDistance"

const conversion = (base: string) => convert([...CUBIC_PARTS, ...IMPERIAL_VOL_PARTS, ...IMPERIAL_DISTANCE_PARTS], base)

const gallon = imperialDistanceUnits.in ** 3 * 231

const unitMap = {
    cuin: imperialDistanceUnits.in ** 3,
    cuft: imperialDistanceUnits.ft ** 3,
    cuyd: imperialDistanceUnits.yd ** 3,
    cumi: imperialDistanceUnits.mi ** 3,

    incu: imperialDistanceUnits.in ** 3,
    ftcu: imperialDistanceUnits.ft ** 3,
    ydcu: imperialDistanceUnits.yd ** 3,
    micu: imperialDistanceUnits.mi ** 3,

    gl: gallon,
    qt: gallon / 4,
    pt: gallon / 8,
    cup: gallon / 16,
}

export function asImperialVolume(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const matchA = COMP_IMPERIAL_VOL_A.exec(cell.text)
        const matchB = COMP_IMPERIAL_VOL_B.exec(cell.text)
        const matchC = COMP_IMPERIAL_VOL_C.exec(cell.text)
        const match = matchA ?? matchB ?? matchC 
        if (!match) continue 
        const unit = conversion(match[2])
        console.log(match[2], unit)
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

