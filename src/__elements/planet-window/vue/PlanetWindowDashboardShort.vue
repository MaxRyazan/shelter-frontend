<template>
    <div class="dashboard-short">
        <div class="dashboard-short__item">
            <s-text class="dashboard-short__item-line">
                склад
            </s-text>
            <s-text class="dashboard-short__item-line">{{ currentPlanet?.storage?.capacity?.currentFill }}</s-text>
            <s-text class="dashboard-short__item-line">{{ currentPlanet?.storage?.capacity?.maxCapacity }}</s-text>
            <s-text
                :positive="storageCapacityBalance > 0"
                :negative="storageCapacityBalance < 0"
                class="dashboard-short__item-line">
                {{ storageCapacityBalance }}
            </s-text>
        </div>
        <div class="dashboard-short__item">
            <s-text class="dashboard-short__item-line">
                энергия
            </s-text>
            <s-text class="dashboard-short__item-line">{{ energy?.incoming }}</s-text>
            <s-text class="dashboard-short__item-line">{{ energy?.incoming }}</s-text>
            <s-text
                :positive="toNum(energy?.balance) > 0"
                :negative="toNum(energy?.balance) < 0"
                class="dashboard-short__item-line">
                {{ energy?.balance }}
            </s-text>
        </div>
        <div class="dashboard-short__item">
            <s-text class="dashboard-short__item-line">
                кредиты
            </s-text>
            <s-text class="dashboard-short__item-line">{{ taxes?.incoming }}</s-text>
            <s-text class="dashboard-short__item-line">{{ taxes?.incoming }}</s-text>
            <s-text
                :positive="toNum(taxes?.balance) > 0"
                :negative="toNum(taxes?.balance) < 0"
                class="dashboard-short__item-line">
                {{ taxes?.balance }}
            </s-text>
        </div>
        <div class="dashboard-short__item">
            <s-text class="dashboard-short__item-line">
                провиант
            </s-text>
            <s-text class="dashboard-short__item-line">{{ food?.incoming }}</s-text>
            <s-text class="dashboard-short__item-line">{{ food?.incoming }}</s-text>
            <s-text
                :positive="toNum(food?.balance) > 0"
                :negative="toNum(food?.balance) < 0"
                class="dashboard-short__item-line">
                {{ food?.balance }}
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
            <s-text class="dashboard-short__item-line">{{ people?.currentCitizens }}</s-text>
            <s-text class="dashboard-short__item-line">{{ people?.consuming }}</s-text>
            <s-text
                :positive="toNum(people?.balance) > 0"
                :negative="toNum(people?.balance) < 0"
                class="dashboard-short__item-line">
                {{ people?.balance }}
            </s-text>
        </div>
    </div>
</template>
<script setup lang="ts">
import SText from "@/components/common/SText.vue";
import {computed} from "vue";
import {currentPlanet} from "@/__elements/planet-window/ts";
import {toNum} from "@/helpers";
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