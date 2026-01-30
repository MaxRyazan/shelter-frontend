import {ref} from "vue";
import {GameBuildings, Technology, type UserTechnologyQueueResponseDto} from "@/_openapi/models";

export interface Help {
    type: 'building' | 'tech-in-queue' | 'tech-in-tree' | undefined,
    subject: GameBuildings | UserTechnologyQueueResponseDto[] | Technology | undefined
    title: string | undefined
}

export const showHelpAbout = ref<Help | undefined>()

export const treeTechForObserve = ref<Technology | null>(null)