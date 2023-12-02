import { Cell } from "../types";
import { asByte } from "./byte";
import { asImperialArea, asImperialAreaReverse } from "./imperialArea";
import { asImperialDistance } from "./imperialDistance";
import { asImperialVolume, asImperialVolumeReverse } from "./imperialVolume";
import { asMetricArea, asMetricAreaReverse } from "./metricArea";
import { asMetricDistance } from "./metricDistance";
import { asMetricVolume, asMetricVolumeReverse } from "./metricVolume";
import { asMetricWeight } from "./metricWeight";
import { asNumber } from "./number";

export function getAs(cells: Cell[]) {
    return asByte(cells) ?? 
        asImperialDistance(cells) ?? asMetricDistance(cells) ??
        asImperialArea(cells) ?? asImperialAreaReverse(cells) ?? 
        asImperialVolume(cells) ?? asImperialVolumeReverse(cells) ??
        asMetricArea(cells) ?? asMetricAreaReverse(cells) ?? 
        asMetricVolume(cells) ?? asMetricVolumeReverse(cells) ?? 
        asMetricWeight(cells) ??
        asNumber(cells) ?? cells 
}