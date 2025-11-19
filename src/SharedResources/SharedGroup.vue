<template>
    <div class="group">
        <div :style="{color: `var(--${type}`}"
             class="group__line-container">
            <shared-single-line v-for="[key, value] of Object.entries(entity)"
                                :map="map"
                                :name="key"
                                :value="value"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import type {Components, Materials, MetaMaterials, Resources} from "@/__global/SharedResourcesStore.ts";
import SharedSingleLine from "@/SharedResources/SharedSingleLine.vue";

defineProps<{
    map: Map<string, string>
    type: 'resources' | 'materials' | 'metamaterials' | 'components'
    entity: Resources | Materials | MetaMaterials | Components
}>()

// const iconMap = new Map([
//     ['resources', '💰'],
//     ['materials', '🧱'],
//     ['metamaterials', '💎'],
//     ['components', '⚙️'],
// ])
</script>
<style scoped>
.group {
    margin-bottom: 10px;
}

.group__line-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
}
</style>