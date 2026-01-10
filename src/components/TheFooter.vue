<template>
    <div class="footer">
        <game-money-balance/>
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

    @media screen and (max-width: 600px) {
        position: fixed !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 9999 !important;
    }
}
</style>