import { Cell } from "../types"

function conversion(base: string) {
    return base.replace("cubed", "cb").replace("cube", "cb").replace("³", "cb")
        .replace("inches", "in").replace("inch", "in")
        .replace("feets", "ft").replace("feet", "ft").replace("foot", "ft")
        .replace("yards", "yd").replace("yard", "yd")
        .replace("miles", "mi").replace("mile", "mi")
        .replace(/\s/g, "")
}


const unitMap = {
    cbin: 1,
    cbft: 1728,
    cbyd: 46656,
    cbmi: 147197952000,

    incb: 1,
    ftcb: 1728,
    ydcb: 46656,
    micb: 147197952000
}

export function asImperialVolume(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:cubed|cube|cb|³)\s*(?:inches|inch|in|feets|foot|feet|ft|yards|yard|yd|miles|mile|mi))/.exec(cell.text)
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

export function asImperialVolumeReverse(cells: Cell[]) {
    cells = [...cells]
    let units = new Set() 
    for (let cell of cells) {
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*((?:inches|inch|in|feets|feet|foot|ft|yards|yard|yd|miles|mile|mi)(?:²|cubed|cube|³))/.exec(cell.text)
        if (!match) continue 

        const unit = conversion(match[2])

        cell.number = parseFloat(match[1])
        cell.normal = unitMap[unit as keyof typeof unitMap] * cell.number  
        units.add(unit)
    }

    if (units.size >= 2) {
        return cells 
    }
}