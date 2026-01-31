<template>
    <div class="buildings-sub-menu">
        <sub-menu style="flex-grow: 1"
                  key-postfix="buildings"
                  :list="firstRow"
                  @show="changeSet1"/>
    </div>
</template>
<script setup lang="ts">
import SubMenu from "@/__elements/planet-window/vue/SubMenu.vue";
import {ref, shallowRef, watch} from "vue";
import {SubTabsBuildings} from "@/__elements/planet-window/ts";
import {TopSubMenuType} from "@/__elements/planet-window/ts/types";

const emits = defineEmits<{
    (e: 'show', p: Set<number>): void
}>()

let menuSet1 = ref(new Set<number>())


function changeSet1(p: Set<number>) {
    menuSet1.value = p
}

watch(menuSet1, () => {
    emits('show', menuSet1.value)
}, {deep: true})

const firstRow = shallowRef<TopSubMenuType[]>([
    {
        id: 0,
        text: SubTabsBuildings.common,
    },
    {
        id: 1,
        text: SubTabsBuildings.food,
    },
    {
        id: 2,
        text: SubTabsBuildings.energy,
    },
    {
        id: 3,
        text: SubTabsBuildings.mines,
    },
    {
        id: 4,
        text: SubTabsBuildings.factories,
    },
    {
        id: 5,
        text: SubTabsBuildings.complexes,
    },
    {
        id: 6,
        text: SubTabsBuildings.industrial,
    },
    {
        id: 7,
        text: SubTabsBuildings.science,
    },
])
</script>
<style scoped>
.buildings-sub-menu {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 601px) {
        flex-direction: row;
        gap: 0;
        justify-content: space-between;
    }
}
</style>