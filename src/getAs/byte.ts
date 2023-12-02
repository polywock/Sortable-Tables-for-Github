import { Cell } from "../types"

const unitMap = {
    b: 1 ** 0,
    kb: 1024 ** 1,
    mb: 1024 ** 2,
    gb: 1024 ** 3,
    tb: 1024 ** 4,
    eb: 1024 ** 5,
    zb: 1024 ** 6,
    yb: 1024 ** 7,
}

export function asByte(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*(b|kb|mb|gb|tb|pb|eb|zb|yb)/.exec(cell.text)
        if (!match) continue 
        const unit = match[2]
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