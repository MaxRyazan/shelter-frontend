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


function switchSharedResources() {
    isSharedResourcesWindowOpen.value = !isSharedResourcesWindowOpen.value
}
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