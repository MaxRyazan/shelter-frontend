<template>
    <div v-if="building" class="params__wrapper">
        <div class="params__interactive">
            <s-text style="text-wrap: nowrap">Посчитать для</s-text>
            <div style="display: flex; gap: 6px">
                <s-input style="margin: 0; width: 60px; height: 24px;" v-model="count"/>
                <s-text>шт.</s-text>
            </div>
        </div>
        <div class="params">
            <s-text semi-bold>Параметры здания</s-text>
            <div class="params__item">
                <s-text>Требуется площадок</s-text>
                <s-text semi-bold>{{ $rs(building.needSpace * count, 0) }}</s-text>
            </div>
            <div class="params__item">
                <s-text>Требуется энергии</s-text>
                <s-text semi-bold>{{ $rs(building.needEnergy * count, 3) }}</s-text>
            </div>
            <div class="params__item">
                <s-text>Требуется работников</s-text>
                <s-text semi-bold>{{ $rs(building.needCitizens * count, 0) }}</s-text>
            </div>
            <div class="params__item">
                <s-text>Содержание</s-text>
                <s-text semi-bold>{{ $rs(building.amortization * count, 3) }}</s-text>
            </div>
            <div v-if="building.capacity"
                 class="params__item">
                <s-text>Вместимость склада</s-text>
                <s-text :positive="building.capacity > 0"
                        :negative="building.capacity < 0"
                        semi-bold>
                    {{ $rs(building.capacity * count, 3) }}
                </s-text>
            </div>
            <div v-if="building.produceEnergy"
                 class="params__item">
                <s-text>Производство энергии</s-text>
                <s-text :positive="building.produceEnergy > 0"
                        :negative="building.produceEnergy < 0"
                        semi-bold>
                    {{ $rs(building.produceEnergy * count, 3) }}
                </s-text>
            </div>
            <div v-if="building.citizensBonus"
                 class="params__item">
                <s-text>Жилой фонд</s-text>
                <s-text :positive="building.citizensBonus > 0"
                        :negative="building.citizensBonus < 0"
                        semi-bold>
                    {{ $rs(building.citizensBonus * count, 3) }}
                </s-text>
            </div>
            <div v-if="building.birthRateBonus"
                 class="params__item">
                <s-text>Рождаемость</s-text>
                <s-text :positive="building.birthRateBonus > 0"
                        :negative="building.birthRateBonus < 0"
                        semi-bold>
                    {{ $rs(building.birthRateBonus * count, 3) }}
                </s-text>
            </div>
            <div v-if="building.foodProducePerDay"
                 class="params__item">
                <s-text>Производство еды</s-text>
                <s-text :positive="building.foodProducePerDay > 0"
                        :negative="building.foodProducePerDay < 0"
                        semi-bold>
                    {{ $rs(building.foodProducePerDay * count, 3) }}
                </s-text>
            </div>
        </div>
        <div v-if="building.canProduces?.length"
             class="produce">
            <s-text semi-bold>Производство за цикл</s-text>
            <div v-for="item in building.canProduces"
                 class="params__item">
                <s-text
                    :class="{
                        'resource-color' : item.itemName in DictionaryResources,
                        'material-color' : item.itemName in DictionaryMaterials,
                        'metamaterial-color' : item.itemName in DictionaryMetamaterials,
                        'component-color' : item.itemName in DictionaryComponents,
                    }"
                >{{ Dictionary.get(item.itemName) }}
                </s-text>
                <s-text semi-bold>{{ $rs(item.amountPerTick * count, 3) }}</s-text>
            </div>
        </div>
        <div v-if="building.needResources?.length"
             class="produce">
            <s-text semi-bold>Потребление ресурсов за цикл</s-text>
            <div v-for="item in building.needResources"
                 class="params__item">
                <s-text class="resource-color">{{ Dictionary.get(item.resourceName) }}</s-text>
                <s-text semi-bold>{{ $rs(item.amountPerTick * count, 3) }}</s-text>
            </div>
        </div>
        <div v-if="building.needMaterials?.length"
             class="produce">
            <s-text semi-bold>Потребление материалов за цикл</s-text>
            <div v-for="item in building.needMaterials"
                 class="params__item">
                <s-text class="material-color">{{ Dictionary.get(item.materialName) }}</s-text>
                <s-text semi-bold>{{ $rs(item.amountPerTick * count, 3) }}</s-text>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import SText from "@/components/common/SText.vue";
import {
    Dictionary,
    DictionaryComponents,
    DictionaryMaterials,
    DictionaryMetamaterials,
    DictionaryResources
} from "@/dictionaries";
import SInput from "@/components/inputs/SInput.vue";
import {ref} from "vue";
import {$rs} from "@/helpers";
import {showHelpAbout} from "@/__elements/help-drawer/ts";
import {GameBuildings} from "@/_openapi/models";

const building = ref(showHelpAbout.value?.subject as GameBuildings)
const count = ref(1)
</script>
<style scoped>
.params {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}

.produce {
    margin-top: 10px;
}

.params__item {
    padding: 2px 0 2px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.params__wrapper {
    padding: 10px;
}

.params__interactive {
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: space-between;
}
</style>