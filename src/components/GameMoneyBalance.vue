<template>
    <div :class="{
            'game-money-balance-up': showGreen,
            'game-money-balance-down': showRed,
         }"
         :title="$rs(user?.gameMoney, 0)"
         class="cr-balance back-gradient">
        <s-text class="cr-balance__money text-ellipsis">
            {{ $rs(balance, 0) }}
        </s-text>
        <s-text bold class="cr-balance__money-unit">CR</s-text>
    </div>
</template>
<script setup lang="ts">
import {user} from "@/__stores/user-store";
import SText from "@/components/common/SText.vue";
import {$rs} from "@/helpers";
import {computed, onUnmounted, ref, watch} from "vue";

const balance = computed(() => user.value?.gameMoney)
const showGreen = ref(false);
const showRed = ref(false);
const timer = ref()

watch(balance, (value, oldValue) => {
    clearTimeout(timer.value);
    timer.value = null

    if (value && oldValue) {
        if (value > oldValue) {
            showGreen.value = true;
            timer.value = setTimeout(() => {
                showGreen.value = false;
            }, 3000)
        }
        if (value < oldValue) {
            showRed.value = true;
            timer.value = setTimeout(() => {
                showRed.value = false;
            }, 3000)
        }
    }
})
onUnmounted(() => {
    clearTimeout(timer.value);
    timer.value = null
})
</script>
<style scoped>
.cr-balance {
    border: 1px solid var(--accent-light);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 130px;
    height: 30px;
}

.cr-balance__money {
    color: var(--accent-light);
    user-select: none;
    padding: 2px 10px;
}

.cr-balance__money-unit {
    color: var(--accent-light);
    user-select: none;
    padding: 2px 10px;
}

.game-money-balance-up {
    border: 1px solid var(--positive-color) !important;

    & > * {
        color: var(--positive-color) !important;
    }
}

.game-money-balance-down {
    border: 1px solid var(--negative-color) !important;

    & > * {
        color: var(--negative-color) !important;
    }
}
</style>