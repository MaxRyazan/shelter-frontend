import {planetWindowsInstances} from "@/__elements/planet-window/ts/index";

export function switchPlanetWindow() {
    if (planetWindowsInstances.value.instanceOneOpen) {
        if (planetWindowsInstances.value.instanceTwoOpen) {
            planetWindowsInstances.value.instanceOneOpen = false
        } else {
            planetWindowsInstances.value.instanceTwoOpen = true
        }
    } else {
        if (planetWindowsInstances.value.instanceTwoOpen) {
            planetWindowsInstances.value.instanceTwoOpen = false
        } else {
            planetWindowsInstances.value.instanceOneOpen = true
        }
    }
}