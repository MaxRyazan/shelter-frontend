<template>
    <div class="dragmodal-wrapper"
         @click.stop="bringToFront"
         ref="el"
         :style="computedStyle"
         style="position: fixed">
        <div class="dragmodal__inner dragmodal__inner-header">
            <slot name="header"></slot>
            <div @click="emits('close')" class="dragmodal__inner-cross-wrapper">
                <div class="dragmodal__inner-cross">+</div>
            </div>
        </div>
        <div class="dragmodal__inner dragmodal__inner-body">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import {useDraggable, useEventListener, useWindowSize} from '@vueuse/core'
import {computed, onMounted, onUnmounted, ref, useTemplateRef} from 'vue'
import {maxZIndex, modalsInstancesSet} from "@/components/modals/z-index-store";

const emits = defineEmits<{
    (e: 'close'): void
}>()
const props = defineProps<{
    initialPosition?: { x: number, y: number }
}>()

const currentInstanceIndex = ref()
const currentZIndex = ref(100)
const el: any = useTemplateRef<HTMLElement>('el')
const {width} = useWindowSize()
const {style} = useDraggable(el, {
    initialValue: props.initialPosition ?? {x: width.value > 600 ? 20 : 42, y: width.value > 600 ? 60 : 10},
})
const cleanup = useEventListener(window, 'keydown', (e) => {
    if (e.code === 'Escape') {
        emits('close')
    }
})

const computedStyle = computed(() => style.value + `;z-index:${currentZIndex.value}`)

function bringToFront() {
    currentZIndex.value = maxZIndex.value++
}

onMounted(() => {
    currentZIndex.value = maxZIndex.value++
    currentInstanceIndex.value = maxZIndex.value
    modalsInstancesSet.add(currentInstanceIndex.value)
})

onUnmounted(() => {
    cleanup()
    modalsInstancesSet.delete(currentInstanceIndex.value)
    if (modalsInstancesSet.size === 0) {
        maxZIndex.value = 100;
    }
})
</script>
<style scoped>
.dragmodal-wrapper {
    background: var(--prime-back);
    border-radius: 4px;
    border-color: var(--prime-light);
    border-style: solid;
    color: var(--prime-light);
    cursor: grab;
    display: flex;
    flex-direction: column;
}

.dragmodal__inner {
    font-size: 12px;
    user-select: none;
    cursor: default;
}

.dragmodal__inner-body {
    height: calc(100% - 30px);
}

.dragmodal__inner-header {
    background: var(--prime-back-reverse);
    height: 40px;
    min-height: 40px;
    flex-grow: 0;
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 36px;
}

.dragmodal__inner-cross {
    transform: rotate(45deg);
    font-size: 24px;
}

.dragmodal__inner-cross-wrapper {
    width: 30px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
}
</style>
