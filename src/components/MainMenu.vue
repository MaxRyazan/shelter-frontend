<template>
    <div class="menu">
        <div class="main-menu-list">
            <common-icon name="shared-resources-icon.webp"
                         @click="switchSharedResources"/>
            <common-icon name="planet-icon.webp"
                         @click="switchPlanetWindow"/>
            <common-icon name="planet-icon.webp"
                         @click="openSettings"/>
        </div>
        <session-logs v-if="!_userSettings?.session_logs_hide_always"/>
    </div>
</template>
<script setup lang="ts">
import CommonIcon from "@/components/icons/CommonIcon.vue";
import {isSharedResourcesWindowOpen} from "@/__stores/shared-resources-store";
import SessionLogs from "@/__elements/session-logs/SessionLogs.vue";
import {switchPlanetWindow} from "@/__elements/planet-window/ts/functions";
import {_userSettings, isSettingsWindowOpen} from "@/__elements/settings-window/ts";

function switchSharedResources() {
    isSharedResourcesWindowOpen.value = !isSharedResourcesWindowOpen.value
}

function openSettings() {
    isSettingsWindowOpen.value = !isSettingsWindowOpen.value
}
</script>
<style scoped>
.menu {
    width: 100%;
    padding: 0 4px;
    height: 60px;
    background: var(--menu-back);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    @media screen and (max-width: 600px) {
        width: 40px;
        flex-direction: column;
        height: auto;
        padding: 10px 0;
    }

}

.main-menu-list {
    display: flex;
    gap: 8px;

    @media screen and (max-width: 600px) {
        width: 40px;
        flex-direction: column;
        align-items: center;
        height: auto;
    }
}
</style>