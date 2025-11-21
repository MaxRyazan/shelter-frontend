import {ref} from "vue";
import {GetPlanetResponseDto} from "@/_openapi/models";

/**
 * Флаг открытия окна просмотра планеты
 */
export const isPlanetWindowOpen = ref(false);

/**
 * Флаг открытия списка планет игрока
 */
export const isPlanetChoserOpen = ref(false);

/**
 * Текущая планета для просмотра в окне просмотра планеты
 */
export const currentPlanet = ref<GetPlanetResponseDto | undefined>();

/**
 * Все планеты пользователя
 */
export const allPlanets = ref<GetPlanetResponseDto[] | null>(null)
