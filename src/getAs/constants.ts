

type Part = {
    m: string,
    a: string[],
    t?: string,
}

function getOrs(parts: Part[]): string {
    const longs = parts.map(p => p.a).flat(1)
    const shorts = parts.map(p => p.t ?? p.m)
    return [...longs, ...shorts].join("|")
}

export const BYTE_PARTS: Part[] = [
    {m: 'kb', a: ['kilobytes?', 'kilobits?', 'kbits?']},
    {m: 'mb', a: ['megabytes?', 'megabits?', 'mbits?']},
    {m: 'gb', a: ['gigabytes?', 'gigabits?', 'gbits?']},
    {m: 'tb', a: ['terabytes?', 'terabits?', 'tbits?']},
    {m: 'pb', a: ['petabytes?', 'petabits?', 'pbits?']},
    {m: 'eb', a: ['exabytes?', 'exabits?', 'ebits?']},
    {m: 'zb', a: ['zettabytes?', 'zettabits?', 'zbits?']},
    {m: 'yb', a: ['yottabytes?', 'yottabits?', 'ybits?']},
    {m: 'rb', a: ['ronnabytes?', 'ronnabits?', 'rbits?']},
    {m: 'b', a: ['bytes?', 'bits?']}
]

export const BYTES = String.raw`(?:${getOrs(BYTE_PARTS)})`

function getReplacer(part: Part): string {
    const alts = [...part.a]
    part.t && alts.push(part.t)
    return alts.join("|")
}


export const convert = (parts: Part[], base: string) => {
    for (let part of parts) {
        base = base.replace(new RegExp(getReplacer(part)), part.m)
    }
    return base.replace(/\s/g, "") 
}

export const METRIC_DISTANCE_PARTS: Part[] = [
    {m: 'mm', a: ['millimeters?']},
    {m: 'cm', a: ['centimeters?']},
    {m: 'km', a: ['kilometers?']},
    {m: 'm', a: ['meters?']}
]

export const METRIC_DISTANCE = String.raw`(?:${getOrs(METRIC_DISTANCE_PARTS)})`



export const METRIC_WEIGHT_PARTS: Part[] = [
    {m: 'mg', a: ['milligrams?']},
    {m: 'cg', a: ['centigrams?']},
    {m: 'dg', a: ['decigrams?']},
    {m: 'dag', a: ['decagrams?']},
    {m: 'hg', a: ['hectograms?']},
    {m: 'kg', a: ['kilograms?', 'kilos?']},
    {m: 'ton', a: ['tons?']},
    {m: 'g', a: ['grams?']}
]

export const METRIC_WEIGHT = String.raw`(?:${getOrs(METRIC_WEIGHT_PARTS)})`


export const METRIC_VOL_PARTS: Part[] = [
    {m: 'ml', a: ['milliliters?']},
    {m: 'lt', a: ['liters?']},
]

export const METRIC_VOL = String.raw`(?:${getOrs(METRIC_VOL_PARTS)})`

export const IMPERIAL_DISTANCE_PARTS: Part[] = [
    {m: 'in', a: ['inches', 'inch']},
    {m: 'ft', a: ['feets?', 'foots?']},
    {m: 'yd', a: ['yards?']},
    {m: 'mi', a: ['miles', 'mile']}
]

export const IMPERIAL_DISTANCE = String.raw`(?:${getOrs(IMPERIAL_DISTANCE_PARTS)})`

export const IMPERIAL_WEIGHT_PARTS: Part[] = [
    {m: 'oz', a: ['ounces', 'ounce']},
    {m: 'lb', a: ['pounds?', 'lbs']},
    {m: 'ton', a: ['tons', 'short tons?']}
]

export const IMPERIAL_WEIGHT = String.raw`(?:${getOrs(IMPERIAL_WEIGHT_PARTS)})`

export const IMPERIAL_VOL_PARTS: Part[] = [
    {m: 'gl', a: ['gallons?']},
    {m: 'qt', a: ['quarts?']},
    {m: 'pt', a: ['pints?']},
    {m: 'cup', a: ['cups']}
]

export const IMPERIAL_VOL = String.raw`(?:${getOrs(IMPERIAL_VOL_PARTS)})`

export const CUBIC_PARTS: Part[] = [
    {m: 'cu', a: ['cubic', 'cubed?', '³', String.raw`\^ ?3`]}
]

export const CUBIC = String.raw`(?:${getOrs(CUBIC_PARTS)})`


export const SQUARED_PARTS: Part[] = [
    {m: 'sq', a: ['squared', 'square', '²', String.raw`\^ ?2`]}
]

export const SQUARED = String.raw`(?:${getOrs(SQUARED_PARTS)})`

export const NUMBER = String.raw`(\d+(?:\.\d+)?)`

export const NUMBER_PRE = String.raw`${NUMBER}\s*[\(\-\_)]*\s*`

export const NOT_AHEAD_AZ09 = String.raw`(?![a-z0-9])`

export const COMP_NUMBER = new RegExp(NUMBER)


export const COMP_BYTE = new RegExp(String.raw`${NUMBER_PRE}(${BYTES})${NOT_AHEAD_AZ09}`)

export const COMP_METRIC_DISTANCE_A = new RegExp(String.raw`${NUMBER_PRE}(${METRIC_DISTANCE})${NOT_AHEAD_AZ09}`)
export const COMP_IMPERIAL_DISTANCE_A = new RegExp(String.raw`${NUMBER_PRE}(${IMPERIAL_DISTANCE})${NOT_AHEAD_AZ09}`)

export const COMP_METRIC_WEIGHT_A = new RegExp(String.raw`${NUMBER_PRE}(${METRIC_WEIGHT})${NOT_AHEAD_AZ09}`)
export const COMP_IMPERIAL_WEIGHT_A = new RegExp(String.raw`${NUMBER_PRE}(${IMPERIAL_WEIGHT})${NOT_AHEAD_AZ09}`)

export const COMP_METRIC_AREA_A = new RegExp(String.raw`${NUMBER_PRE}(${SQUARED}\s*${METRIC_DISTANCE})${NOT_AHEAD_AZ09}`)
export const COMP_METRIC_AREA_B = new RegExp(String.raw`${NUMBER_PRE}(${METRIC_DISTANCE}\s*${SQUARED})${NOT_AHEAD_AZ09}`)

export const COMP_IMPERIAL_AREA_A = new RegExp(String.raw`${NUMBER_PRE}(${SQUARED}\s*${IMPERIAL_DISTANCE})${NOT_AHEAD_AZ09}`)
export const COMP_IMPERIAL_AREA_B = new RegExp(String.raw`${NUMBER_PRE}(${IMPERIAL_DISTANCE}\s*${SQUARED})${NOT_AHEAD_AZ09}`)


export const COMP_METRIC_VOL_A = new RegExp(String.raw`${NUMBER_PRE}(${CUBIC}\s*${METRIC_DISTANCE})${NOT_AHEAD_AZ09}`)
export const COMP_METRIC_VOL_B = new RegExp(String.raw`${NUMBER_PRE}(${METRIC_DISTANCE}\s*${CUBIC})${NOT_AHEAD_AZ09}`)
export const COMP_METRIC_VOL_C = new RegExp(String.raw`${NUMBER_PRE}(${METRIC_VOL})${NOT_AHEAD_AZ09}`)

export const COMP_IMPERIAL_VOL_A = new RegExp(String.raw`${NUMBER_PRE}(${CUBIC}\s*${IMPERIAL_DISTANCE})${NOT_AHEAD_AZ09}`)
export const COMP_IMPERIAL_VOL_B = new RegExp(String.raw`${NUMBER_PRE}(${IMPERIAL_DISTANCE}\s*${CUBIC})${NOT_AHEAD_AZ09}`)
export const COMP_IMPERIAL_VOL_C = new RegExp(String.raw`${NUMBER_PRE}(${IMPERIAL_VOL})${NOT_AHEAD_AZ09}`)
