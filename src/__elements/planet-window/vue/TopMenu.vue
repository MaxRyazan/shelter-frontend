<template>
    <ul class="menu-list">
        <li v-for="(item, index) in list" :key="index"
            @click="currentActive = item"
            class="menu-list__item">
            <s-text
                style="opacity: .3"
                :class="{'active-menu-item' : currentActive === item}"
                v-if="width > 600">
                {{ item.text }}
            </s-text>
            <common-icon :active="currentActive === item" v-else :name="item.icon"/>
        </li>
    </ul>
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
.menu-list {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin: 0;
    list-style-type: none;
    width: 100%;
    padding: 10px 8px;
    background-color: #0d1117;
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