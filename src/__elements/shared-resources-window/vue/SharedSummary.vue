<template>
    <div class="shared__summary">
        <space-between>
            <s-text :size="14">Лимит</s-text>
            <s-text :size="14">{{ $rs(SharedResourcesStore.MaxStorage, 3) }}</s-text>
        </space-between>
        <space-between>
            <s-text :size="14">Всего заполнено ~{{ $rs(SharedResourcesStore.StorageUsagePercent, 1) }}%</s-text>
            <s-text :size="14">{{ $rs(SharedResourcesStore.CurrentStorage, 3) }}</s-text>
        </space-between>
    </div>
</template>
<script setup lang="ts">
import {$rs} from "@/helpers";
import SpaceBetween from "@/components/containers/SpaceBetween.vue";
import {SharedResourcesStore} from "@/__elements/shared-resources-window/ts";
import SText from "@/components/common/SText.vue";

</script>
<style scoped>
.shared__summary {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-weight: 600;
}
</style>