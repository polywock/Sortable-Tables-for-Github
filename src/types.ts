
export type Cell = {
    text: string,
    elem: HTMLElement,
    number?: number,
    normal?: number,
    scalar?: number // abbr
}

export function assertType<T>(value: any): asserts value is T { }