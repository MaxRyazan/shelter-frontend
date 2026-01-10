import {ref} from "vue";
import type {PlanetStorageDto} from "@/_openapi/models";

export const sharedItems = ref<PlanetStorageDto | undefined>()
