import { Cell } from "../types"

export function asNumberIfNone(cells: Cell[]) {
    cells = [...cells]
    for (let cell of cells) {
        if (cell.normal != null) continue
        
        const match = /(?<!\w)(\d+(?:\.\d+)?)/.exec(cell.text)
        if (!match) continue 
        cell.number = cell.number ?? parseFloat(match[1])
        cell.normal = 1 * cell.number  
    }

    return cells 
}