import { Cell } from "../types"

export function asNumber(cells: Cell[]) {
    cells = [...cells]
    let count = 0 
    for (let cell of cells) {
        const match = /(?<!\w)(\d+(?:\.\d+)?)/.exec(cell.text)
        if (!match) continue 
        cell.number = parseFloat(match[1])
        cell.normal = 1 * cell.number  

        count++ 
    }

    if (count >= 2) {
        return cells 
    }
}