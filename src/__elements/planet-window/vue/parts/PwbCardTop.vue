<template>
    <div class="pwb-card__top-wrapper">
        <div class="pwb-card__top-title">
            {{Dictionary.get(building.buildingType)}}
        </div>
        <div class="pwb-card__top-content">
            <div class="pwb-card__top-info">
                <div class="pwb-card__top-info-count"></div>
                <div class="pwb-card__top-info-percent"></div>
            </div>
            <div class="pwb-card__top-image"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {GameBuildings} from "@/_openapi/models";
import {Dictionary} from "@/dictionaries";

defineProps<{
    building: GameBuildings
}>()
</script>
<style scoped>
.pwb-card__top-wrapper {
    padding: 2px;
}

.pwb-card__top-content {
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
}

.pwb-card__top-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>