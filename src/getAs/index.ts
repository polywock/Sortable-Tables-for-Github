import { Cell } from "../types";
import { asSemantic, asSemanticAlt } from "./asSemantic";
import { asByte } from "./byte";
import { asImperialArea } from "./imperialArea";
import { asImperialDistance } from "./imperialDistance";
import { asImperialVolume } from "./imperialVolume";
import { asImperialWeight } from "./imperialWeight";
import { asMetricArea } from "./metricArea";
import { asMetricDistance } from "./metricDistance";
import { asMetricVolume } from "./metricVolume";
import { asMetricWeight } from "./metricWeight";
import { asNumberIfNone } from "./number";

export function getAs(cells: Cell[]) {
    cells = 
        asSemantic(cells) ?? 
        asSemanticAlt(cells) ?? 
        asByte(cells) ?? 
        asMetricVolume(cells) ?? 
        asMetricWeight(cells) ??
        asMetricArea(cells) ??
        asMetricDistance(cells) ??
        asImperialVolume(cells) ??
        asImperialArea(cells) ??
        asImperialDistance(cells) ?? 
        asImperialWeight(cells) ??
        cells 

    asNumberIfNone(cells)

    cells.forEach(c => {
        if (c.scalar != null && c.normal != null) {
            c.normal *= c.scalar
        }
    })

    return cells 
}