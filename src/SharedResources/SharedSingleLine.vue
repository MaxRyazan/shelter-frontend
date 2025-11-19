<template>
    <space-between style="align-items: center">
        <span>{{ map.get(name) }}</span>
        <div style="display: flex; align-items: center; gap: 6px">
            <div class="shared__single-line-item">{{ $rs(value.Amount, 3) }}</div>
            <div class="shared__single-line-item">{{ $rs(value.TotalVolume, 3) }}</div>
            <input class="shared__remove-input" type="number">
            <div style="cursor:pointer;">❌</div>
        </div>
    </space-between>
</template>
<script setup lang="ts">
import {$rs} from "@/helpers.ts";
import SpaceBetween from "@/components/containers/SpaceBetween.vue";

defineProps<{
    name: string,
    value: { Amount: number, TotalVolume: number },
    map: Map<string, string>,
}>()
</script>
<style scoped>
.shared__remove-input {
    width: 60px;
    background-color: transparent;
    color: var(--prime-light);
    padding: 2px 6px;
    font-size: 12px;
    border: 1px solid var(--prime-light);;
    outline: none;
    border-radius: 4px;
}

input[type="number"] {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    appearance: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.shared__single-line-item {
    color: var(--prime-light);
    width: 80px;
    display: flex;
    justify-content: end;
}
</style>