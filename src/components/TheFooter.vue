<template>
<div class="footer">
    <game-money-balance />
</div>
</template>
<script setup lang="ts">

import GameMoneyBalance from "@/components/GameMoneyBalance.vue";
</script>
<style scoped>
.footer {
    width: 100%;
    padding: 4px 10px;
    background-color: var(--footer-back);
    height: 60px;
    display: flex;
    margin-top: auto;
    align-items: center;
}
</style>