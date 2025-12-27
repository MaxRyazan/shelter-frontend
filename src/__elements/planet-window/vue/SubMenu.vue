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
import {onBeforeMount, ref} from "vue";
import {TopSubMenuType} from "@/__elements/planet-window/ts/types";

const emits = defineEmits<{
    (e: 'show', p: Set<number>): void
}>()

const props = defineProps<{
    list: TopSubMenuType[]
    keyPostfix: string
}>()

let checked = ref(new Set<number>(props.list.some(a => a.id === 0) ? [0] : null));

function clickOn(item: TopSubMenuType) {
    if (checked.value.has(item.id)) {
        checked.value.delete(item.id)
    } else checked.value.add(item.id)
    emits('show', checked.value)
    localStorage.setItem(`shelter-pw-submenu-${props.keyPostfix}`, JSON.stringify(Array.from(checked.value)))
}

onBeforeMount(() => {
    const storage = localStorage.getItem(`shelter-pw-submenu-${props.keyPostfix}`);
    if (storage) {
        checked.value = new Set(JSON.parse(storage));
        emits('show', checked.value)
    }
})
</script>
<style scoped>
.sub-menu {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
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