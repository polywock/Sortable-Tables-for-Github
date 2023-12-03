import { Cell } from "../types"

function conversion(base: string) {
    return base.replace(/thousands?/, "k")
      .replace(/millions?/, "m")
      .replace(/trillions?/, "t")
      .replace(/quadrillions?/, "quad")
      .replace(/quintillions?/, "quin")
}
  
  
const unitMap = {
    k: 1_000,
    m: 1_000_000,
    t: 1_000_000_000,
    quad: 1_000_000_000_000,
    quin: 1_000_000_000_000_000
}

const REG = /(?<=\d\s*)(quintillions?|quadrillions?|trillions?|millions?|thousands?|k|m|t)(?![a-z0-9])/
const NO_M = /(?<=\d\s*)(quintillions?|quadrillions?|trillions?|millions?|thousands?|k|t)(?![a-z0-9])/

export function getAbbrUnit(text: string, avoidM?: boolean): Pick<Cell, "text" | "scalar"> {
    let match = (avoidM ? NO_M : REG).exec(text)
    if (!match) return {text}
    const scalar = unitMap[conversion(match[0] ?? "") as keyof typeof unitMap]
    if (!scalar) return {text}


    return {
        text: `${text.slice(0, match.index)}${text.slice(match.index + match[0].length)}`,
        scalar 
    } 
}


export function shouldAvoidM(data: string[]) {
    const units = new Set() 
    data.forEach(d => {
        const m = /\d+[\s\(\-\_)]*(millimeters?|centimeters?|kilometers?|meters?|mm|cm|km|m)/.exec(d)
        if (m?.[1]) {
            units.add(m[1])
        }
    })
    if (units.size >= 2) return true 
}