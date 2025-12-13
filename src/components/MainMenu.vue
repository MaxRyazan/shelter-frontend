<template>
    <div class="menu">
        <common-icon name="shared-resources-icon.webp"
                     @click="switchSharedResources"/>
        <common-icon name="planet-icon.webp"
                     @click="switchPlanetWindow"/>
    </div>
</template>
<script setup lang="ts">
import CommonIcon from "@/components/icons/CommonIcon.vue";
import {isSharedResourcesWindowOpen} from "@/__stores/shared-resources-store";
import {planetWindowsInstances} from "@/__elements/planet-window/ts";


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
    gap: 16px;

    @media screen and (max-width: 600px) {
        width: 40px;
        flex-direction: column;
        height: auto;
        padding: 10px 0;
    }
}
</style>