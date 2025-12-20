<template>
    <drag-modal class="planet-window"
                @close="closeInstance">
        <template #header>
            <s-text :size="14" semi-bold>
                <span style="color: white">
                    {{ currentPlanet?.name }}
                </span>
            </s-text>
            <div @click="getPlanetInfo"
                 class="planet-window__refresh">
                <redo-outlined style="font-weight: 700; font-size: 14px;"/>
            </div>
        </template>
        <s-divider style="margin: 0"/>
        <top-menu @view-tab="viewTab"/>
        <s-divider style="margin: 0"/>
        <div class="dynamic-component-wrapper">
            <component :is="activeTab"></component>
        </div>
    </drag-modal>
</template>
<script setup lang="ts">
import DragModal from "@/components/modals/DragModal.vue";
import {currentPlanet, planetWindowsInstances} from "@/__elements/planet-window/ts";
import SText from "@/components/common/SText.vue";
import TopMenu from "@/__elements/planet-window/vue/TopMenu.vue";
import SDivider from "@/components/common/SDivider.vue";
import {TopMenuType} from "@/__elements/planet-window/ts/types";
import {type Component, onMounted, shallowRef} from "vue";
import {getApiPlanetId} from "@/_openapi/api/planet/planet";
import {user} from "@/__stores/user-store";
import {RedoOutlined} from "@ant-design/icons-vue";

const activeTab = shallowRef<Component | undefined>()

const props = defineProps<{
    instance: 1 | 2
}>()

function viewTab(p: TopMenuType) {
    activeTab.value = p.component
}

function closeInstance() {
    switch (props.instance) {
        case 1:
            planetWindowsInstances.value.instanceOneOpen = false;
            break;
        case 2:
            planetWindowsInstances.value.instanceTwoOpen = false;
            break;
    }
}

async function getPlanetInfo() {
    try {
        if (!user.value?.homePlanetId) return
        currentPlanet.value = await getApiPlanetId(user.value.homePlanetId)
    } catch (e) {
    } finally {
    }
}

onMounted(async () => {
    await getPlanetInfo()
})
</script>
<style scoped>
.planet-window {
    width: 90%;
    max-width: 800px;
    min-width: 360px;
    background: #0d1117 !important;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: calc(100vh - 100px);
    @media screen and (max-width: 600px) {
        width: 360px !important;
        max-height: calc(100% - 40px);
    }
}

:deep(.dragmodal__inner-header) {
    background: #0d1117 !important;
}

.planet-window__refresh {
    position: absolute;
    right: 40px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dynamic-component-wrapper {
    width: 100%;
    height: calc(100% - 40px);
}
</style>