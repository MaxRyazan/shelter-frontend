<template>
    <div class="wrapper">
        <main-menu/>
        <div class="sub-wrapper">
            <the-content/>
            <the-footer/>
        </div>
        <transition name="help">
            <help-drawer/>
        </transition>
        <transition name="base" mode="out-in">
            <shared-window v-if="isSharedResourcesWindowOpen"/>
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
        <transition name="base" mode="out-in">
            <science-window
                :instance="2"
                v-if="isScienceWindowOpen"/>
        </transition>
        <transition name="base" mode="out-in">
            <settings-window v-if="isSettingsWindowOpen"/>
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
import {
    type GameBuildingsResponseDto,
    GetPlanetResponseDto,
    type UserSettings, type UserTechnologyDto,
    type UserTechnologyQueueResponseDto
} from "@/_openapi/models";
import {getApiUserGetPlanetsUserId, getApiUserGetUserSettingsUserId} from "@/_openapi/api/users/users";
import {allUserTechnologies, user, userTechQueue} from "@/__stores/user-store";
import SharedWindow from "@/__elements/shared-resources-window/vue/SharedWindow.vue";
import {authentication} from "@/__elements/authorization/ts";
import {useRouter} from "vue-router";
import {_GameBuildings} from "@/__global";
import {getApiPlanetGetAllBuildingsInfo} from "@/_openapi/api/planet/planet";
import {_SessionLogs} from "@/__elements/session-logs/session-logs";
import SettingsWindow from "@/__elements/settings-window/vue/SettingsWindow.vue";
import {_userSettings, isScienceWindowOpen, isSettingsWindowOpen} from "@/__elements/settings-window/ts";
import HelpDrawer from "@/__elements/help-drawer/vue/HelpDrawer.vue";
import ScienceWindow from "@/__elements/technology/ScienceWindow.vue";
import {getApiUserTechGetTechQueueUserId, getApiUserTechGetUserTeches} from "@/_openapi/api/user-tech/user-tech";

const {execute: getSettings} = useApiLazy<UserSettings[]>();
const {execute: fetchPlanetById} = useApiLazy<GetPlanetResponseDto[]>();
const {execute: fetchGameBuildings} = useApiLazy<GameBuildingsResponseDto>();
const {execute: fetchUserTechQueue} = useApiLazy<UserTechnologyQueueResponseDto[]>();
const {execute: fetchUserTechnologies} = useApiLazy<UserTechnologyDto[]>();
const router = useRouter()
const url = ref('')

function sse() {
    const userId = user.value?.id;
    if (!userId) return

    const resourceSSE = new EventSource(url.value);

    resourceSSE.onopen = function () {
        console.log('SSE подключение успешно для пользователя с айди=', userId);
    };

    resourceSSE.addEventListener('buildingQueueUpdate', (event) => {
        const response = JSON.parse(event.data);
        if (response) {
            console.log('buildingQueueUpdate', response);
            currentPlanet.value = response;
        }
    });

    resourceSSE.addEventListener('notifications_logs', (event) => {
        const response = JSON.parse(event.data);
        console.log(response);
        _SessionLogs.value.unshift(response);
    });

    resourceSSE.addEventListener('gameMoneyUpdater', (event) => {
        const response = JSON.parse(event.data);
        console.log('gameMoneyUpdater', response);
        if (user.value) {
            user.value.gameMoney = response.newBalance;
        }
    });

    resourceSSE.addEventListener('research_progress', (event) => {
        const response = JSON.parse(event.data);
        console.log('research_progress', response);
        userTechQueue.value = response
    });
}

async function registrationOrAuthorization() {
    // TODO УДАЛИТЬ !

    // const nickName = `TestUser`;
    const email = `max22.com`;
    const password = `password11`;
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

    const settings = await getSettings(getApiUserGetUserSettingsUserId, user.value?.id)
    if (settings) {
        _userSettings.value = settings[0];
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

    const techQueue = await fetchUserTechQueue(getApiUserTechGetTechQueueUserId, user.value?.id)
    if (techQueue) {
        userTechQueue.value = techQueue
    }

    const teches = await fetchUserTechnologies(getApiUserTechGetUserTeches)
    if (teches) {
        allUserTechnologies.value = teches
    }
    sse()
})
</script>
<style scoped>
.wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    @media screen and (max-width: 600px) {
        flex-direction: row;
        flex-wrap: nowrap;
    }
}

.sub-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.help-enter-from, .help-leave-to {
    transform: translateX(110%);
}

.help-enter-active, .help-leave-active {
    transition: .2s;
}
</style>