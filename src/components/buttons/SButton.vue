<template>
    <button
        :class="{
                'button-accent' : accent,
                'button-white' : white,
            }"
        @keydown.enter="emits('click')"
        @click="emits('click')"
        class="s-button">
        <slot/>
    </button>
</template>
<script setup lang="ts">
const emits = defineEmits<{
    (e: 'click'): void
}>()

withDefaults(defineProps<{
    accent?: boolean,
    white?: boolean,
}>(), {
    accent: true
})

</script>
<style scoped>
.s-button {
    background-color: transparent;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    padding: 4px 6px;
    cursor: pointer;
    outline: none;


    &:focus {
        box-shadow: var(--shadow);
    }
}

.button-accent {
    border-color: var(--accent);
    color: var(--accent);

    &:hover {
        color: var(--accent-light);
        border-color: var(--accent-light);
    }

    &:active {
        box-shadow: 0 0 0 1px var(--accent);
    }
}
.button-white {
    border-color: var(--prime-light);
    color: var(--prime-light);

    &:hover {
        color: var(--accent-light);
        border-color: var(--accent-light);
    }

    &:active {
        box-shadow: 0 0 0 1px var(--accent);
    }
}
</style>