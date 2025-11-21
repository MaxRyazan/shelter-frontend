<template>
    <div class="wrapper">
        <the-header/>
        <the-content/>
        <the-footer/>
        <transition name="base" mode="out-in">
            <shared-resources-window v-if="isSharedResourcesWindowOpen"/>
        </transition>
        <transition name="base" mode="out-in">
            <planet-window v-if="isPlanetWindowOpen"/>
        </transition>
    </div>
</template>
<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import TheContent from "./components/TheContent.vue";
import TheFooter from "./components/TheFooter.vue";
import {isSharedResourcesWindowOpen, SharedResourcesStore} from "./__global/SharedResourcesStore.ts";
import SharedResourcesWindow from "./SharedResources/SharedResourcesWindow.vue";
import {isPlanetWindowOpen} from "@/__global/PlanetView.ts";
import PlanetWindow from "@/PlanetWindow/PlanetWindow.vue";


document.addEventListener('DOMContentLoaded', () => {
    const userId = 140;
    const resourceSSE = new EventSource(`http://localhost:5083/api/sse/${userId}`);

    resourceSSE.onopen = function () {
        console.log('SSE подключение успешно для пользователя с айди=', userId);
    };

    resourceSSE.addEventListener('resourcesUpdate', (event) => {
        const eventData = JSON.parse(event.data);
        SharedResourcesStore.value = eventData;
        console.log('shared resources sse ', eventData);
    });

    resourceSSE.addEventListener('buildingQueueUpdate', (event) => {
        const buildingQueue = JSON.parse(event.data);
        console.log(buildingQueue);
    });

});
</script>
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.base-enter-from, .base-leave-to {
    opacity: 0;
}

.base-enter-active, .base-leave-active {
    transition: opacity 0.1s;
}
</style>
