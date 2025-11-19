<template>
    <div class="space-between">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
.space-between {
    display: flex;
    justify-content: space-between;
    gap: 6px;
}
</style>