<template>
    <div :style="{gap: !!planetBuilding ? '10px' : '0'}"
         class="pwb-card__bottom-wrapper">
        <div class="pwb-card__bottom-manager"></div>
        <div :class="{'not-full-width': !!planetBuilding}" class="pwb-card__bottom-buttons">
            <s-button class="card-button"
                      @click="handleOperation('construct')"
                      :shadow="!planetBuilding"
                      white>
                Построить
            </s-button>
            <s-button class="card-button"
                      @click="handleOperation('demolish')"
                      :shadow="!planetBuilding"
                      white>
                Сломать
            </s-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
import {useApiLazy} from "@/composables/useApi";
import {GameBuildings, GetPlanetResponseDto} from "@/_openapi/models";
import {postApiPlanetBuildingOperation} from "@/_openapi/api/planet/planet";
import {currentPlanet} from "@/__elements/planet-window/ts";
import {computed} from "vue";

const props = defineProps<{
    building: GameBuildings
}>()

const {execute} = useApiLazy<GetPlanetResponseDto>();
const planetBuilding = computed(() => currentPlanet.value?.buildings?.find(building => building.buildingType === props.building.buildingType))


async function handleOperation(action: 'construct' | 'demolish') {
    const response = await execute(postApiPlanetBuildingOperation, {
        planetId: currentPlanet.value?.id,
        buildingType: props.building.buildingType,
        actionType: action,
        count: 1
    })
    console.log('response', response)
}
</script>
<style scoped>
.pwb-card__bottom-wrapper {
    display: flex;
    flex-wrap: nowrap;
    padding: 2px;
    justify-content: space-between;
}

.pwb-card__bottom-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2px;
    width: 100%
}

.not-full-width {
    width: 65%;
}
</style>