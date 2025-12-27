<template>
<div class="pwb-card">
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


defineProps<{
    building: GameBuildings
}>()
</script>
<style scoped>
.pwb-card {
    border: 1px solid var(--prime-light);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>