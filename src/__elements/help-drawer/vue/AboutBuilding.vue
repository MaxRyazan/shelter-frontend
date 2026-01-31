<template>
    <div v-if="building" class="params__wrapper">
        <div class="params__interactive">
            <s-text style="text-wrap: nowrap">Посчитать для</s-text>
            <div style="display: flex; gap: 6px">
                <s-input style="margin: 0; width: 60px; height: 24px;"
                         type="number"
                         :max-value="9999"
                         v-model="count"/>
                <s-text>шт.</s-text>
            </div>
        </div>
        <div class="params">
            <s-text semi-bold>Параметры здания</s-text>
            <div class="params__item">
                <s-text>Требуется площадок</s-text>
                <s-text semi-bold>{{ $rs(building.needSpace * maxCount, 0) }}</s-text>
            </div>
            <div class="params__item">
                <s-text>Требуется энергии</s-text>
                <s-text semi-bold>{{ $rs(building.needEnergy * maxCount, 3) }}</s-text>
            </div>
            <div class="params__item">
                <s-text>Требуется работников</s-text>
                <s-text semi-bold>{{ $rs(building.needCitizens * maxCount, 0) }}</s-text>
            </div>
            <div class="params__item">
                <s-text>Содержание</s-text>
                <s-text semi-bold>{{ $rs(building.amortization * maxCount, 3) }}</s-text>
            </div>
            <div v-if="building.capacity"
                 class="params__item">
                <s-text semi>Бонус вместимости складов</s-text>
                <s-text :positive="building.capacity > 0"
                        :negative="building.capacity < 0"
                        semi-bold>
                    {{ $rs(building.capacity * maxCount, 3) }}
                </s-text>
            </div>
            <div v-if="building.produceEnergy"
                 class="params__item">
                <s-text semi>Производство энергии</s-text>
                <s-text :positive="building.produceEnergy > 0"
                        :negative="building.produceEnergy < 0"
                        semi-bold>
                    {{ $rs(building.produceEnergy * maxCount, 3) }}
                </s-text>
            </div>
            <div v-if="building.citizensBonus"
                 class="params__item">
                <s-text>Жилой фонд</s-text>
                <s-text :positive="building.citizensBonus > 0"
                        :negative="building.citizensBonus < 0"
                        semi-bold>
                    {{ $rs(building.citizensBonus * maxCount, 3) }}
                </s-text>
            </div>
            <div v-if="building.birthRateBonus"
                 class="params__item">
                <s-text>Рождаемость</s-text>
                <s-text :positive="building.birthRateBonus > 0"
                        :negative="building.birthRateBonus < 0"
                        semi-bold>
                    {{ $rs(building.birthRateBonus * maxCount, 3) }}
                </s-text>
            </div>
            <div v-if="building.foodProducePerDay"
                 class="params__item">
                <s-text>Производство еды</s-text>
                <s-text :positive="building.foodProducePerDay > 0"
                        :negative="building.foodProducePerDay < 0"
                        semi-bold>
                    {{ $rs(building.foodProducePerDay * maxCount, 3) }}
                </s-text>
            </div>
        </div>
        <div class="produce">
            <s-text semi-bold>Требуется ресурсов для постройки</s-text>
            <div v-for="item in building.cost"
                 class="params__item">
                <s-text
                    :class="{
                        'resource-color' : item.materialType && item.materialType in DictionaryResources,
                        'material-color' : item.materialType && item.materialType in DictionaryMaterials,
                        'metamaterial-color' : item.materialType && item.materialType in DictionaryMetamaterials,
                    }">
                    {{ Dictionary.get(item.materialType ?? '') }}
                </s-text>
                <s-text v-if="(getCurrentAmountOnStorage(item) - item.amount * maxCount) < 0"
                        shadow
                        :size="14"
                        negative>
                    [ не хватает : {{ $rs(Math.abs(getCurrentAmountOnStorage(item) - item.amount * maxCount), 3) }} ]
                </s-text>
                <s-text :negative="isMaterialsNotEnough(item)">{{ $rs(item.amount * maxCount, 3) }}</s-text>
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
                <s-text semi-bold>{{ $rs(item.amountPerTick * maxCount, 3) }}</s-text>
            </div>
        </div>
        <div v-if="building.needResources?.length"
             class="produce">
            <s-text semi-bold>Потребление ресурсов за цикл</s-text>
            <div v-for="item in building.needResources"
                 class="params__item">
                <s-text class="resource-color">{{ Dictionary.get(item.resourceName) }}</s-text>
                <s-text semi-bold>{{ $rs(item.amountPerTick * maxCount, 3) }}</s-text>
            </div>
        </div>
        <div v-if="building.needMaterials?.length"
             class="produce">
            <s-text semi-bold>Потребление материалов за цикл</s-text>
            <div v-for="item in building.needMaterials"
                 class="params__item">
                <s-text class="material-color">{{ Dictionary.get(item.materialName) }}</s-text>
                <s-text semi-bold>{{ $rs(item.amountPerTick * maxCount, 3) }}</s-text>
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
import {computed, ref} from "vue";
import {$rs} from "@/helpers";
import {showHelpAbout} from "@/__elements/help-drawer/ts";
import {GetBuildingInfoDto} from "@/_openapi/models";
import {currentPlanet} from "@/__elements/planet-window/ts";

const building = ref(showHelpAbout.value?.subject as GetBuildingInfoDto)
const count = ref(1)
const maxCount = computed(() => count.value >= 9999 ? 9999 : count.value);

function isMaterialsNotEnough(item: { materialType: string | null, amount: number }) {
    const materials = currentPlanet.value?.storage?.materials;
    const matOnStorage = materials?.find(matOnStorage => matOnStorage.type === item.materialType);
    if (!matOnStorage) return true;
    return matOnStorage.amount < item.amount;
}

function getCurrentAmountOnStorage(item: { materialType: string | null, amount: number }) {
    const materials = currentPlanet.value?.storage?.materials;
    const matOnStorage = materials?.find(matOnStorage => matOnStorage.type === item.materialType);
    if (!matOnStorage) return 0;
    return matOnStorage.amount
}
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