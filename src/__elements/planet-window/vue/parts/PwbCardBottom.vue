<template>
    <div :style="{gap: !!planetBuilding ? '10px' : '0'}"
         class="pwb-card__bottom-wrapper">
        <div class="pwb-card__bottom-buttons">
            <div class="pwb-card__bottom-button-wrapper">
                <s-input
                    type="number"
                    white
                    style="margin: 0; width: 60px"
                    v-model="constructCount"/>
                <s-button class="card-button"
                          @click="handleOperation('construct')"
                          white>
                    Построить
                </s-button>
            </div>
            <div class="pwb-card__bottom-button-wrapper">
                <s-input :shadow="!planetBuilding"
                         type="number"
                         white
                         style="margin: 0; width: 60px"
                         v-model="demolishCount"/>
                <s-button class="card-button"
                          @click="handleOperation('demolish')"
                          :shadow="!planetBuilding"
                          white>
                    Сломать
                </s-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
import {useApiLazy} from "@/composables/useApi";
import {GameBuildings, GetPlanetResponseDto} from "@/_openapi/models";
import {postApiPlanetBuildingOperation} from "@/_openapi/api/planet/planet";
import {currentPlanet} from "@/__elements/planet-window/ts";
import {computed, ref} from "vue";
import SInput from "@/components/inputs/SInput.vue";

const props = defineProps<{
    building: GameBuildings
}>()

const {execute} = useApiLazy<GetPlanetResponseDto>();
const planetBuilding = computed(() => currentPlanet.value?.buildings?.find(building => building.buildingType === props.building.buildingType))

const constructCount = ref(1)
const demolishCount = ref()

async function handleOperation(action: 'construct' | 'demolish') {
    if (action === 'demolish') {
        if (!planetBuilding.value || !props.building) return
        if (planetBuilding.value.count < demolishCount.value) return
    }
    const response = await execute(postApiPlanetBuildingOperation, {
        planetId: currentPlanet.value?.id,
        buildingType: props.building.buildingType,
        actionType: action,
        count: action === 'construct' ? constructCount.value : demolishCount.value,
    })
    if (response) {
        currentPlanet.value = response;
    }
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

.pwb-card__bottom-button-wrapper {
    display: flex;
    gap: 4px;
    width: 100%;
}

:deep(.accent-input) {
    text-align: center;
    font-family: IBM_Plex_Mono, monospace;
    font-size: 14px !important;
}

.card-button {
    flex-grow: 1;
}
</style>