<template>
    <div class="planets__icon">
        <div class="planets__item"></div>
    </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
.planets__icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.planets__item {
    border-radius: 50%;
    width: 18px;
    height: 18px;
    background-color: var(--accent);
}
</style>