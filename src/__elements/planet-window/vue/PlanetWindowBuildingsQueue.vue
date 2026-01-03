<template>
    <div class="buildings-queue-wrapper">
        <div style="flex-grow: 1; overflow: auto; padding: 10px 12px 10px 10px;">
            <div class="buildings-queue-list">
                <building-queue-card
                    v-for="(item, idx) in queue"
                    :key="idx + '-' + dayjs(item.createdAt).valueOf()"
                    :item="item"
                    :data-item-id="item.id"/>
            </div>
        </div>
        <s-divider/>
        <planet-window-dashboard-short/>
    </div>
</template>
<script setup lang="ts">
import {currentPlanet} from "../ts";
import PlanetWindowDashboardShort from "@/__elements/planet-window/vue/PlanetWindowDashboardShort.vue";
import SDivider from "@/components/common/SDivider.vue";
import BuildingQueueCard from "@/__elements/planet-window/vue/BuildingQueueCard.vue";
import {computed} from "vue";
import dayjs from "dayjs";

const queue = computed(() => {
    if (currentPlanet.value?.buildingQueue?.length) {
        return currentPlanet.value?.buildingQueue.toSorted((a, b) => {
            return dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf();
        })
    } else return []
})
</script>
<style scoped>
.buildings-queue-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
}

.buildings-queue-list {
    display: grid;
    gap: 10px;
    grid-template-columns: 100%;
}
</style>