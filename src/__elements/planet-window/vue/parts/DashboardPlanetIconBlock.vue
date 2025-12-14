<template>
    <div class="dashboard__planet-icon-block">
        <div style="background-color: black; border-radius: 6px">
            <img class="dashboard__image" src="/image/common/planet1.webp" alt="planet icon">
        </div>
        <div class="dashboard__image-info">
            <dashboard-card
                v-for="item in params"
                :key="item.name"
                :item="item"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import DashboardCard from "@/__elements/planet-window/vue/parts/DashboardCard.vue";
import {PlanetInfoParam} from "@/__elements/planet-window/ts/types";
import {reactive} from "vue";
import {currentPlanet} from "@/__elements/planet-window/ts";

const params = reactive<PlanetInfoParam[]>([
    {
        name: "Название",
        value: currentPlanet.value?.name,
        type: 'string'
    },
    {
        name: "Атмосфера",
        value: currentPlanet.value?.hasAtmosphere ? 'есть' : 'нет',
        type: 'boolean'
    },
    {
        name: "Магнитное поле",
        value: currentPlanet.value?.hasMagneticField ? 'есть' : 'нет',
        type: 'boolean'
    },
    {
        name: "Средняя температура",
        value: currentPlanet.value?.averageTemperature,
        type: 'string'
    },
    {
        name: "Доступная площадь застройки",
        value: `${currentPlanet.value?.freeSquare}/${currentPlanet.value?.square}`,
        type: 'string'
    },
    {
        name: "Гравитационная постоянная",
        value: `${currentPlanet.value?.gravityPower}`,
        type: 'number'
    },
])
</script>
<style scoped>
.dashboard__planet-icon-block {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 0 10px;
}

.dashboard__image {
    width: 150px;
    height: 150px;
}

.dashboard__image-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>