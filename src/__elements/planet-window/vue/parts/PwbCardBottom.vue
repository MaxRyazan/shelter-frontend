<template>
    <div class="pwb-card__bottom-wrapper">
        <div class="pwb-card__bottom-manager"></div>
        <div class="pwb-card__bottom-buttons">
            <s-button class="card-button" white>Построить</s-button>
            <s-button class="card-button" white>Сломать</s-button>
        </div>
    </div>
</template>
<script setup lang="ts">

import SButton from "@/components/buttons/SButton.vue";
</script>
<style scoped>
.pwb-card__bottom-wrapper {
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
    padding: 2px;
}

.pwb-card__bottom-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>