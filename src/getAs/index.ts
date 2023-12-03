import { Cell } from "../types";
import { asByte } from "./byte";
import { asImperialArea } from "./imperialArea";
import { asImperialDistance } from "./imperialDistance";
import { asImperialVolume } from "./imperialVolume";
import { asImperialWeight } from "./imperialWeight";
import { asMetricArea } from "./metricArea";
import { asMetricDistance } from "./metricDistance";
import { asMetricVolume } from "./metricVolume";
import { asMetricWeight } from "./metricWeight";
import { asNumber } from "./number";

export function getAs(cells: Cell[]) {
    cells = asByte(cells) ?? 
        asMetricVolume(cells) ?? 
        asMetricWeight(cells) ??
        asMetricArea(cells) ??
        asMetricDistance(cells) ??
        asImperialVolume(cells) ??
        asImperialArea(cells) ??
        asImperialDistance(cells) ?? 
        asImperialWeight(cells) ??
        asNumber(cells) ?? cells 

    cells?.forEach(c => {
        if (c.scalar != null && c.normal != null) {
            c.normal *= c.scalar
        }
    })

    return cells 
}