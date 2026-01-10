import {ref} from "vue";
import {UserSettings} from "@/_openapi/models";

export const isSettingsWindowOpen = ref(false);

export const isScienceWindowOpen = ref(false);

export const _userSettings = ref<UserSettings | undefined>();