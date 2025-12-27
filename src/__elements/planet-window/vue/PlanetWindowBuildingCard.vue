<template>
<div :class="{'building-exist' : planetBuilding}" class="pwb-card">
    <pwb-card-top :building="building" />
    <s-divider />
    <pwb-card-bottom :building="building" />
</div>
</template>
<script setup lang="ts">
import SDivider from "@/components/common/SDivider.vue";
import PwbCardTop from "@/__elements/planet-window/vue/parts/PwbCardTop.vue";
import PwbCardBottom from "@/__elements/planet-window/vue/parts/PwbCardBottom.vue";
import {GameBuildings} from "@/_openapi/models";
import {computed} from "vue";
import {currentPlanet} from "@/__elements/planet-window/ts";

const props = defineProps<{
    building: GameBuildings
}>()

const planetBuilding = computed(() => currentPlanet.value?.buildings?.find(building => building.buildingType === props.building.buildingType))

</script>
<style scoped>
.pwb-card {
    border: 1px solid var(--prime-light03);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.building-exist {
    border: 1px solid var(--prime-light) !important;
}
</style>