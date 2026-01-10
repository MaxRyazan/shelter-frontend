<template>
    <drag-modal class="settings-window"
                @close="isSettingsWindowOpen = false">
        <template #header>
            <s-text semi-bold>Настройки</s-text>
        </template>
        <s-divider />
        <div class="settings-window__list">
            <single-setting v-for="[key, value] of settings"
                            @handle-change-setting="(newVal: boolean) => handleChangeSettings(key, newVal)"
                            :name="key"
                            :description="value"
                            :key="key"/>
        </div>
    </drag-modal>
</template>
<script setup lang="ts">
import DragModal from "@/components/modals/DragModal.vue";
import {_userSettings, isSettingsWindowOpen} from "@/__elements/settings-window/ts";
import {useApiLazy} from "@/composables/useApi";
import {onMounted, ref} from "vue";
import {getApiUserGetAllSettings, postApiUserChangeUserSettings} from "@/_openapi/api/users/users";
import SingleSetting from "@/__elements/settings-window/vue/SingleSetting.vue";
import SText from "@/components/common/SText.vue";
import type {UserSettings} from "@/_openapi/models";
import {user} from "@/__stores/user-store";
import SDivider from "@/components/common/SDivider.vue";

const {execute} = useApiLazy<{ [key: string]: string }>()
const {execute: changeUserSetting} = useApiLazy<UserSettings>()
const settings = ref(new Map<string, string>([]))

async function handleChangeSettings(key: string, newVal: boolean) {
    const response = await changeUserSetting(postApiUserChangeUserSettings, {
        userId: user.value?.id,
        setting: key,
        settingValue: newVal,
    })
    if (response) {
        _userSettings.value = response
    }
}

onMounted(async () => {
    const response = await execute(getApiUserGetAllSettings)
    if (response) {
        for (let [key, value] of Object.entries(response)) {
            settings.value.set(key, value);
        }
    }
})
</script>
<style scoped>
.settings-window {
    background: #0d1117 !important;
}
.settings-window__list {
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
}
</style>