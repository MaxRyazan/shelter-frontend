<template>
    <div class="table-title">
        <div class="table-title__item" style="justify-self: start;">Название</div>
        <div class="table-title__item">Количество</div>
        <div class="table-title__item">Объём</div>
        <div class="table-title__item">Действия</div>
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

.table-title__item {
    font-family: IBM_Plex_Mono monospace !important;
    font-weight: 700;
}
</style>