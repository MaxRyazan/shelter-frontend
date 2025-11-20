<template>
    <div class="header">
        <shared-storage-icon
            class="shared-storage-icon"
            @click="switchSharedResources"/>
    </div>
</template>
<script setup lang="ts">
import {isSharedResourcesWindowOpen} from "../__global/SharedResourcesStore.ts";
import {onUnmounted} from "vue";
import {useEventListener} from '@vueuse/core'
import SharedStorageIcon from "@/components/icons/SharedStorageIcon.vue";

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

.shared-storage-icon {
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