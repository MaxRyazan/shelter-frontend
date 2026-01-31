import {shallowRef} from "vue";
import type {GameBuildingsResponseDto} from "@/_openapi/models";

// заполняется с бэка в AppLayout
export const _GameBuildings = shallowRef<GameBuildingsResponseDto>({
    common: [],
    complex: [],
    energy: [],
    factory: [],
    food: [],
    industrial: [],
    mine: [],
    science: [],
});