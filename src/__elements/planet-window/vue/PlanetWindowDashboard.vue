<template>
    <div class="dashboard">
        <dashboard-planet-icon-block/>
        <s-divider/>
        <div class="flexbox dashboard__info-wrapper">
            <div class="dashboard__info-wrapper-sub">
                <div class="dashboard__info-wrapper-sub-sub">
                    <s-text class="text-700">Население</s-text>
                    <div class="dashboard__card-info tabbed">
                        <dashboard-card
                            v-for="(item, idx) in populationInfo"
                            :idx="idx"
                            :key="item.name"
                            :item="item"/>
                    </div>
                </div>
                <div class="dashboard__info-wrapper-sub-sub">
                    <s-text class="text-700">Финансы</s-text>
                    <div class="dashboard__card-info tabbed">
                        <dashboard-card
                            :idx="idx"
                            v-for="(item, idx) in moneyInfo"
                            :key="item.name"
                            :item="item"/>
                    </div>
                </div>
            </div>
            <div class="dashboard__info-wrapper-sub">
                <div class="dashboard__info-wrapper-sub-sub">
                    <s-text class="text-700">Энергия</s-text>
                    <div class="dashboard__card-info tabbed">
                        <dashboard-card
                            :idx="idx"
                            v-for="(item, idx) in energyInfo"
                            :key="item.name"
                            :item="item"/>
                    </div>
                </div>
                <div class="dashboard__info-wrapper-sub-sub">
                    <s-text class="text-700">Провиант</s-text>
                    <div class="dashboard__card-info tabbed">
                        <dashboard-card
                            :idx="idx"
                            v-for="(item, idx) in foodInfo"
                            :key="item.name"
                            :item="item"/>
                    </div>
                </div>
                <div class="dashboard__info-wrapper-sub-sub">
                    <s-text class="text-700">Склад</s-text>
                    <div class="dashboard__card-info tabbed">
                        <dashboard-card
                            :idx="idx"
                            v-for="(item, idx) in storageInfo"
                            :key="item.name"
                            :item="item"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import SText from "@/components/common/SText.vue";
import {currentPlanet} from "../ts";
import {reactive} from "vue";
import DashboardCard from "@/__elements/planet-window/vue/parts/DashboardCard.vue";
import {PlanetInfoParam} from "@/__elements/planet-window/ts/types";
import {toNum} from "@/helpers";
import SDivider from "@/components/common/SDivider.vue";
import DashboardPlanetIconBlock from "@/__elements/planet-window/vue/parts/DashboardPlanetIconBlock.vue";

const populationInfo = reactive<PlanetInfoParam[]>([
    {
        name: "рождаемость",
        value: toNum(currentPlanet.value?.citizens?.birthRate),
        type: 'number',
        useGreenTriangle: toNum(currentPlanet.value?.citizens?.birthRate) > 0,
        useRedTriangle: toNum(currentPlanet.value?.citizens?.birthRate) < 0
    },
    {
        name: "максимальный лимит",
        value: toNum(currentPlanet.value?.citizens?.maxCitizens),
        type: 'number'
    },
    {
        name: "текущее количество",
        value: toNum(currentPlanet.value?.citizens?.currentCitizens),
        type: 'number'
    },
    {
        name: "потребность в населении",
        value: toNum(currentPlanet.value?.citizens?.consuming),
        type: 'number'
    },
    {
        name: "баланс населения",
        value: toNum(currentPlanet.value?.citizens?.balance),
        type: 'number',
        usePositiveColorIndication: toNum(currentPlanet.value?.citizens?.balance) > 0,
        useNegativeColorIndication: toNum(currentPlanet.value?.citizens?.balance) < 0,
    },
])
const moneyInfo = reactive<PlanetInfoParam[]>([
    {
        name: "поступление кредитов",
        value: toNum(currentPlanet.value?.taxes?.incoming),
        type: 'number'
    },
    {
        name: "расход кредитов",
        value: toNum(currentPlanet.value?.taxes?.consuming),
        type: 'number'
    },
    {
        name: "баланс кредитов",
        value: toNum(currentPlanet.value?.taxes?.balance),
        type: 'number',
        usePositiveColorIndication: toNum(currentPlanet.value?.taxes?.balance) > 0,
        useNegativeColorIndication: toNum(currentPlanet.value?.taxes?.balance) < 0,
    },
])
const energyInfo = reactive<PlanetInfoParam[]>([
    {
        name: "генерация энергии",
        value: toNum(currentPlanet.value?.electricity?.incoming),
        type: 'number'
    },
    {
        name: "расход энергии",
        value: toNum(currentPlanet.value?.electricity?.consuming),
        type: 'number'
    },
    {
        name: "баланс энергии",
        value: toNum(currentPlanet.value?.electricity?.balance),
        type: 'number',
        usePositiveColorIndication: toNum(currentPlanet.value?.electricity?.balance) > 0,
        useNegativeColorIndication: toNum(currentPlanet.value?.electricity?.balance) < 0,
    },
])
const foodInfo = reactive<PlanetInfoParam[]>([
    {
        name: "производство продовольствия",
        value: toNum(currentPlanet.value?.food?.incoming),
        type: 'number'
    },
    {
        name: "потребление продовольствия",
        value: toNum(currentPlanet.value?.food?.consuming),
        type: 'number'
    },
    {
        name: "баланс продовольствия",
        value: toNum(currentPlanet.value?.food?.balance),
        type: 'number',
        usePositiveColorIndication: toNum(currentPlanet.value?.food?.balance) > 0,
        useNegativeColorIndication: toNum(currentPlanet.value?.food?.balance) < 0,
    },
])

const storageInfo = reactive<PlanetInfoParam[]>([
    {
        name: "вместимость склада",
        value: toNum(currentPlanet.value?.storage?.capacity?.maxCapacity),
        type: 'number'
    },
    {
        name: "текущее заполнение",
        value: toNum(currentPlanet.value?.storage?.capacity?.currentFill),
        type: 'number'
    },
    {
        name: "процент заполнения",
        value: toNum(currentPlanet.value?.storage?.capacity?.storageUsagePercent),
        type: 'number',
        useNegativeColorIndication: toNum(currentPlanet.value?.storage?.capacity?.storageUsagePercent) >= 100,
    },
])
</script>
<style scoped>
.dashboard {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    position: relative;
    margin-top: 10px;
}

.dashboard__card-info {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.dashboard__info-wrapper {
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
    padding: 0 10px 10px;
    @media screen and (min-width: 800px) {
        flex-direction: row;
    }
}

.dashboard__info-wrapper-sub {
    display: flex;
    flex-direction: column;
    gap: 10px;
    @media screen and (min-width: 800px) {
        width: 46%;
        justify-content: space-between;
    }
}

.dashboard__info-wrapper-sub-sub {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.tabbed {
    padding-left: 10px;
    @media screen and (min-width: 800px) {
        padding-left: 0;
    }
}
</style>