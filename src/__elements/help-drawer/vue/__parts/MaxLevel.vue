<template>
    <div class="flexbox">
        <s-text shadow>Доступный уровень</s-text>
        <div class="info-block-240">
            <slot/>
        </div>
    </div>
</template>
<script setup lang="ts">

import SText from "@/components/common/SText.vue";
</script>
<style scoped>
</style>