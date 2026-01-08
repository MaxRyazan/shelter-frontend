<template>
    <div class="pwb-card__top-wrapper">
        <div class="pwb-card__top-title-wrapper">
            <s-text @click="showHelp"
                    class="pwb-card__top-title-help">?
            </s-text>
            <s-text
                :class="{'title-exist' : !!planetBuilding}"
                class="pwb-card__top-title">
                {{ Dictionary.get(building.buildingType) }}
            </s-text>
        </div>
        <div v-if="!!planetBuilding"
             class="pwb-card__top-content">
            <div class="pwb-card__top-info">
                <info-block>{{ planetBuilding.count }} шт.</info-block>
                <info-block>{{ dayjs(planetBuilding.nextProductionTime).format('HH:mm') }}</info-block>
                <s-dropdown @click="changeEfficiency">
                    {{ planetBuilding.maxEfficiency * 100 }}%
                </s-dropdown>
            </div>
            <div class="pwb-card__top-image">
                <img src="/image/buildings/LimestoneMine.png"
                     :alt="building.buildingType">
            </div>
        </div>
        <div style="padding-top: 6px; display: flex; justify-content: end" v-else>
            <img src="/image/buildings/LimestoneMine.png"
                 :alt="building.buildingType">
        </div>
    </div>
</template>
<script setup lang="ts">
import {GameBuildings, GetPlanetResponseDto} from "@/_openapi/models";
import {Dictionary} from "@/dictionaries";
import {currentPlanet} from "@/__elements/planet-window/ts";
import {computed} from "vue";
import InfoBlock from "@/components/common/InfoBlock.vue";
import dayjs from "dayjs";
import SDropdown from "@/components/inputs/SDropdown.vue";
import {useApiLazy} from "@/composables/useApi";
import {postApiPlanetChangeBuildingEfficiency} from "@/_openapi/api/planet/planet";
import {Toast} from "@/__elements/toast/SToast";
import SText from "@/components/common/SText.vue";
import {showHelpAbout} from "@/__elements/help-drawer/ts";

const props = defineProps<{
    building: GameBuildings
}>()
const {execute, error} = useApiLazy<GetPlanetResponseDto>();
const planetBuilding = computed(() => currentPlanet.value?.buildings?.find(building => building.buildingType === props.building.buildingType))

function showHelp() {
    showHelpAbout.value = {type: 'building', subject:  props.building}
}

async function changeEfficiency(arg: string | number) {
    const response = await execute(postApiPlanetChangeBuildingEfficiency, {
        planetId: currentPlanet.value?.id,
        buildingType: props.building.buildingType,
        efficiency: arg.toString().replace('%', '')
    })
    if (response) {
        currentPlanet.value = response
        Toast.success(`Эффективность ${Dictionary.get(props.building.buildingType)} ${arg}`)
    } else {
        Toast.info(error.value?.detail)
    }
}
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

.pwb-card__top-title-wrapper {
    display: flex;
    gap: 4px;
    justify-content: center;
}

.pwb-card__top-title-help {
    border-radius: 50%;
    border: 1px solid var(--prime-light03);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>