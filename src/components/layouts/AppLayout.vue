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
import {onMounted} from "vue";
import {useApiLazy} from "@/composables/useApi";
import {GetPlanetResponseDto} from "@/_openapi/models";
import {getApiUserGetPlanetsUserId, postApiUserCreate} from "@/_openapi/api/users/users";
import {user} from "@/__stores/user-store";
import {SharedResourcesStore} from "@/__elements/shared-resources-window/ts";
import SharedResourcesWindow from "@/__elements/shared-resources-window/vue/SharedResourcesWindow.vue";
import {authentication} from "@/__elements/authorization/ts";
import {useRouter} from "vue-router";

const {execute} = useApiLazy<GetPlanetResponseDto[]>();
const router = useRouter()

function sse() {
    const userId = user.value?.id;
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
}

async function registration() {
    // TODO УДАЛИТЬ !
    const nickName = `login_${Math.random()}`;
    const email = `email_${Math.random()}`;
    const password = `password_${Math.random()}`;
    try {
        const response = await postApiUserCreate({
            nickName,
            email,
            password
        });
        if (response) {
            await authentication({email, password})
            if (user.value?.id) {
                await router.push('/')
            }
        }
    } catch (e) {
    } finally {
    }
}

onMounted(async () => {
    await registration()
    allPlanets.value = await execute(getApiUserGetPlanetsUserId, user.value?.id)
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