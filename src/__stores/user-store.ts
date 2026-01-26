import {ref} from "vue";
import type {UserResponseDto, UserTechnologyQueueResponseDto} from "@/_openapi/models";

export const user = ref<UserResponseDto | undefined>()

export const userTechQueue = ref<UserTechnologyQueueResponseDto[]>([])
