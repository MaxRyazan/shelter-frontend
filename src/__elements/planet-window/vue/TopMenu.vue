<template>
    <div class="top-menu">
        <ul class="menu-list">
            <li v-for="(item, index) in list" :key="index"
                @click="currentActive = item"
                class="menu-list__item">
                <s-text
                    :class="{'active-top-menu' : currentActive === item}"
                    v-if="width > 600">
                    {{ item.text }}
                </s-text>
                <common-icon :active="currentActive === item" v-else :name="item.icon"/>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import SText from "@/components/common/SText.vue";
import CommonIcon from "@/components/icons/CommonIcon.vue";
import {useWindowSize} from '@vueuse/core';
import {shallowRef, watch} from "vue";
import {Tabs} from "@/__elements/planet-window/ts";
import PlanetWindowDashboard from "@/__elements/planet-window/vue/PlanetWindowDashboard.vue";
import PlanetWindowStorage from "@/__elements/planet-window/vue/PlanetWindowStorage.vue";
import PlanetWindowBuildings from "@/__elements/planet-window/vue/PlanetWindowBuildings.vue";
import PlanetWindowBuildingsQueue from "@/__elements/planet-window/vue/PlanetWindowBuildingsQueue.vue";
import PlanetWindowProductions from "@/__elements/planet-window/vue/PlanetWindowProductions.vue";
import PlanetWindowDefence from "@/__elements/planet-window/vue/PlanetWindowDefence.vue";
import {TopMenuType} from "@/__elements/planet-window/ts/types";

const emits = defineEmits<{
    (e: 'view-tab', p: TopMenuType): void
}>()

const {width} = useWindowSize()
const list: TopMenuType[] = [
    {
        text: Tabs.view,
        icon: 'view-icon.webp',
        component: PlanetWindowDashboard
    },
    {
        text: Tabs.storage,
        icon: 'storage-icon.webp',
        component: PlanetWindowStorage
    },
    {
        text: Tabs.buildings,
        icon: 'buildings-icon.webp',
        component: PlanetWindowBuildings
    },
    {
        text: Tabs.buildings_queue,
        icon: 'buildings-queue-icon.webp',
        component: PlanetWindowBuildingsQueue
    },
    {
        text: Tabs.production,
        icon: 'planet-icon.webp',
        component: PlanetWindowProductions
    },
    {
        text: Tabs.defence,
        icon: 'planet-icon.webp',
        component: PlanetWindowDefence
    },
]

const currentActive = shallowRef<TopMenuType>(list[0])

watch(currentActive, () => {
    emits('view-tab', currentActive.value)
}, {immediate: true})

</script>
<style scoped>
.top-menu {
    width: 100%;
    padding: 10px 0;
    background-color: black;
}

.active-top-menu {
    color: var(--accent);
}

.menu-list {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin: 0;
    padding: 0 8px;
    list-style-type: none;
}

.menu-list__item {
    cursor: pointer;
    margin: 0;
    font-family: IBM_Plex_Mono sans-serif;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
}
</style>