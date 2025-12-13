import {ref} from "vue";
import {GetPlanetResponseDto} from "@/_openapi/models";

/**
 * Инстансы окон просмотра планет
 */
export const planetWindowsInstances = ref({
    instanceOneOpen: false,
    instanceTwoOpen: false,
})

/**
 * Текущая планета для просмотра в окне просмотра планеты
 */
export const currentPlanet = ref<GetPlanetResponseDto | undefined>();

/**
 * Все планеты пользователя
 */
export const allPlanets = ref<GetPlanetResponseDto[] | null>(null)


export enum Tabs {
    view = 'обзор',
    storage = 'склад',
    buildings = 'постройки',
    buildings_queue = 'очередь строительства',
    production = 'производства',
    defence = 'оборона',
}

export enum SubTabs {
    resources = 'ресурсы',
    materials = 'материалы',
    metamaterials = 'метаматериалы',
    components = 'компоненты',
}
