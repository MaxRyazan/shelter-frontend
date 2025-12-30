<template>
    <span class="title"
          :class="{
              'title__bold': bold,
              'title__semi-bold' : semiBold,
              'title__regular' : regular,
              'title__medium' : medium,
              'title__positive' : positive,
              'title__negative' : negative,
              'text-shadow' : shadow,
              'text-ellipsis': ellipsis,
          }"
          :style="{fontSize: fontSize, color: accent ? 'var(--accent)' : color}">
        <slot/>
    </span>
</template>
<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
    bold?: boolean
    semiBold?: boolean
    regular?: boolean
    medium?: boolean
    accent?: boolean
    positive?: boolean
    negative?: boolean
    size?: number | string
    color?: string
    shadow?: boolean
    ellipsis?: boolean
}>()

const fontSize = computed(() => typeof props.size === 'number' ? props.size + 'px' : props.size)
</script>
<style scoped>
.title {
    font-family: IBM_Plex_Mono, monospace;
}

.title__semi-bold {
    font-weight: 700;
}

.title__bold {
    font-weight: 600;
}

.title__medium {
    font-weight: 500;
}

.title__regular {
    font-weight: 400;
}

.title__positive {
    color: var(--positive-color);
}

.title__negative {
    color: var(--negative-color);
}

.text-shadow {
    opacity: .3;
}

.text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>