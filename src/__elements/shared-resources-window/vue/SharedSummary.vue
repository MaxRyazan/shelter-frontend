<template>
    <div v-if="props.storage"
         class="shared__summary">
        <space-between>
            <s-text :size="14">Лимит</s-text>
            <s-text :size="14">{{ $rs(storage?.maxCapacity, 3) }}</s-text>
        </space-between>
        <space-between>
            <s-text :size="14">Всего заполнено ~{{ $rs(storage?.storageUsagePercent, 1) }}%</s-text>
            <s-text :size="14">{{ $rs(storage?.currentFill, 3) }}</s-text>
        </space-between>
    </div>
</template>
<script setup lang="ts">
import {$rs} from "@/helpers";
import SpaceBetween from "@/components/containers/SpaceBetween.vue";
import SText from "@/components/common/SText.vue";
import {StorageCapacityDto} from "@/_openapi/models";

const props = defineProps<{
    storage: StorageCapacityDto | undefined
}>()
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