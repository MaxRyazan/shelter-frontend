<template>
    <space-between>
        <span>Лимит</span>
        <span>{{ $rs(SharedResourcesStore.MaxStorage, 3) }}</span>
    </space-between>
    <space-between>
        <span>Занято ~{{ $rs(SharedResourcesStore.StorageUsagePercent, 1) }}%</span>
        <span>{{ $rs(SharedResourcesStore.CurrentStorage, 3) }}</span>
    </space-between>
</template>
<script setup lang="ts">

import {$rs} from "@/helpers.ts";
import {SharedResourcesStore} from "@/__global/SharedResourcesStore.ts";
import SpaceBetween from "@/components/containers/SpaceBetween.vue";
</script>
<style scoped>

</style>