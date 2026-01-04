<template>
    <div class="items-list">
        <div class="items-list__item"
             v-for="row in item">
            <div :class="{
                    'resource-color': type === 'resources',
                    'material-color': type === 'materials',
                    'metamaterial-color': type === 'metamaterials',
                 }"
                 class="items-list__item-name">
                {{ _name(row?.buildingType) }}
            </div>
            <div class="row-count">{{ row.count }} шт.</div>
            <div class="flex-align-center">{{ row.efficiency * 100 }}%</div>
            <div class="flex-align-center">{{ dayjs(row.nextProductionTime).format('HH:mm') }}</div>
            <pwp-block-need-resources :mine="row"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import {PlanetIndustriesDtoItem} from "@/_openapi/models";
import PwpBlockNeedResources from "@/__elements/planet-window/vue/parts/PwpBlockNeedResources.vue";
import {_name} from "@/helpers";

defineProps<{
    item: PlanetIndustriesDtoItem[]
    type: 'resources' | 'materials' | 'metamaterials'
}>()
</script>
<style scoped>
.items-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-family: IBM_Plex_Mono, monospace;
}

.items-list__item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 3fr;
    min-height: 32px;
    justify-items: end;
    gap: 10px;
    border: 1px solid var(--prime-light03);
    border-radius: 4px;
    padding: 4px;

    & > * {
        width: 100%;
    }
}

.items-list__item-name {
    display: flex;
    align-items: center;
    width: 100px;
    @media screen and (max-width: 600px) {
        width: 60px;
        overflow-x: hidden;
        word-break: break-word;
        hyphens: auto
    }
}

.flex-align-center {
    display: flex;
    align-items: center;
}

.row-count {
    display: flex;
    align-items: center;
    white-space: nowrap;
    font-weight: 700;
}
</style>