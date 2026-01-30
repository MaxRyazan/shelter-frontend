<template>
    <div v-if="tech.bonuses?.length">
        <s-text shadow>Бонусы за каждый уровень</s-text>
        <s-text class="flexbox" v-for="bonus in tech.bonuses">
            <div class="text-ellipsis">{{ bonus.description }}</div>
            <div>{{ bonus.valuePerLevel }}%</div>
        </s-text>
    </div>
</template>
<script setup lang="ts">
import SText from "@/components/common/SText.vue";
import type {GetTechInfoForUserDto} from "@/_openapi/models";

defineProps<{
    tech: GetTechInfoForUserDto
}>()
</script>
<style scoped>

</style>