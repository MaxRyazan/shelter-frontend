<template>
    <div class="items-list__item-productions">
        <div v-if="mine.needResources.length || mine.needMaterials.length"
             class="list-block">
            <div class="need-resources"
                 v-for="prod in mine.needResources"
                 :key="prod.type">
                <div>{{ _name(prod.type) }}</div>
                <s-text negative>{{ $rs(prod.count, 3) }}</s-text>
            </div>
            <div class="need-materials"
                 v-for="prod in mine.needMaterials"
                 :key="prod.type">
                <div>{{ _name(prod.type) }}</div>
                <s-text negative>{{ $rs(prod.count, 3) }}</s-text>
            </div>
        </div>
        <div class="can-produce__wrapper">
            <div class="can-produce__item"
                 v-for="prod in mine.canProduce">
                <div>{{ _name(prod.type) }}</div>
                <s-text positive>{{ $rs(prod.count, 3) }}</s-text>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {$rs, _name} from "@/helpers";
import SText from "@/components/common/SText.vue";
import {PlanetIndustriesDtoItem} from "@/_openapi/models";

defineProps<{
    mine: PlanetIndustriesDtoItem
}>()
</script>
<style scoped>
.items-list__item-productions {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        flex-direction: column-reverse;
        gap: 0;
        justify-content: center;
    }
}

.list-block {
    width: 120px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px 0;
}

.need-resources {
    display: flex;
    gap: 10px;
    justify-content: space-between;
}

.need-materials {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
}

.can-produce__wrapper {
    width: 120px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.can-produce__item {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
}
</style>