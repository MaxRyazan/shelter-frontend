<template>
    <div class="divider" :style="{margin: `${space}px 0` || '10px 0'}"></div>
</template>
<script setup lang="ts">

defineProps<{
    space?: number | string,
}>()
</script>
<style scoped>
.divider {
    height: 1px;
    width: 100%;
    background-color: var(--divider);
}
</style>