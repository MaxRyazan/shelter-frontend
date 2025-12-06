<template>
    <div class="top-menu">
        <ul class="menu-list">
            <li class="menu-list__item">
                <s-text v-if="width > 600">обзор</s-text>
                <common-icon v-else name="planet-icon.webp"/>
            </li>
            <li class="menu-list__item">
                <s-text v-if="width > 600">склад</s-text>
                <common-icon v-else name="planet-icon.webp"/>
            </li>
            <li class="menu-list__item">
                <s-text v-if="width > 600">постройки</s-text>
                <common-icon v-else name="planet-icon.webp"/>
            </li>
            <li class="menu-list__item">
                <s-text v-if="width > 600">очередь</s-text>
                <common-icon v-else name="planet-icon.webp"/>
            </li>
            <li class="menu-list__item">
                <s-text v-if="width > 600">производства</s-text>
                <common-icon v-else name="planet-icon.webp"/>
            </li>
            <li class="menu-list__item">
                <s-text v-if="width > 600">оборона</s-text>
                <common-icon v-else name="planet-icon.webp"/>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import SText from "@/components/common/SText.vue";
import CommonIcon from "@/components/icons/CommonIcon.vue";
import {useWindowSize} from '@vueuse/core';


const {width} = useWindowSize()

</script>
<style scoped>
.top-menu {
    width: 100%;

}

.menu-list {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin: 0;
    list-style-type: none;
}

.menu-list__item {
    margin: 0;
    font-family: IBM_Plex_Mono sans-serif;
    font-size: 14px;
    font-weight: 700;
}
</style>