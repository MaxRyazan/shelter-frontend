<template>
    <div class="dashboard__planet-icon-block">
        <div style="background-color: black; border-radius: 6px">
            <img class="dashboard__image" src="/image/common/planet1.webp" alt="planet icon">
        </div>
        <div class="dashboard__image-info">
            <dashboard-card
                v-for="item in params"
                :key="item.name"
                :item="item"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import DashboardCard from "@/__elements/planet-window/vue/parts/DashboardCard.vue";
import {PlanetInfoParam} from "@/__elements/planet-window/ts/types";

defineProps<{
    params: PlanetInfoParam[]
}>()
</script>
<style scoped>
.dashboard__planet-icon-block {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 0 10px;
}

.dashboard__image {
    width: 150px;
    height: 150px;
}

.dashboard__image-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>