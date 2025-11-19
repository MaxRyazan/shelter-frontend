<template>
    <div class="header">
        <white-button @click="switchSharedResources"
                      style="font-size: 12px;">
            Хранилище
        </white-button>
    </div>
</template>
<script setup lang="ts">
import WhiteButton from "./buttons/WhiteButton.vue";
import {isSharedResourcesWindowOpen} from "../__global/SharedResourcesStore.ts";
import {onUnmounted} from "vue";
import {useEventListener} from '@vueuse/core'

function switchSharedResources() {
    isSharedResourcesWindowOpen.value = !isSharedResourcesWindowOpen.value
}

const cleanup = useEventListener(window, 'keydown', (e) => {
    if (e.code === 'KeyQ') {
        isSharedResourcesWindowOpen.value = !isSharedResourcesWindowOpen.value
    }
})
onUnmounted(() => cleanup())
</script>
<style scoped>
.header {
    width: 100%;
    padding: 0 4px;
    height: 60px;
    background: var(--header-back);
    display: flex;
    align-items: center;
}
</style>