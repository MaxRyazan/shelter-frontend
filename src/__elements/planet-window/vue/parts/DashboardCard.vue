<template>
    <div class="flexbox">
        <s-text class="text-700">
            {{ item.name }}
        </s-text>
        <div style="align-items: center; gap: 4px" class="flexbox">
            <green-triangle
                height="12"
                v-if="props.item.useGreenTriangle"/>
            <red-triangle
                height="12"
                v-if="props.item.useRedTriangle"/>
            <s-text :positive="item.usePositiveColorIndication"
                    :negative="item.useNegativeColorIndication"
                    class="text-700">
                {{ item.value }}
            </s-text>
        </div>
    </div>
</template>
<script setup lang="ts">
import SText from "@/components/common/SText.vue";
import {PlanetInfoParam} from "@/__elements/planet-window/ts/types";
import GreenTriangle from "@/components/icons/GreenTriangle.vue";
import RedTriangle from "@/components/icons/RedTriangle.vue";

const props = defineProps<{
    item: PlanetInfoParam
}>()

</script>
<style scoped>

</style>