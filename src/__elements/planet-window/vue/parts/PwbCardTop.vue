<template>
    <div class="pwb-card__top-wrapper">
        <div :class="{'title-exist' : !!planetBuilding}"
             class="pwb-card__top-title">
            {{ Dictionary.get(building.buildingType) }}
        </div>
        <div v-if="!!planetBuilding"
             class="pwb-card__top-content">
            <div class="pwb-card__top-info">
                <info-block>{{ planetBuilding.count }} шт.</info-block>
                <info-block>{{ dayjs(planetBuilding.nextProductionTime).format('HH:mm') }}</info-block>
                <info-block>{{ planetBuilding.efficiency * 100 }}%</info-block>
            </div>
            <div class="pwb-card__top-image">
                <img src="/image/buildings/LimestoneMine.png"
                     :alt="building.buildingType">
            </div>
        </div>
        <div style="padding-top: 6px;" v-else>
            <img src="/image/buildings/LimestoneMine.png"
                 :alt="building.buildingType">
        </div>
    </div>
</template>
<script setup lang="ts">
import {GameBuildings} from "@/_openapi/models";
import {Dictionary} from "@/dictionaries";
import {currentPlanet} from "@/__elements/planet-window/ts";
import {computed} from "vue";
import InfoBlock from "@/components/common/InfoBlock.vue";
import dayjs from "dayjs";

const props = defineProps<{
    building: GameBuildings
}>()

const planetBuilding = computed(() => currentPlanet.value?.buildings?.find(building => building.buildingType === props.building.buildingType))

</script>
<style scoped>
.pwb-card__top-wrapper {
    padding: 2px;
}

.pwb-card__top-title {
    text-align: center;
    font-family: IBM_Plex_Mono, monospace;
    font-weight: bolder;
    opacity: .3;
}

.title-exist {
    opacity: 1;
}

.pwb-card__top-content {
    padding-top: 6px;
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
    justify-content: space-between;
}

.pwb-card__top-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.pwb-card__top-image {
    width: 92px;
    height: 80px;
}
</style>