import { Cell } from "../types"


export function asSemantic(cells: Cell[]) {
    cells = [...cells]
    let count = 0 
    for (let cell of cells) {
        const match = /\d+\.\d+\.\d+/.exec(cell.text)
        if (!(match?.[0])) continue 
        const nums = match[0].split(".").map(v => parseInt(v)).toReversed()
        let num = 0 
        nums.forEach((v, i) => {
            num += v * (10000 ** i)
        })
        cell.number = num 
        cell.normal = num 
        count++
    }

    if (count > 2) {
        return cells 
    }
}


const number = String.raw`(?:\d+(?:\.\d+)?)`

export function asSemanticAlt(cells: Cell[]) {
    cells = [...cells]
    let count = 0 
    for (let cell of cells) {
        const match = new RegExp(String.raw`(?<!\d)${number}[\:\-\|\\\/\_]+${number}[\:\-\|\\\/\_]+${number}(?!\d)`).exec(cell.text)
        if (!(match?.[0])) continue 
        const nums = match[0].split(/[\:\-\|\\\/\_]+/).map(v => parseInt(v)).toReversed()
        let num = 0 
        nums.forEach((v, i) => {
            num += v * (10000 ** i)
        })
        cell.number = num 
        cell.normal = num 
        count++
    }

    if (count > 2) {
        return cells 
    }
}