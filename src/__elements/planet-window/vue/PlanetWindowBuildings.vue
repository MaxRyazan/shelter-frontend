<template>
<div class="buildings-wrapper">
    <buildings-sub-menu />
    <s-divider />
</div>
</template>
<script setup lang="ts">
import BuildingsSubMenu from "@/__elements/planet-window/vue/parts/BuildingsSubMenu.vue";
import SDivider from "@/components/common/SDivider.vue";

</script>
<style scoped>
.buildings-wrapper {
    display: flex;
    flex-direction: column;
}
</style>