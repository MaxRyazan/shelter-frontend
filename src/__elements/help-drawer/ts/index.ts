import {ref} from "vue";
import {
    GetBuildingInfoDto,
    GetTechInfoForUserDto,
    type UserTechnologyQueueResponseDto
} from "@/_openapi/models";

export interface Help {
    type: 'building' | 'tech-in-queue' | 'tech-in-tree' | undefined,
    subject: GetBuildingInfoDto | UserTechnologyQueueResponseDto[] | GetTechInfoForUserDto | undefined
    title: string | undefined
}

export const showHelpAbout = ref<Help | undefined>()

export const treeTechForObserve = ref<GetTechInfoForUserDto | null>(null)