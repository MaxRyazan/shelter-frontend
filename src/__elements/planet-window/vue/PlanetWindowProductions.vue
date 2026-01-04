<template>
    <div class="productions">
        <div class="productions__list">
            <pwp-block v-if="data?.mines"
                       type="resources"
                       :item="data?.mines"/>
            <pwp-block v-if="data?.factories"
                       type="materials"
                       :item="data?.factories"/>
            <pwp-block v-if="data?.complexes"
                       type="metamaterials"
                       :item="data?.complexes"/>
        </div>
        <div style="width: 100%;">
            <s-divider/>
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

.productions__list {
    flex-grow: 1;
    padding: 10px 12px 10px 10px;
    gap: 4px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}
</style>