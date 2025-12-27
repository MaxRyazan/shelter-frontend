<template>
    <div :style="{width}"
         class="info-block">
        <slot/>
    </div>
</template>
<script setup lang="ts">

defineProps<{
    width?: string
}>()
</script>
<style scoped>
.info-block {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid var(--prime-light);
    font-family: IBM_Plex_Mono, monospace;
}
</style>