<template>
<div class="table-title">
    <div style="justify-self: start">Название</div>
    <div>Количество</div>
    <div>Объём</div>
    <div>Действия</div>
</div>
</template>
<script setup lang="ts">

</script>
<style scoped>
.table-title {
    display: grid;
    grid-template-columns: 1fr 80px 80px 80px;
    justify-items: end;
}
</style>