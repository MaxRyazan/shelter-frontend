<template>
    <div class="queue-item">
        <div class="queue-item__left">
            <img class="queue-item__img" src="/image/buildings/LimestoneMine.png" alt=""/>
            <div class="queue-item__name">{{ Dictionary.get(item.buildingType) }}</div>
        </div>
        <div class="queue-item__right" style="justify-content: end">
            <info-block style="white-space: nowrap">{{dayjs(item.readyAt).format('DD.MM HH:mm') }}</info-block>
            <info-block style="white-space: nowrap">{{item.count}} шт.</info-block>
            <red-cross @click="removeFromQueue"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import {BuildingQueue, GetPlanetResponseDto} from "@/_openapi/models";
import {Dictionary} from "@/dictionaries";
import dayjs from "dayjs";
import RedCross from "@/components/icons/RedCross.vue";
import {useApiLazy} from "@/composables/useApi";
import {postApiPlanetBuildingOperationRemoveFromQueue} from "@/_openapi/api/planet/planet";
import {currentPlanet} from "@/__elements/planet-window/ts";
import {Toast} from "@/__elements/toast/SToast";
import InfoBlock from "@/components/common/InfoBlock.vue";

const props = defineProps<{
    item: BuildingQueue
}>()

const {execute, error} = useApiLazy<GetPlanetResponseDto>();

async function removeFromQueue() {
    const response = await execute(postApiPlanetBuildingOperationRemoveFromQueue, {
        planetId: currentPlanet.value?.id,
        buildingType: props.item.buildingType,
        amount: props.item.count,
        createdAt: props.item.createdAt
    })
    if (response) {
        currentPlanet.value = response;
        const message = `Убрано из очереди ${props.item.count} ${Dictionary.get(props.item.buildingType)}`
        Toast.success(message)
    } else {
        Toast.error(error.value?.detail)
    }
}
</script>
<style scoped>
.queue-item {
    border: 1px solid var(--prime-light);
    border-radius: 4px;
    padding: 8px 8px 8px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    position: relative;
    width: 100%;
}

.queue-item__left,
.queue-item__right {
    flex-wrap: nowrap;
    display: flex;
    gap: 4px;
    align-items: center;
    width: 48%;
}
.queue-item__img {
    height: 45px;
}
.queue-item__name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: IBM_Plex_Mono, monospace;
}
.queue-item__time {
    white-space: nowrap;
}
</style>