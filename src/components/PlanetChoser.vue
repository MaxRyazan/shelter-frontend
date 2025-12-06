<template>
    <div @click="isPlanetChoserOpen = !isPlanetChoserOpen"
         class="planet__choser">
        <img src="/image/common/planet-icon.webp" alt="planet-icon" />
    </div>
</template>
<script setup lang="ts">
import {isPlanetChoserOpen} from "@/__elements/planet-window/ts";
</script>
<style scoped>
.planet__choser {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: nowrap;
    user-select: none;
    cursor: pointer !important;
    border-radius: 4px;
    border: 1px solid var(--accent);
    height: 30px;
    padding: 2px 6px;

    &:hover {
        color: var(--accent-light);
        box-shadow: var(--shadow);
        border: 1px solid var(--accent-light);
        transition: .2s;
    }

    &:active {
        box-shadow: 0 0 0 1px var(--accent);
    }
}
</style>