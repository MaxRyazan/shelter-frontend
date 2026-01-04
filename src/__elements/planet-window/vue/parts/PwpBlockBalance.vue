<template>
    <div class="item-list__balance">
        <div class="item-list__balance-column">
            <div class="item-list__balance-item"
                 v-for="[key, value] of resources">
                <s-text class="resource-color">
                    {{ _name(key) }}
                </s-text>
                <s-text :negative="value < 0" :positive="value > 0">{{ value }}</s-text>
            </div>
        </div>
        <div class="item-list__balance-column">
            <div class="item-list__balance-item"
                 v-for="[key, value] of materialsAndMetamaterials">
                <s-text :class="{
                    'material-color': key in DictionaryMaterials,
                    'metamaterial-color': key in DictionaryMetamaterials,
                }">
                    {{ _name(key) }}
                </s-text>
                <s-text :negative="value < 0" :positive="value > 0">{{ value }}</s-text>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {PlanetIndustriesDtoBalance} from "@/_openapi/models";
import {_name} from "@/helpers";
import SText from "@/components/common/SText.vue";
import {DictionaryMaterials, DictionaryMetamaterials, DictionaryResources} from "@/dictionaries";
import {computed} from "vue";

const props = defineProps<{
    balance: PlanetIndustriesDtoBalance
}>()

// Разделяем баланс по категориям
const resources = computed(() => {
    return Object.entries(props.balance)
        .filter(([key]) => key in DictionaryResources)
});

const materialsAndMetamaterials = computed(() => {
    return Object.entries(props.balance)
        .filter(([key]) => key in DictionaryMaterials || key in DictionaryMetamaterials)
        .sort(([keyA], [keyB]) => {
            // Сначала материалы, потом метаматериалы
            const isMaterialA = keyA in DictionaryMaterials;
            const isMaterialB = keyB in DictionaryMaterials;

            if (isMaterialA && !isMaterialB) return -1;
            if (!isMaterialA && isMaterialB) return 1;
            return keyA.localeCompare(keyB);
        });
});
</script>

<style scoped>
.item-list__balance {
    display: flex;
    gap: 20px;
    border: 1px solid var(--prime-light03);
    border-radius: 4px;
    padding: 8px;
}

.item-list__balance-column {
    flex: 1;
}

.item-list__balance-item {
    display: flex;
    justify-content: space-between;
    font-family: IBM_Plex_Mono, monospace;
    margin-bottom: 4px;
}
</style>