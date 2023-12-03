
import { getAs } from "./getAs"
import { getAbbrUnit, shouldAvoidB, shouldAvoidM } from "./getAs/abbr"
import { assertType, Cell } from "./types"

declare global {
    interface HTMLTableElement {
      originalRows: HTMLElement[],
      latest?: HTMLElement
    }

    interface HTMLElement {
      originalText: string,
      sortedMode: number 
    }
}

const style = document.createElement("style")
style.innerHTML = `
    .markdown-body table thead:first-child tr:first-child > *:hover, .markdown-body table tbody:first-child tr:first-child > *:hover, .markdown-body table tr > *:first-child:hover {
      background-color: red;
      color: white;
      user-select: none;
    }
`
document.documentElement.appendChild(style)

window.addEventListener("click", e => {
  assertType<HTMLElement>(e.target)
    const current = e.target.closest("td, th") as HTMLElement
    if (!current) return 

    const table = current.closest(".markdown-body table") as HTMLTableElement
    const tbody = table?.querySelector("tbody")
    if (!tbody) return 

    const rows = [...table.querySelectorAll("tr")]

    // Move all rows to tbody 
    rows.forEach(tr => {
      tbody.appendChild(tr)
    })
    table.querySelector("thead")?.remove()


    // figure out x and y of where we clicked. 
    const x = [...current.parentElement.children].indexOf(current)
    const y = rows.findIndex(r => [...r.children].includes(current as any))
    if (x < 0 || y < 0 || (x !== 0 && y !== 0)) return 

    const columnElements =  [...table.querySelectorAll(`tr td:nth-child(${x + 1}), tr th:nth-child(${x + 1})`)];
    const rowElements =  [...current.closest("tr").querySelectorAll("td, th")]



    let sortByColumn = y === 0
    let elements = sortByColumn ? columnElements : rowElements
    const avoidM = shouldAvoidM(elements.map(v => v.textContent))
    const avoidB = shouldAvoidB(elements.map(v => v.textContent))

    let cells = elements.map(v => ({elem: v, ...getAbbrUnit(clean(v.textContent), avoidM, avoidB)}) as Cell)
    cells = getAs(cells).slice(1)

    if (table.latest && table.latest !== current) {
      delete table.latest.sortedMode
    }

    current.sortedMode = Math.round(((current.sortedMode ?? 0) + 1) % 3 ) 
    table.latest = current 

    // store original 
    if (current.sortedMode === 1) {
        table.originalRows = rows 
    }

    table.querySelectorAll(".mdTableExtSpan").forEach(v => v.remove())

    // Clear 
    if (current.sortedMode === 0) {
      rows.forEach(row => {
          row.remove() 
      })

      table.originalRows.forEach(row => {
          tbody.appendChild(row)
      })
      return 
  }

    const span = document.createElement("span")
    span.style.whiteSpace = "pre"
    span.innerText = current.sortedMode === 1 ? (sortByColumn ? " ↑" : " ←") : (sortByColumn ? " ↓" : " →")  
    span.classList.add("mdTableExtSpan")

    current.appendChild(span)    

    cells.sort((a, b) => {
      assertType<HTMLElement>(current)

        if (current.sortedMode === 1) {
            [a, b] = [b, a]
        }

        if (a.normal != null || b.normal != null) {
          return (a.normal ?? -Infinity) - (b.normal ?? -Infinity)
        }

        return a.text.localeCompare(b.text)
    })

    if (sortByColumn) {
      cells.forEach(cell => {
        const row = cell.elem.parentElement
        row.remove()
      })

      cells.forEach(cell => {
        const row = cell.elem.parentElement
        tbody.appendChild(row)
      })

      return 
    } 

    // remove everything past x index 1 
    let rowsWithExtra = rows.map(row => {
      return {row, extra: [...row.children].slice(1)}
    })
    rowsWithExtra.forEach(r => {
      r.extra.forEach(c => c.remove())
    })

    cells.forEach(cell => {
      const idx = rowsWithExtra[y].extra.findIndex(c => c === cell.elem)

      for (let r of rowsWithExtra) {
          const bro = r.extra.at(idx)
          r.extra.splice(idx, 1)
          r.row.appendChild(bro)
      }
    })
})


function clean(a: string) {
  return a.toLocaleLowerCase().replace(/(?<=\d)[,\s\-\_\:](?=\d)/, "")
}


