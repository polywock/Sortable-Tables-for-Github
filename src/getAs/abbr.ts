import { Cell } from "../types"

function conversion(base: string) {
    return base.replace(/thousands?/, "k")
      .replace(/millions?/, "m")
      .replace(/billions?/, "b")
      .replace(/trillions?/, "t")
      .replace(/quadrillions?/, "quad")
      .replace(/quintillions?/, "quin")
}
  
  
const unitMap = {
    k: 1E3,
    m: 1E6,
    b: 1E9,
    t: 1E12,
    quad: 1E15,
    quin: 1E18
}

const REG = /(?<=\d\s*)(quintillions?|quadrillions?|trillions?|billions?|millions?|thousands?|k|m|b|t)(?![a-z0-9])/
const NO_M = /(?<=\d\s*)(quintillions?|quadrillions?|trillions?|billions?|millions?|thousands?|k|b|t)(?![a-z0-9])/
const NO_B = /(?<=\d\s*)(quintillions?|quadrillions?|trillions?|billions?|millions?|thousands?|k|m|t)(?![a-z0-9])/

export function getAbbrUnit(text: string, avoidM?: boolean, avoidB?: boolean): Pick<Cell, "text" | "scalar"> {
    let match = (avoidM ? NO_M : (avoidB ? NO_B : REG)).exec(text)
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

export function shouldAvoidB(data: string[]) {
    const units = new Set() 
    data.forEach(d => {
        const m = /\d+[\s\(\-\_)]*(yottabytes?|exabytes?|petabytes?|terabytes?|gigabytes?|megabytes?|kilabytes?|bytes?|bits?|kb|mb|gb|tb|pb|eb|zb|yb|b)/.exec(d)
        if (m?.[1]) {
            units.add(m[1])
        }
    })
    if (units.size >= 2) return true 
}