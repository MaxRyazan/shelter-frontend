<template>
    <div class="block__wrapper">
        <storage-block-empty v-if="!list || !list.length"/>
        <div v-else class="block__list">
            <storage-block-item
                :type="type"
                v-for="(item, idx) in list"
                :idx="toNum(idxStartsFrom) + idx"
                :key="item.type!"
                :item="item"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import type {StorageItemDto} from "@/_openapi/models";
import StorageBlockItem from "@/__elements/planet-window/vue/parts/StorageBlockItem.vue";
import StorageBlockEmpty from "@/__elements/planet-window/vue/parts/StorageBlockEmpty.vue";
import {StorageTypes} from "@/__elements/planet-window/ts/enums";
import {toNum} from "@/helpers";

defineProps<{
    type: StorageTypes
    list: StorageItemDto[] | undefined | null
    idxStartsFrom?: number
}>()
</script>
<style scoped>

</style>