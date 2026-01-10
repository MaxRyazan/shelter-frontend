<template>
    <drag-modal class="shared-window"
                @close="isSharedResourcesWindowOpen = false">
        <template #header>
            <s-text size="14px" semi-bold>Межпланетное хранилище</s-text>
        </template>
        <s-divider/>
        <sub-menu :list="navList"
                  @show="(p: Set<number>) => menuSet = p"
                  key-postfix="shared-window-menu" />

        <s-divider space="0"/>

        <div class="storage-wrapper">
            <storage-block
                :type="StorageTypes.resources"
                :list="shared?.resources"
                class="resources"
                v-if="menuSet.has(StorageTypes.resources) && shared?.resources?.length"/>
            <storage-block
                :idx-starts-from="toNum(shared?.resources?.length)"
                :type="StorageTypes.materials"
                :list="shared?.materials"
                class="materials"
                v-if="menuSet.has(StorageTypes.materials) && shared?.materials?.length"/>
            <storage-block
                :idx-starts-from="toNum(shared?.resources?.length) + toNum(shared?.materials?.length)"
                :type="StorageTypes.metamaterials"
                :list="shared?.metaMaterials"
                class="metamaterials"
                v-if="menuSet.has(StorageTypes.metamaterials) && shared?.metaMaterials?.length"/>
            <storage-block
                :idx-starts-from="toNum(shared?.resources?.length) + toNum(shared?.materials?.length) + toNum(shared?.metaMaterials?.length)"
                :type="StorageTypes.components"
                :list="shared?.components"
                class="components"
                v-if="menuSet.has(StorageTypes.components) && shared?.components?.length"/>
        </div>
        <s-divider space="0"/>
        <shared-summary/>
    </drag-modal>
</template>
<script setup lang="ts">
import {isSharedResourcesWindowOpen} from "@/__stores/shared-resources-store";
import DragModal from "@/components/modals/DragModal.vue";
import SDivider from "@/components/common/SDivider.vue";
import SText from "@/components/common/SText.vue";
import {onUnmounted, ref} from "vue";
import SharedSummary from "@/__elements/shared-resources-window/vue/SharedSummary.vue";
import {useEventListener} from '@vueuse/core'
import SubMenu from "@/__elements/planet-window/vue/SubMenu.vue";
import {TopSubMenuType} from "@/__elements/planet-window/ts/types";
import StorageBlock from "@/__elements/planet-window/vue/parts/StorageBlock.vue";
import {StorageTypes} from "@/__elements/planet-window/ts/enums";
import {toNum} from "@/helpers";
import type {PlanetStorageDto} from "@/_openapi/models";

const currentTab = ref('resources');
let menuSet = ref(new Set())


const navList = ref<TopSubMenuType[]>([
    {
        id: 0,
        text: "ресурсы",
    },
    {
        id: 1,
        text: "материалы"
    },
    {
        id: 2,
        text: "метаматериалы"
    },
    {
        id: 3,
        text: "компоненты"
    },
]);
const shared = ref<PlanetStorageDto | undefined>()

const cleanup = useEventListener(window, 'keydown', (e) => {
    if (e.code === 'Digit1') {
        currentTab.value = 'resources';
    }
    if (e.code === 'Digit2') {
        currentTab.value = 'materials';
    }
    if (e.code === 'Digit3') {
        currentTab.value = 'metamaterials';
    }
    if (e.code === 'Digit4') {
        currentTab.value = 'components';
    }
})

onUnmounted(() => cleanup())
</script>
<style scoped>
.shared-window {
    background: #0d1117 !important;
    min-width: 360px;
    @media screen and (max-width: 600px) {
        width: 360px !important;
    }
}
</style>
