import {Tabs} from "@/__elements/planet-window/ts/index";
import {Component} from "vue";

export type TopMenuType = {
    text: Tabs,
    icon: string,
    component: Component
}
export type TopSubMenuType = {
    id: number,
    text: Record<number, string>,
}

export type PlanetInfoParam = {
    name: string,
    value: string | number | boolean | undefined | null,
    type: 'string' | 'boolean' | 'number',
    usePositiveColorIndication?: boolean,
    useNegativeColorIndication?: boolean,
    useGreenTriangle?: boolean
    useRedTriangle?: boolean
}
