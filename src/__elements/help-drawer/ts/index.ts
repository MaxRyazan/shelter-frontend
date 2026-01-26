import {ref} from "vue";
import {GameBuildings, type UserTechnologyQueueResponseDto} from "@/_openapi/models";

export interface Help {
    type: 'building' | 'tech-in-queue' | undefined,
    subject: GameBuildings | UserTechnologyQueueResponseDto[] | undefined
    title: string | undefined
}

export const showHelpAbout = ref<Help | undefined>()