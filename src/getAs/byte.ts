import { Cell } from "../types"
import { BYTE_PARTS, COMP_BYTE, convert } from "./constants"

const conversion = (base: string) => convert(BYTE_PARTS, base)

const unitBytes = {
    b: 1 ** 0,
    kb: 1000 ** 1,
    mb: 1000 ** 2,
    gb: 1000 ** 3,
    tb: 1000 ** 4,
    pb: 1000 ** 5,
    eb: 1000 ** 6,
    zb: 1000 ** 7,
    yb: 1000 ** 8,
}

export function asByte(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = COMP_BYTE.exec(cell.text)
        console.log(cell.text, match)
        if (!match) continue 
        const unit = match[2]
        const scalar = unitBytes[conversion(unit) as keyof typeof unitBytes]
        if (!scalar) continue 

        cell.number = parseFloat(match[1])
        cell.normal = scalar * cell.number  
        units.add(unit)
    }

    units.delete("b")
    if (units.size >= 2) {
        return cells 
    }
}