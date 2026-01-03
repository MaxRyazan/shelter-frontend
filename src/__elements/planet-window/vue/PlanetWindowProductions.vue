<template>
    <div class="productions">
        <div style="flex-grow: 1; padding: 10px 12px 10px 10px; gap: 4px; display: flex; flex-direction: column; overflow-y: auto">
            <pwp-block type="resources" :item="data?.mines as any"/>
            <pwp-block type="materials" :item="data?.factories as any"/>
            <pwp-block type="metamaterials" :item="data?.complexes as any"/>
        </div>
        <div style="width: 100%;">
            <s-divider />
            <planet-window-dashboard-short/>
        </div>
    </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useApiLazy} from "@/composables/useApi";
import type {PlanetIndustriesDto} from "@/_openapi/models";
import {getApiPlanetIndustriesPowerPlanetId} from "@/_openapi/api/planet/planet";
import {currentPlanet} from "@/__elements/planet-window/ts";
import {Toast} from "@/__elements/toast/SToast";
import PwpBlock from "@/__elements/planet-window/vue/parts/PwpBlock.vue";
import PlanetWindowDashboardShort from "@/__elements/planet-window/vue/PlanetWindowDashboardShort.vue";
import SDivider from "@/components/common/SDivider.vue";

const {execute} = useApiLazy<PlanetIndustriesDto>()
const data = ref<PlanetIndustriesDto>()
onMounted(async () => {
    const result = await execute(getApiPlanetIndustriesPowerPlanetId, currentPlanet.value?.id)
    if (result) {
        data.value = result
    } else {
        Toast.error('Произошла ошибка :(')
    }
})
</script>
<style scoped>
.productions {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>