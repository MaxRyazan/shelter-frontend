<template>
    <space-between>
        <span>Лимит</span>
        <span>{{ $rs(SharedResourcesStore.MaxStorage, 3) }}</span>
    </space-between>
    <space-between>
        <span>Всего заполнено ~{{ $rs(SharedResourcesStore.StorageUsagePercent, 1) }}%</span>
        <span>{{ $rs(SharedResourcesStore.CurrentStorage, 3) }}</span>
    </space-between>
</template>
<script setup lang="ts">

import {$rs} from "@/helpers";
import SpaceBetween from "@/components/containers/SpaceBetween.vue";
import {SharedResourcesStore} from "@/__elements/shared-resources-window/ts";
</script>
<style scoped>

</style>