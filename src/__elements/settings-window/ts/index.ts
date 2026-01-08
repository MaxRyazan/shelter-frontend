import {ref} from "vue";
import {UserSettings} from "@/_openapi/models";

export const isSettingsWindowOpen = ref(false);

export const _userSettingsMap = ref(new Map<string, boolean>([]));

export const _userSettings = ref<UserSettings | undefined>();