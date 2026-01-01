<template>
    <div class="wrapper">
        <main-menu/>
        <the-content/>
        <the-footer/>
        <transition name="base" mode="out-in">
            <shared-resources-window v-if="isSharedResourcesWindowOpen"/>
        </transition>
        <transition name="base" mode="out-in">
            <planet-window
                :instance="1"
                v-if="planetWindowsInstances.instanceOneOpen"/>
        </transition>
        <transition name="base" mode="out-in">
            <planet-window
                :instance="2"
                v-if="planetWindowsInstances.instanceTwoOpen"/>
        </transition>
    </div>
</template>
<script setup lang="ts">
import MainMenu from "@/components/MainMenu.vue";
import TheContent from "@/components/TheContent.vue";
import TheFooter from "@/components/TheFooter.vue";
import {isSharedResourcesWindowOpen} from "@/__stores/shared-resources-store";
import {allPlanets, currentPlanet, planetWindowsInstances} from "@/__elements/planet-window/ts";
import PlanetWindow from "@/__elements/planet-window/vue/PlanetWindow.vue";
import {onMounted, ref} from "vue";
import {useApiLazy} from "@/composables/useApi";
import {type GameBuildingsResponseDto, GetPlanetResponseDto} from "@/_openapi/models";
import {getApiUserGetPlanetsUserId} from "@/_openapi/api/users/users";
import {user} from "@/__stores/user-store";
import {SharedResourcesStore} from "@/__elements/shared-resources-window/ts";
import SharedResourcesWindow from "@/__elements/shared-resources-window/vue/SharedResourcesWindow.vue";
import {authentication} from "@/__elements/authorization/ts";
import {useRouter} from "vue-router";
import {_GameBuildings} from "@/__global";
import {getApiPlanetGetAllBuildingsInfo} from "@/_openapi/api/planet/planet";

const {execute: fetchPlanetById} = useApiLazy<GetPlanetResponseDto[]>();
const {execute: fetchGameBuildings} = useApiLazy<GameBuildingsResponseDto>();
const router = useRouter()
const url = ref('')

function sse() {
    const userId = user.value?.id;
    if (!userId) return

    const resourceSSE = new EventSource(url.value);

    resourceSSE.onopen = function () {
        console.log('SSE подключение успешно для пользователя с айди=', userId);
    };

    resourceSSE.addEventListener('resourcesUpdate', (event) => {
        const eventData = JSON.parse(event.data);
        SharedResourcesStore.value = eventData;
        console.log('shared resources sse ', eventData);
    });

    resourceSSE.addEventListener('buildingQueueUpdate', (event) => {
        const response = JSON.parse(event.data);
        if (response) {
            currentPlanet.value = response;
        }
    });
}

async function registrationOrAuthorization() {
    // TODO УДАЛИТЬ !

    // const nickName = `TestUser`;
    const email = `test@testuser.com`;
    const password = `testpassword`;
    try {
        // const response = await postApiUserCreate({
        //     nickName,
        //     email,
        //     password
        // });
        // if (response) {
        await authentication({email, password})
        if (user.value?.id) {
            await router.push('/')
        }
        // }
    } catch (e) {
    } finally {
    }
}

onMounted(async () => {
    if (import.meta.env.DEV) {
        console.log('Режим разработки');
        await registrationOrAuthorization()
        url.value = `http://localhost:5083/api/sse/${user.value?.id}`
    } else {
        url.value = `/api/sse/${user.value?.id}`
    }
    const response = await fetchGameBuildings(getApiPlanetGetAllBuildingsInfo)
    if (response) {
        _GameBuildings.value = response;
    } else {
        console.error('Cannot fetch game buildings')
    }
    allPlanets.value = await fetchPlanetById(getApiUserGetPlanetsUserId, user.value?.id)
    if (allPlanets.value?.length) {
        currentPlanet.value = allPlanets.value?.find(planet => planet.isHomePlanet)
    }
    sse()
})
</script>
<style scoped>
.wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    @media screen and (max-width: 600px) {
        flex-direction: row;
        flex-wrap: nowrap;
        padding-bottom: 22px;
    }
}
</style>