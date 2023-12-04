import { Cell } from "../types"

function conversion(base: string) {
    return base.replace(/(cubed|cubic|cube|³)/, "cb")
        .replace(/(inches|inch)/, "in")
        .replace(/(feets?|foots?)/, "ft")
        .replace(/yards?/, "yd")
        .replace(/(miles|mile)/, "mi")
        .replace(/gallons?/, "gl")
        .replace(/quarts?/, "qt")
        .replace(/pints?/, "pt")
        .replace(/cups/, "cup")
        .replace(/\s/g, "")
}


const unitMap = {
    cbin: 1,
    cbft: 1728,
    cbyd: 46656,
    cbmi: 147197952000,

    gl: 231,
    qt: 231 / 4,
    pt: 231 / 8,
    cup: 231 / 16,

    incb: 1,
    ftcb: 1728,
    ydcb: 46656,
    micb: 147197952000
}

export function asImperialVolume(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const matchA = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:cubed|cubic|cube|cb|³)\s*(?:inches|inch|feets?|foots?|yards?|miles|mile|ft|yd|mi|in))(?![a-z0-9])/.exec(cell.text)
        const matchB = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:inches|inch|feets?|foots?|yards?|miles|mile|ft|yd|mi|in)(?:²|cubed|cubic|cube|³))(?![a-z0-9])/.exec(cell.text)
        const matchC = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:gallons?|quarts?|pints?|cups?|gl|qt|pt))(?![a-z0-9])/.exec(cell.text)
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

