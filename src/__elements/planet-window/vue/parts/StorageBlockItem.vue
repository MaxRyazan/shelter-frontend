<template>
    <div class="storage-item">
        <div :class="{
                'resource-color' : type === StorageTypes.resources,
                'material-color' : type === StorageTypes.materials,
                'metamaterial-color' : type === StorageTypes.metamaterials,
                'component-color' : type === StorageTypes.components,
             }"
             class="storage-item__name">{{ Dictionary.get(item.type!) }}
        </div>
        <div class="storage-item__info">
            <div class="storage-item__amount">{{ $rs(item.amount, 3) }}</div>
            <div class="storage-item__volume">{{ $rs(item.volume, 3) }}</div>
            <input class="storage-item__input" type="number">
            <red-cross class="storage-item__remove-icon"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import type {StorageItemDto} from "@/_openapi/models";
import {StorageTypes} from "@/__elements/planet-window/ts/enums";
import RedCross from "@/components/icons/RedCross.vue";
import {Dictionary} from "@/dictionaries";
import {$rs} from "@/helpers";

defineProps<{
    item: StorageItemDto
    type: StorageTypes
    idx: number
}>()
</script>
<style scoped>
.storage-item {
    display: flex;
    justify-content: space-between;
    font-family: IBM_Plex_Mono, monospace;
    font-weight: 400;
}

.storage-item__name {
    flex-grow: 1;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-family: IBM_Plex_Mono, monospace;

}

.storage-item__info {
    flex-grow: 0;
    display: flex;
    gap: 10px;
    align-items: center;
}

.storage-item__input {
    background-color: transparent;
    border: 1px solid var(--prime-light);
    border-radius: 4px;
    width: 60px;
    height: 18px;
    outline: none;
    caret-color: var(--prime-light);
    text-align: center;
    color: var(--prime-light);
    padding: 0 4px;
    font-size: 12px;
    font-weight: 600;

    &:focus {
        border: 1px solid var(--accent-light)
    }
}

.storage-item__remove-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.storage-item__amount {
    font-weight: 600;
    width: 70px;
    text-align: end;
}

.storage-item__volume {
    width: 70px;
    text-align: end;
}
</style>