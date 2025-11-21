<template>
    <div class="planets">
        <div class="planets__item"></div>
    </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
.planets {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    background-color: darkslateblue;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.planets__item {
    border-radius: 50%;
    width: 18px;
    height: 18px;
    background-color: var(--accent);
}
</style>