<template>
    <ul class="sub-menu">
        <li v-for="item in subList"
            :class="{active: checked.has(item.id)}"
            @click="clickOn(item)"
            :key="item.id"
            class="sub-menu__item">
            {{ item.text }}
        </li>
    </ul>
</template>
<script setup lang="ts">
import {reactive, shallowRef} from "vue";
import {SubTabs} from "@/__elements/planet-window/ts";
import {TopSubMenuType} from "@/__elements/planet-window/ts/types";

const subList = shallowRef<TopSubMenuType[]>([
    {
        id: 0,
        text: SubTabs.resources,
    },
    {
        id: 1,
        text: SubTabs.materials,
    },
    {
        id: 2,
        text: SubTabs.metamaterials,
    },
    {
        id: 3,
        text: SubTabs.components,
    }
])

const checked = reactive(new Set());

function clickOn(item: TopSubMenuType) {
    if (checked.has(item.id)) {
        checked.delete(item.id)
    } else checked.add(item.id)
    console.log(checked)
}
</script>
<style scoped>
.sub-menu {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-family: IBM_Plex_Mono sans-serif;
    font-weight: 600;
    font-size: 14px;
}

.sub-menu__item {
    cursor: pointer;
}

.active {
    color: var(--accent-light) !important;
}
</style>