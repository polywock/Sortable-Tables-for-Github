import { Cell } from "../types"
import { COMP_NUMBER } from "./constants"

export function asNumberIfNone(cells: Cell[]) {
    for (let cell of cells) {
        if (cell.normal != null) continue
        
        const match = COMP_NUMBER.exec(cell.text)
        if (!match) continue 
        cell.number = cell.number ?? parseFloat(match[1])
        cell.normal = 1 * cell.number  
    } 
}