<template>
    <ul class="sub-menu">
        <li v-for="item in list"
            :class="{'active-menu-item': checked.has(item.id)}"
            @click="clickOn(item)"
            :key="item.id"
            class="sub-menu__item">
            {{ item.text }}
        </li>
    </ul>
</template>
<script setup lang="ts">
import {reactive, watch} from "vue";
import {TopSubMenuType} from "@/__elements/planet-window/ts/types";

const emits = defineEmits<{
    (e: 'show', p: Set<number>): void
}>()

defineProps<{
    list: TopSubMenuType[]
}>()

const checked = reactive(new Set<number>([0]));

function clickOn(item: TopSubMenuType) {
    if (checked.has(item.id)) {
        checked.delete(item.id)
    } else checked.add(item.id)
}

watch(checked, () => {
    emits('show', checked)
}, {deep: true, immediate: true})
</script>
<style scoped>
.sub-menu {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-family: IBM_Plex_Mono, monospace;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 8px;
    background-color: #0d1117;
}

.sub-menu__item {
    cursor: pointer;
    opacity: .3;
    user-select: none;
}

</style>