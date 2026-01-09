<template>
    <div :title="$rs(user?.gameMoney, 0)"
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
import {computed} from "vue";


const balance = computed(() => user.value?.gameMoney)
</script>
<style scoped>
.cr-balance {
    border: 1px solid var(--accent-light);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 130px;
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
</style>