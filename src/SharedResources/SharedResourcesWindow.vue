<template>
    <drag-modal @close="isSharedResourcesWindowOpen = false">
        <template #header>
            <s-text size="14px" semi-bold>Межпланетное хранилище</s-text>
        </template>
        <space-between>
            <span>Лимит</span>
            <span>{{ $rs(SharedResourcesStore.MaxStorage, 3) }}</span>
        </space-between>
        <space-between>
            <span>Занято ~{{ $rs(SharedResourcesStore.StorageUsagePercent, 1) }}%</span>
            <span>{{ $rs(SharedResourcesStore.CurrentStorage, 3) }}</span>
        </space-between>
        <s-divider space="6"/>
        <shared-menu @click="(p: string) => currentTab = p"
                     :current-tab="currentTab"/>
        <transition name="fade" mode="out-in">
            <shared-group v-if="currentTab === 'resources'"
                          :map="resourceMap"
                          type="resources"
                          :entity="SharedResourcesStore.Resources"/>
            <shared-group v-else-if="currentTab === 'materials'"
                          :map="materialMap"
                          type="materials"
                          :entity="SharedResourcesStore.Materials"/>
            <shared-group v-else-if="currentTab === 'metamaterials'"
                          :map="metaMaterialMap"
                          type="metamaterials"
                          :entity="SharedResourcesStore.MetaMaterials"/>
            <shared-group v-else-if="currentTab === 'components'"
                          :map="componentsMap"
                          type="components"
                          :entity="SharedResourcesStore.Components"/>
        </transition>

    </drag-modal>
</template>
<script setup lang="ts">
import {isSharedResourcesWindowOpen, SharedResourcesStore} from "@/__global/SharedResourcesStore.ts";
import {$rs} from "@/helpers.ts";
import DragModal from "@/components/modals/DragModal.vue";
import SpaceBetween from "@/components/containers/SpaceBetween.vue";
import SharedGroup from "./SharedGroup.vue";
import SDivider from "@/components/common/SDivider.vue";
import SText from "@/components/common/SText.vue";
import {ref} from "vue";
import SharedMenu from "@/SharedResources/SharedMenu.vue";

const currentTab = ref('resources');

const resourceMap = new Map<string, string>([
    ['Clay', 'Глина'],
    ['Limestone', 'Известняк'],
    ['Iron', 'Железо'],
    ['Coal', 'Уголь'],
    ['Oil', 'Нефть'],
    ['Titanium', 'Титан'],
    ['Molybdenum', 'Молибден'],
    ['Nickel', 'Никель'],
    ['Boron', 'Бор'],
    ['Copper', 'Медь'],
    ['Vanadium', 'Ванадий'],
    ['Magnesium', 'Магний'],
])

const materialMap = new Map<string, string>([
    ['Concrete', 'Бетон'],
    ['Steel', 'Сталь'],
    ['Polymers', 'Полимеры'],
    ['Titan', 'Титановый сплав'],
    ['Aluminum', 'Алюминий'],
])

const metaMaterialMap = new Map<string, string>([
    ['ArmoredSteel', 'Броневая сталь'],
    ['ElectronicComponents', 'Электронные компоненты'],
    ['AramidFiber', 'Арамидное волокно'],
    ['ReinforcedTitanium', 'Армированный титан'],
    ['AmorphousMetal', 'Аморфный металл'],
    ['AluminumMagnesiumAlloy', 'Магналий'],
])

const componentsMap = new Map<string, string>([
    ['Computers', 'Компьютеры'],

])
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: 0.1s;
}

.fade-leave-to, .fade-enter-from {
    opacity: 0;
}
</style>
