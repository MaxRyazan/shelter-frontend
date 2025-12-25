<template>
    <div class="buildings-sub-menu">
        <sub-menu style="flex-grow: 1" :list="firstRow" @show="(p: Set<number>) => menuSet = p"/>
        <sub-menu style="flex-grow: 1" :list="secondRow" @show="(p: Set<number>) => menuSet = p"/>
    </div>
</template>
<script setup lang="ts">
import SubMenu from "@/__elements/planet-window/vue/SubMenu.vue";
import {ref, shallowRef} from "vue";
import {SubTabsBuildings} from "@/__elements/planet-window/ts";
import {TopSubMenuType} from "@/__elements/planet-window/ts/types";


let menuSet = ref(new Set())

const firstRow = shallowRef<TopSubMenuType[]>([
    {
        id: 0,
        text: SubTabsBuildings.common,
    },
    {
        id: 1,
        text: SubTabsBuildings.defence,
    },
    {
        id: 2,
        text: SubTabsBuildings.energy,
    },
])
const secondRow = shallowRef([
    {
        id: 3,
        text: SubTabsBuildings.mines,
    },
    {
        id: 4,
        text: SubTabsBuildings.factories,
    },
    {
        id: 5,
        text: SubTabsBuildings.complexes,
    },
    {
        id: 6,
        text: SubTabsBuildings.food,
    },
])
</script>
<style scoped>
.buildings-sub-menu {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 601px) {
        flex-direction: row;
        gap: 0;
        justify-content: space-between;
    }
}
</style>