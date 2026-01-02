import {ref} from "vue";

export type SessionLog = {
    planetName: string,
    eventType: string,
    count: number,
    buildingType: string,
    text: string
}

export const _SessionLogs = ref<SessionLog[]>([]);