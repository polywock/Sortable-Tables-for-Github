import { Cell } from "../types"

function conversion(base: string) {
    return base
        .replace(/(yottabytes?|yottabits?|ybits?)/, "yb")
        .replace(/(exabytes?|exabits?|ebits?)/, "eb")
        .replace(/(petabytes?|petabits?|pbits?)/, "pb")
        .replace(/(terabytes?|terabits?|tbits?)/, "tb")
        .replace(/(gigabytes?|gigabits?|gbits?)/, "gb")
        .replace(/(megabytes?|megabits?|mbits?)/, "mb")
        .replace(/(kilobytes?|kilobits?|kbits?)/, "kb")
        .replace(/(bytes?|bits?)/, "b")
        .replace(/\s/g, "")
}


const unitMap = {
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
        const match = /(\d+(?:\.\d+)?)\s*[\(\-\_)]*\s*(yottabytes?|yottabits?|exabytes?|exabits?|petabytes?|petabits?|terabytes?|terabits?|gigabytes?|gigabits?|megabytes?|megabits?|kilobytes?|kilobits?|ybits?|ebits?|pbits?|tbits?|gbits?|mbits?|kbits?|bytes?|bits?|kb|mb|gb|tb|pb|eb|zb|yb|b)(?![a-z0-9])/.exec(cell.text)
        if (!match) continue 
        const unit = match[2]
        const scalar = unitMap[conversion(unit) as keyof typeof unitMap]
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