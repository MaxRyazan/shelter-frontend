<template>
    <div class="storage">
        <storage-sub-menu @show="(p: Set<number>) => menuSet = p"/>
        <s-divider style="margin: 0"/>
        <div class="storage-wrapper">
            <storage-block
                :type="StorageTypes.resources"
                :list="storage?.resources"
                class="resources"
                v-if="menuSet.has(StorageTypes.resources) && storage?.resources?.length"/>
            <storage-block
                :type="StorageTypes.materials"
                :list="storage?.materials"
                class="materials"
                v-if="menuSet.has(StorageTypes.materials) && storage?.materials?.length"/>
            <storage-block
                :type="StorageTypes.metamaterials"
                :list="storage?.metaMaterials"
                class="metamaterials"
                v-if="menuSet.has(StorageTypes.metamaterials) && storage?.metaMaterials?.length"/>
            <storage-block
                :type="StorageTypes.components"
                :list="storage?.components"
                class="components"
                v-if="menuSet.has(StorageTypes.components) && storage?.components?.length"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import StorageSubMenu from "@/__elements/planet-window/vue/StorageSubMenu.vue";
import {onMounted, ref, watch} from "vue";
import StorageBlock from "@/__elements/planet-window/vue/parts/StorageBlock.vue";
import {currentPlanet} from "@/__elements/planet-window/ts";
import type {PlanetStorageDto} from "@/_openapi/models";
import {StorageTypes} from "@/__elements/planet-window/ts/enums";
import SDivider from "@/components/common/SDivider.vue";

const storage = ref<PlanetStorageDto | undefined>()
let menuSet = ref(new Set())

watch(currentPlanet, () => {
    storage.value = currentPlanet.value?.storage
}, {deep: true, immediate: true})

onMounted(() => {
    storage.value = currentPlanet.value?.storage
})
</script>
<style scoped>
.storage-wrapper {
    margin-top: 10px;
    padding: 0 10px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
    grid-template-areas:
        "card1"
        "card2"
        "card3"
        "card4";
    @media (min-width: 800px) {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          "card1 card4"
          "card2 card4"
          "card3 card4";
        align-items: start;
    }
}

.resources {
    grid-area: card1;
    width: 100%;
}

.materials {
    grid-area: card2;
    width: 100%;
}

.metamaterials {
    grid-area: card3;
    width: 100%;
}

.components {
    grid-area: card4;
    width: 100%;
    height: 100%;
}
</style>