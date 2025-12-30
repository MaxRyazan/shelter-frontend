import {ref} from "vue";
import dayjs, {Dayjs} from "dayjs";
import {currentPlanet} from "@/__elements/planet-window/ts";

export enum SessionLogActions {
    CONSTRUCTION = "строительство/демонтаж",   // все операции по работе с постройками.
    REMOVE_ITEM_FROM_STORAGE = "удаление_со_склада",   // все операции по удалению чего либо со складов
}

export type SessionLog = {
    action: SessionLogActions,
    text: string,
    createdAt: Dayjs,
    planetName?: string | null | undefined
}

export const _SessionLogs = ref(new Map<number, SessionLog>([]))

export function createSessionLog(
    action: SessionLogActions,
    text: string,
    createdAt: Dayjs = dayjs(),
    planetName: string | null | undefined = currentPlanet.value?.name
) {
    _SessionLogs.value.set(createdAt.valueOf(), {
        action,
        text: text.toLowerCase(),
        createdAt,
        planetName
    })
}

export function findInSessionLogs(arg: string | number) {
    if (!arg) return _SessionLogs.value
    const values = Array.from(_SessionLogs.value.values())
    const result = values.filter((log: SessionLog) => log.text.includes(String(arg)) || log.planetName?.includes(String(arg)));
    let filteredMap = new Map<number, SessionLog>([]);
    result.forEach((log: SessionLog) => {
        filteredMap.set(log.createdAt.valueOf(), log)
    })
    return filteredMap;
}