<template>
    <div class="buildings-wrapper">
        <buildings-sub-menu @show="changeBuildingsVisibilitySet"/>
        <s-divider/>
        <div class="buildings-list">
            <!-- Common -->
            <template v-if="menuSet.has(0)">
                <planet-window-building-card
                    v-for="building in _GameBuildings.common"
                    :key="building.buildingType"
                    :building="building"/>
            </template>

            <!-- Food -->
            <template v-if="menuSet.has(1)">
                <planet-window-building-card
                    v-for="building in _GameBuildings.food"
                    :key="building.buildingType"
                    :building="building"/>
            </template>

            <!-- Energy -->
            <template v-if="menuSet.has(2)">
                <planet-window-building-card
                    v-for="building in _GameBuildings.energy"
                    :key="building.buildingType"
                    :building="building"/>
            </template>

            <!-- Mine -->
            <template v-if="menuSet.has(3)">
                <planet-window-building-card
                    v-for="building in _GameBuildings.mine"
                    :key="building.buildingType"
                    :building="building"/>
            </template>

            <!-- Factory -->
            <template v-if="menuSet.has(4)">
                <planet-window-building-card
                    v-for="building in _GameBuildings.factory"
                    :key="building.buildingType"
                    :building="building"/>
            </template>

            <!-- Complex -->
            <template v-if="menuSet.has(5)">
                <planet-window-building-card
                    v-for="building in _GameBuildings.complex"
                    :key="building.buildingType"
                    :building="building"/>
            </template>

            <!-- Industrial -->
            <template v-if="menuSet.has(6)">
                <planet-window-building-card
                    v-for="building in _GameBuildings.industrial"
                    :key="building.buildingType"
                    :building="building"/>
            </template>

        </div>
    </div>
</template>
<script setup lang="ts">
import BuildingsSubMenu from "@/__elements/planet-window/vue/parts/BuildingsSubMenu.vue";
import SDivider from "@/components/common/SDivider.vue";
import PlanetWindowBuildingCard from "@/__elements/planet-window/vue/PlanetWindowBuildingCard.vue";
import {_GameBuildings} from "@/__global";
import {ref} from "vue";

const menuSet = ref<Set<number>>(new Set())

function changeBuildingsVisibilitySet(p: Set<number>) {
    console.log('emits show ', p)
    menuSet.value = p
}
</script>
<style scoped>
.buildings-wrapper {
    display: flex;
    flex-direction: column;
}

.buildings-list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: start;
}
</style>