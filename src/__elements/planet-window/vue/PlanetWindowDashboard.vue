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
import {$rs, toNum} from "@/helpers";
import SDivider from "@/components/common/SDivider.vue";
import DashboardPlanetIconBlock from "@/__elements/planet-window/vue/parts/DashboardPlanetIconBlock.vue";

const populationInfo = reactive<PlanetInfoParam[]>([
    {
        name: "рождаемость",
        value: $rs(toNum(currentPlanet.value?.citizens?.birthRate), 3),
        type: 'number',
        useGreenTriangle: toNum(currentPlanet.value?.citizens?.birthRate) > 0,
        useRedTriangle: toNum(currentPlanet.value?.citizens?.birthRate) < 0
    },
    {
        name: "максимальный лимит",
        value: $rs(toNum(currentPlanet.value?.citizens?.maxCitizens), 3),
        type: 'number'
    },
    {
        name: "текущее количество",
        value: $rs(toNum(currentPlanet.value?.citizens?.currentCitizens), 3),
        type: 'number'
    },
    {
        name: "потребность в населении",
        value: $rs(toNum(currentPlanet.value?.citizens?.consuming), 3),
        type: 'number'
    },
    {
        name: "баланс населения",
        value: $rs(toNum(currentPlanet.value?.citizens?.balance), 3),
        type: 'number',
        usePositiveColorIndication: toNum(currentPlanet.value?.citizens?.balance) > 0,
        useNegativeColorIndication: toNum(currentPlanet.value?.citizens?.balance) < 0,
    },
])
const moneyInfo = reactive<PlanetInfoParam[]>([
    {
        name: "поступление кредитов",
        value: $rs(toNum(currentPlanet.value?.taxes?.incoming), 3),
        type: 'number'
    },
    {
        name: "расход кредитов",
        value: $rs(toNum(currentPlanet.value?.taxes?.consuming), 3),
        type: 'number'
    },
    {
        name: "баланс кредитов",
        value: $rs(toNum(currentPlanet.value?.taxes?.balance), 3),
        type: 'number',
        usePositiveColorIndication: toNum(currentPlanet.value?.taxes?.balance) > 0,
        useNegativeColorIndication: toNum(currentPlanet.value?.taxes?.balance) < 0,
    },
])
const energyInfo = reactive<PlanetInfoParam[]>([
    {
        name: "генерация энергии",
        value: $rs(toNum(currentPlanet.value?.electricity?.incoming), 3),
        type: 'number'
    },
    {
        name: "расход энергии",
        value: $rs(toNum(currentPlanet.value?.electricity?.consuming), 3),
        type: 'number'
    },
    {
        name: "баланс энергии",
        value: $rs(toNum(currentPlanet.value?.electricity?.balance), 3),
        type: 'number',
        usePositiveColorIndication: toNum(currentPlanet.value?.electricity?.balance) > 0,
        useNegativeColorIndication: toNum(currentPlanet.value?.electricity?.balance) < 0,
    },
])
const foodInfo = reactive<PlanetInfoParam[]>([
    {
        name: "производство продовольствия",
        value: $rs(toNum(currentPlanet.value?.food?.incoming), 3),
        type: 'number'
    },
    {
        name: "потребление продовольствия",
        value: $rs(toNum(currentPlanet.value?.food?.consuming), 3),
        type: 'number'
    },
    {
        name: "баланс продовольствия",
        value: $rs(toNum(currentPlanet.value?.food?.balance), 3),
        type: 'number',
        usePositiveColorIndication: toNum(currentPlanet.value?.food?.balance) > 0,
        useNegativeColorIndication: toNum(currentPlanet.value?.food?.balance) < 0,
    },
])

const storageInfo = reactive<PlanetInfoParam[]>([
    {
        name: "вместимость склада",
        value: $rs(toNum(currentPlanet.value?.storage?.capacity?.maxCapacity), 3),
        type: 'number'
    },
    {
        name: "текущее заполнение",
        value: $rs(toNum(currentPlanet.value?.storage?.capacity?.currentFill), 3),
        type: 'number'
    },
    {
        name: "процент заполнения",
        value: $rs(toNum(currentPlanet.value?.storage?.capacity?.storageUsagePercent), 3),
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
    height: calc(100% - 10px);
    position: relative;
    padding-top: 10px;
}

.dashboard__card-info {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.dashboard__info-wrapper {
    flex-direction: column;
    overflow-y: auto;
    gap: 10px;
    height: 100%;
    padding: 0 14px 10px;
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
    }
}

.dashboard__info-wrapper-sub-sub {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid var(--prime-light03);
    padding: 10px;
    border-radius: 4px;
}

.tabbed {
    padding-left: 10px;
    @media screen and (min-width: 800px) {
        padding-left: 0;
    }
}
</style>