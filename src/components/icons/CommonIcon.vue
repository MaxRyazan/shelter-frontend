<template>
    <img :src="`/image/common/${name}`"
         class="common-icon"
         alt="planet-icon"/>
</template>
<script setup lang="ts">
defineProps<{
    name: string
}>()
</script>
<style scoped>
.common-icon {
    width: 30px;
    height: 30px;
    border: 1px solid var(--accent);
    border-radius: 4px;
    cursor: pointer !important;
    color: var(--accent);

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