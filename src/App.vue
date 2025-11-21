<template>
    <div class="wrapper">
        <main-menu/>
        <the-content/>
        <the-footer/>
        <transition name="base" mode="out-in">
            <shared-resources-window v-if="isSharedResourcesWindowOpen"/>
        </transition>
        <transition name="base" mode="out-in">
            <planet-window v-if="isPlanetWindowOpen"/>
        </transition>
        <transition name="base">
            <list-of-planets v-if="isPlanetChoserOpen"/>
        </transition>
    </div>
</template>
<script setup lang="ts">
import MainMenu from "./components/MainMenu.vue";
import TheContent from "./components/TheContent.vue";
import TheFooter from "./components/TheFooter.vue";
import {isSharedResourcesWindowOpen, SharedResourcesStore} from "./__global/SharedResourcesStore";
import SharedResourcesWindow from "./SharedResources/SharedResourcesWindow.vue";
import {allPlanets, currentPlanet, isPlanetChoserOpen, isPlanetWindowOpen} from "@/__global/PlanetView";
import PlanetWindow from "@/PlanetWindow/PlanetWindow.vue";
import {onMounted} from "vue";
import {useApiLazy} from "@/composables/useApi";
import {GetPlanetResponseDto} from "@/_openapi/models";
import {getApiUserGetPlanetsUserId} from "@/_openapi/api/users/users";
import ListOfPlanets from "@/components/modals/ListOfPlanets.vue";

const {execute} = useApiLazy<GetPlanetResponseDto[]>();

onMounted(async () => {
    allPlanets.value = await execute(getApiUserGetPlanetsUserId, 140)
    if (allPlanets.value?.length) {
        currentPlanet.value = allPlanets.value?.find(planet => planet.isHomePlanet)
    }
})

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
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    @media screen and (max-width: 600px) {
        flex-direction: row;
        flex-wrap: nowrap;
        padding-bottom: 22px;
    }
}
</style>
