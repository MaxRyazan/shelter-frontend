<template>
    <div class="dashboard-short">
        <div class="dashboard-short__item">
            <s-text class="dashboard-short__item-line">
                склад
            </s-text>
            <s-text class="dashboard-short__item-line">{{ $rs(toNum(currentPlanet?.storage?.capacity?.currentFill), 3) }}</s-text>
            <s-text class="dashboard-short__item-line">{{ $rs(toNum(currentPlanet?.storage?.capacity?.maxCapacity), 3) }}</s-text>
            <s-text
                :positive="storageCapacityBalance > 0"
                :negative="storageCapacityBalance < 0"
                class="dashboard-short__item-line">
                {{ $rs(toNum(storageCapacityBalance), 3) }}
            </s-text>
        </div>
        <div class="dashboard-short__item">
            <s-text class="dashboard-short__item-line">
                энергия
            </s-text>
            <s-text class="dashboard-short__item-line">{{ $rs(toNum(energy?.incoming), 3) }}</s-text>
            <s-text class="dashboard-short__item-line">{{ $rs(toNum(energy?.incoming), 3) }}</s-text>
            <s-text
                :positive="toNum(energy?.balance) > 0"
                :negative="toNum(energy?.balance) < 0"
                class="dashboard-short__item-line">
                {{ $rs(toNum(energy?.balance), 3) }}
            </s-text>
        </div>
        <div class="dashboard-short__item">
            <s-text class="dashboard-short__item-line">
                кредиты
            </s-text>
            <s-text class="dashboard-short__item-line">{{ $rs(toNum(taxes?.incoming), 3) }}</s-text>
            <s-text class="dashboard-short__item-line">{{ $rs(toNum(taxes?.incoming), 3) }}</s-text>
            <s-text
                :positive="toNum(taxes?.balance) > 0"
                :negative="toNum(taxes?.balance) < 0"
                class="dashboard-short__item-line">
                {{ $rs(toNum(taxes?.balance), 3) }}
            </s-text>
        </div>
        <div class="dashboard-short__item">
            <s-text class="dashboard-short__item-line">
                провиант
            </s-text>
            <s-text class="dashboard-short__item-line">{{ $rs(toNum(food?.incoming) , 3) }}</s-text>
            <s-text class="dashboard-short__item-line">{{ $rs(toNum(food?.incoming) , 3) }}</s-text>
            <s-text
                :positive="toNum(food?.balance) > 0"
                :negative="toNum(food?.balance) < 0"
                class="dashboard-short__item-line">
                {{ $rs(toNum(food?.balance), 3) }}
            </s-text>
        </div>
        <div class="dashboard-short__item">
            <s-text class="dashboard-short__item-line" style="display: flex; align-items: center; gap: 5px;">
                <s-text>
                    население
                </s-text>
                <red-triangle
                    class="dashboard-short__icon"
                    v-if="toNum(people?.birthRate) < 0"/>
                <green-triangle
                    class="dashboard-short__icon"
                    v-if="toNum(people?.birthRate) > 0"/>
            </s-text>
            <s-text class="dashboard-short__item-line">{{ $rs(toNum(people?.currentCitizens ), 3) }}</s-text>
            <s-text class="dashboard-short__item-line">{{ $rs(toNum(people?.consuming), 3) }}</s-text>
            <s-text
                :positive="toNum(people?.balance) > 0"
                :negative="toNum(people?.balance) < 0"
                class="dashboard-short__item-line">
                {{ $rs(toNum(people?.balance), 3) }}
            </s-text>
        </div>
    </div>
</template>
<script setup lang="ts">
import SText from "@/components/common/SText.vue";
import {computed} from "vue";
import {currentPlanet} from "@/__elements/planet-window/ts";
import {$rs, toNum} from "@/helpers";
import RedTriangle from "@/components/icons/RedTriangle.vue";
import GreenTriangle from "@/components/icons/GreenTriangle.vue";

const storageCapacityBalance = computed(() => toNum(currentPlanet?.value?.storage?.capacity?.maxCapacity) - toNum(currentPlanet?.value?.storage?.capacity?.currentFill))
const energy = computed(() => currentPlanet.value?.electricity)
const taxes = computed(() => currentPlanet.value?.taxes)
const food = computed(() => currentPlanet.value?.food)
const people = computed(() => currentPlanet.value?.citizens)

</script>
<style scoped>
.dashboard-short {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    @media screen and (min-width: 700px) {
        width: 50%;
    }
}

.dashboard-short__item {
    display: flex;
    justify-content: space-between;

    & > *:not(:first-child) {
        text-align: end;
    }
}

.dashboard-short__item-line {
    width: 25%;
}

.dashboard-short__icon {
    width: 12px;
    height: 12px !important;
    padding-top: 2px;
}
</style>