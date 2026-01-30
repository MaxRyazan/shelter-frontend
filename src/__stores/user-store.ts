import {ref} from "vue";
import type {UserResponseDto, UserTechnologyDto, UserTechnologyQueueResponseDto} from "@/_openapi/models";

export const user = ref<UserResponseDto | undefined>()

export const userTechQueue = ref<UserTechnologyQueueResponseDto[]>([])

export const allUserTechnologies = ref<UserTechnologyDto[]>([])
