import {ref} from "vue";
import type {UserResponseDto} from "@/_openapi/models";

export const user = ref<UserResponseDto | undefined>()
