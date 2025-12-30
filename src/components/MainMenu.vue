<template>
    <div class="menu">
        <div style="display: flex; gap: 8px">
            <common-icon name="shared-resources-icon.webp"
                         @click="switchSharedResources"/>
            <common-icon name="planet-icon.webp"
                         @click="switchPlanetWindow"/>
        </div>
        <session-logs />
    </div>
</template>
<script setup lang="ts">
import CommonIcon from "@/components/icons/CommonIcon.vue";
import {isSharedResourcesWindowOpen} from "@/__stores/shared-resources-store";
import {planetWindowsInstances} from "@/__elements/planet-window/ts";
import SessionLogs from "@/__elements/session-logs/SessionLogs.vue";


function switchSharedResources() {
    isSharedResourcesWindowOpen.value = !isSharedResourcesWindowOpen.value
}

function switchPlanetWindow() {
    if (planetWindowsInstances.value.instanceOneOpen) {
        if (planetWindowsInstances.value.instanceTwoOpen) {
            planetWindowsInstances.value.instanceOneOpen = false
        } else {
            planetWindowsInstances.value.instanceTwoOpen = true
        }
    } else {
        if (planetWindowsInstances.value.instanceTwoOpen) {
            planetWindowsInstances.value.instanceTwoOpen = false
        } else {
            planetWindowsInstances.value.instanceOneOpen = true
        }
    }
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
</style>