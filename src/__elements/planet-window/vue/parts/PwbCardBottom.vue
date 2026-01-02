<template>
    <div :style="{gap: !!planetBuilding ? '10px' : '0'}"
         class="pwb-card__bottom-wrapper">
        <div class="pwb-card__bottom-buttons">
            <div class="pwb-card__bottom-button-wrapper">
                <s-input
                    type="number"
                    text-align="center"
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
                         :readonly="!planetBuilding"
                         text-align="center"
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
import {Toast} from "@/__elements/toast/SToast";
import {Dictionary} from "@/dictionaries";
import {v4} from "uuid";
import {user} from "@/__stores/user-store";

const props = defineProps<{
    building: GameBuildings
}>()

const {execute, error} = useApiLazy<GetPlanetResponseDto>();
const planetBuilding = computed(() => currentPlanet.value?.buildings?.find(building => building.buildingType === props.building.buildingType))

const constructCount = ref(1)
const demolishCount = ref()

async function handleOperation(action: 'construct' | 'demolish') {
    if (action === 'demolish') {
        if (!planetBuilding.value || !props.building) return
        if (!demolishCount.value) {
            Toast.info('Сколько ломать?')
            return
        }
    }
    const count = action === 'construct' ? constructCount.value : demolishCount.value;
    const message = `${action === 'demolish' ? 'ломаем' : 'строим'} ${count} ${Dictionary.get(props.building.buildingType)}`
    const response = await execute(postApiPlanetBuildingOperation, {
        planetId: currentPlanet.value?.id,
        userId: user.value?.id,
        buildingType: props.building.buildingType,
        actionType: action,
        count: count,
        operationId: v4()
    })
    if (response) {
        currentPlanet.value = response;
        Toast.success(message)
    } else {
        Toast.info(error.value?.detail)
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