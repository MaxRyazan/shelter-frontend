import {shallowRef} from "vue";
import type {GameBuildingsResponseDto} from "@/_openapi/models";

export const _GameBuildings = shallowRef<GameBuildingsResponseDto>({
    common: [],
    complex: [],
    energy: [],
    factory: [],
    food: [],
    industrial: [],
    mine: [],
});