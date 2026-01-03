<template>
    <div class="items-list">
        <div class="items-list__item"
             style="border: 1px solid var(--prime-light03); border-radius: 4px; padding: 4px"
             v-for="mine in item">
            <div :class="{
                    'resource-color': type === 'resources',
                    'material-color': type === 'materials',
                    'metamaterial-color': type === 'metamaterials',
                }"
                 class="items-list__item-name">
                {{ Dictionary.get(mine.buildingType) }}
            </div>
            <div style="display: flex; align-items: center; white-space: nowrap; font-weight: 700">{{ mine.count }}
                шт.
            </div>
            <div style="display: flex; align-items: center; ">{{ mine.efficiency * 100 }}%</div>
            <div style="display: flex; align-items: center; ">{{ dayjs(mine.nextProductionTime).format('HH:mm') }}</div>
            <div class="items-list__item-productions">
                <div style="width: 120px; display: flex; justify-content: center; flex-direction: column; padding: 10px 0">
                    <div style="display: flex; gap: 10px; justify-content: space-between;"
                         v-for="prod in mine.needResources">
                        <div>{{ Dictionary.get(prod.type) }}</div>
                        <s-text negative>{{ $rs(prod.count, 3) }}</s-text>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; justify-content: space-between;"
                         v-for="prod in mine.needMaterials">
                        <div>{{ Dictionary.get(prod.type) }}</div>
                        <s-text negative>{{ $rs(prod.count, 3) }}</s-text>
                    </div>
                </div>
                <div style="width: 120px;display: flex; justify-content: center; flex-direction: column">
                    <div style="display: flex; gap: 10px; align-items: center; justify-content: space-between; "
                         v-for="prod in mine.canProduce">
                        <div>{{ Dictionary.get(prod.type) }}</div>
                        <s-text positive>{{ $rs(prod.count, 3) }}</s-text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {Dictionary} from "@/dictionaries";
import {$rs} from "@/helpers";
import dayjs from "dayjs";
import SText from "@/components/common/SText.vue";

defineProps<{
    item: any[]
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

.items-list__item-productions {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        flex-direction: column-reverse;
        gap: 0;
        justify-content: center;
    }
}
</style>