<template>
    <div class="wrapper">
        <the-header/>
        <the-content/>
        <the-footer/>
    </div>
</template>
<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import TheContent from "./components/TheContent.vue";
import TheFooter from "./components/TheFooter.vue";
</script>
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>
