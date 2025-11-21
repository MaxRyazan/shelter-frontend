<template>
    <drag-modal @close="isPlanetWindowOpen = false">
        <template #header>
            <s-text :size="14" semi-bold>Просмотр планеты {{ currentPlanet?.name }}</s-text>
        </template>
    </drag-modal>
</template>
<script setup lang="ts">
import DragModal from "@/components/modals/DragModal.vue";
import {currentPlanet, isPlanetWindowOpen} from "@/__global/PlanetView";
import SText from "@/components/common/SText.vue";
</script>
<style scoped>

</style>