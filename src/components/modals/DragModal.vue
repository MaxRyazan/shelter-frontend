<template>
    <div class="dragmodal-wrapper"
         ref="el"
         :style="style"
         style="position: fixed">
        <div class="dragmodal__inner dragmodal__inner-header">
            <slot name="header"></slot>
            <div @click="emits('close')" class="dragmodal__inner-cross-wrapper">
                <div class="dragmodal__inner-cross">+</div>
            </div>
        </div>
        <div class="dragmodal__inner">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import {useDraggable} from '@vueuse/core'
import {onUnmounted, useTemplateRef} from 'vue'
import {useEventListener} from '@vueuse/core'

const emits = defineEmits<{
    (e: 'close'): void
}>()
const props = defineProps<{
    initialPosition?: { x: number, y: number }
}>()
const el: any = useTemplateRef<HTMLElement>('el')

const {style} = useDraggable(el, {
    initialValue: props.initialPosition ?? {x: 10, y: 60},
})
const cleanup = useEventListener(window, 'keydown', (e) => {
    if (e.code === 'Escape') {
        emits('close')
    }
})
onUnmounted(() => cleanup())
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
    flex-grow: 1;
    padding: 8px;
}

.dragmodal__inner-header {
    background: var(--prime-back-reverse);
    height: 30px;
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
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
}
</style>
