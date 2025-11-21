<template>
    <drag-modal @close="isPlanetChoserOpen = false">
        <template #header>
            Список планет
        </template>
        <div class="list__item"
             @click="viewPlanet(planet)"
             v-for="planet in allPlanets" :key="planet.id">
            <s-text color="white">{{ planet.name }}</s-text>
        </div>
    </drag-modal>
</template>
<script setup lang="ts">

import DragModal from "@/components/modals/DragModal.vue";
import {allPlanets, currentPlanet, isPlanetChoserOpen, isPlanetWindowOpen} from "@/__global/PlanetView";
import SText from "@/components/common/SText.vue";
import {GetPlanetResponseDto} from "@/_openapi/models";

function viewPlanet(planet: GetPlanetResponseDto) {
    currentPlanet.value = planet
    isPlanetWindowOpen.value = true
    isPlanetChoserOpen.value = false
}
</script>
<style scoped>
.list__item {
    padding: 6px;
    cursor: pointer !important;

    &:hover {
        & > * {
            color: var(--accent) !important;
        }
    }
}
</style>