import {ref} from "vue";
import {GameBuildings} from "@/_openapi/models";

export interface Help {
    type: 'building' | undefined,
    subject: GameBuildings | undefined
}

export const showHelpAbout = ref<Help | undefined>()