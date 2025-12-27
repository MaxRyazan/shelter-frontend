<template>
    <div class="buildings-wrapper">
        <buildings-sub-menu @show="changeBuildingsVisibilitySet"/>
        <s-divider/>
        <div style="flex-grow: 1; overflow: auto">
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
        <s-divider/>
        <planet-window-dashboard-short />
    </div>
</template>
<script setup lang="ts">
import BuildingsSubMenu from "@/__elements/planet-window/vue/parts/BuildingsSubMenu.vue";
import SDivider from "@/components/common/SDivider.vue";
import PlanetWindowBuildingCard from "@/__elements/planet-window/vue/PlanetWindowBuildingCard.vue";
import {_GameBuildings} from "@/__global";
import {ref} from "vue";
import PlanetWindowDashboardShort from "@/__elements/planet-window/vue/PlanetWindowDashboardShort.vue";

const menuSet = ref<Set<number>>(new Set())

function changeBuildingsVisibilitySet(p: Set<number>) {
    menuSet.value = p
}
</script>
<style scoped>
.buildings-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.buildings-list {
    display: grid;
    gap: 10px;
    padding: 10px 12px 10px 8px;

    /* 1. Мобильные: 2 колонки (по умолчанию для мобильных) */
    grid-template-columns: repeat(2, 1fr);

    /* 2. Планшеты: 3 колонки при 601px и больше */
    @media screen and (min-width: 601px) {
        grid-template-columns: repeat(3, 1fr);
    }

    /* 3. Десктоп: 4 колонки при 841px и больше */
    @media screen and (min-width: 841px) {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>