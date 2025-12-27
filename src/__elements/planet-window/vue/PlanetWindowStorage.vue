<template>
    <div class="storage">
        <div class="storage__block" style="overflow-y: auto">
            <sub-menu key-postfix="storage"
                      :list="list"
                      @show="(p: Set<number>) => menuSet = p"/>
            <s-divider style="margin: 0"/>
            <div class="storage-wrapper">
                <storage-block
                    :type="StorageTypes.resources"
                    :list="storage?.resources"
                    class="resources"
                    v-if="menuSet.has(StorageTypes.resources) && storage?.resources?.length"/>
                <storage-block
                    :idx-starts-from="toNum(storage?.resources?.length)"
                    :type="StorageTypes.materials"
                    :list="storage?.materials"
                    class="materials"
                    v-if="menuSet.has(StorageTypes.materials) && storage?.materials?.length"/>
                <storage-block
                    :idx-starts-from="toNum(storage?.resources?.length) + toNum(storage?.materials?.length)"
                    :type="StorageTypes.metamaterials"
                    :list="storage?.metaMaterials"
                    class="metamaterials"
                    v-if="menuSet.has(StorageTypes.metamaterials) && storage?.metaMaterials?.length"/>
                <storage-block
                    :idx-starts-from="toNum(storage?.resources?.length) + toNum(storage?.materials?.length) + toNum(storage?.metaMaterials?.length)"
                    :type="StorageTypes.components"
                    :list="storage?.components"
                    class="components"
                    v-if="menuSet.has(StorageTypes.components) && storage?.components?.length"/>
            </div>
        </div>
        <div class="storage__block">
            <s-divider style="margin: 0"/>
            <planet-window-dashboard-short style="height: 120px;"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import SubMenu from "@/__elements/planet-window/vue/SubMenu.vue";
import {onMounted, ref, shallowRef, watch} from "vue";
import StorageBlock from "@/__elements/planet-window/vue/parts/StorageBlock.vue";
import {currentPlanet, SubTabsStorage} from "@/__elements/planet-window/ts";
import type {PlanetStorageDto} from "@/_openapi/models";
import {StorageTypes} from "@/__elements/planet-window/ts/enums";
import SDivider from "@/components/common/SDivider.vue";
import {toNum} from "@/helpers";
import PlanetWindowDashboardShort from "@/__elements/planet-window/vue/PlanetWindowDashboardShort.vue";
import {TopSubMenuType} from "@/__elements/planet-window/ts/types";

const storage = ref<PlanetStorageDto | undefined>()
let menuSet = ref(new Set())

watch(currentPlanet, () => {
    storage.value = currentPlanet.value?.storage
}, {deep: true, immediate: true})

const list = shallowRef<TopSubMenuType[]>([
    {
        id: 0,
        text: SubTabsStorage.resources,
    },
    {
        id: 1,
        text: SubTabsStorage.materials,
    },
    {
        id: 2,
        text: SubTabsStorage.metamaterials,
    },
    {
        id: 3,
        text: SubTabsStorage.components,
    }
])

onMounted(() => {
    storage.value = currentPlanet.value?.storage
})
</script>
<style scoped>
.storage {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.storage-wrapper {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr;
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
        grid-gap: 20px;
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
}

.storage__block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>