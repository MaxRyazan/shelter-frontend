<template>
    <div class="buildings-queue-wrapper">
        <div style="flex-grow: 1; overflow: auto">
            <div class="buildings-queue-list">
                <building-queue-card
                    v-for="(item, idx) in currentPlanet?.buildingQueue"
                    :key="idx + '-' + item.id + '-' + item.createdAt"
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
</script>
<style scoped>
.buildings-queue-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 10px 12px 10px 8px;
}

.buildings-queue-list {
    display: grid;
    gap: 10px;
    grid-template-columns: 100%;
}
</style>