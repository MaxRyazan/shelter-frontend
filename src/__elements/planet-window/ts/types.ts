import {SubTabs, Tabs} from "@/__elements/planet-window/ts/index";
import {Component} from "vue";

export type TopMenuType = {
    text: Tabs,
    icon: string,
    component: Component
}
export type TopSubMenuType = {
    text: SubTabs,
    id: number,
}