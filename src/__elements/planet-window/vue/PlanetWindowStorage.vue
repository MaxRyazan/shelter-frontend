<template>
<div class="storage">
    <storage-sub-menu @show="showOnStorage" />
</div>
</template>
<script setup lang="ts">
import StorageSubMenu from "@/__elements/planet-window/vue/StorageSubMenu.vue";


const storageItemsMap = new Map<number, Object>([

])


function showOnStorage(p: Set<number>) {
    console.log(p)
}
</script>
<style scoped>

</style>