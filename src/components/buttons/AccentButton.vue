<template>
    <button @keydown.enter="emits('click')"
            @click="emits('click')"
            class="white-button">
        <slot/>
    </button>
</template>
<script setup lang="ts">
const emits = defineEmits<{
    (e: 'click'): void
}>()
</script>
<style scoped>
.white-button {
    background-color: transparent;
    border-width: 2px;
    border-color: var(--accent);
    border-style: solid;
    border-radius: 4px;
    color: var(--accent);
    padding: 4px 6px;
    cursor: pointer;
    outline: none;

    &:hover {
        color: var(--accent-light);
        border-color: var(--accent-light);
    }

    &:active {
        box-shadow: 0 0 0 1px var(--accent);
    }

    &:focus {
        box-shadow: var(--shadow);
    }
}
</style>