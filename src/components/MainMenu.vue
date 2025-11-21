<template>
    <div class="menu">
        <shared-storage-icon/>
        <planet-choser/>
    </div>
</template>
<script setup lang="ts">
import SharedStorageIcon from "@/components/icons/SharedStorageIcon.vue";
import PlanetChoser from "@/components/PlanetChoser.vue";
</script>
<style scoped>
.menu {
    width: 100%;
    padding: 0 4px;
    height: 60px;
    background: var(--menu-back);
    display: flex;
    align-items: center;
    gap: 16px;

    @media screen and (max-width: 600px) {
        width: 40px;
        flex-direction: column;
        height: auto;
        padding: 10px 0;
    }
}
</style>