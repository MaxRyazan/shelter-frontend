<template>
    <drag-modal class="planet-window"
                @close="isPlanetWindowOpen = false">
        <template #header>
            <s-text :size="14" semi-bold>
                <span style="color: var(--accent-light)">
                    {{ currentPlanet?.name }}
                </span>
            </s-text>
        </template>
        <s-divider space="12"/>
        <top-menu @view-tab="viewTab"/>
        <s-divider space="12"/>
        <div style="width: 100%; height: calc(100% - 80px)">
            <component :is="activeTab"></component>
        </div>
    </drag-modal>
</template>
<script setup lang="ts">
import DragModal from "@/components/modals/DragModal.vue";
import {currentPlanet, isPlanetWindowOpen} from "@/__elements/planet-window/ts";
import SText from "@/components/common/SText.vue";
import TopMenu from "@/__elements/planet-window/vue/TopMenu.vue";
import SDivider from "@/components/common/SDivider.vue";
import {TopMenuType} from "@/__elements/planet-window/ts/types";
import {type Component, onMounted, shallowRef} from "vue";
import {getApiPlanetId} from "@/_openapi/api/planet/planet";
import {user} from "@/__stores/user-store";

const activeTab = shallowRef<Component | undefined>()

function viewTab(p: TopMenuType) {
    activeTab.value = p.component
}

onMounted(async () => {
    try {
        if (!user.value?.homePlanetId) return
        const response = await getApiPlanetId(user.value.homePlanetId);
        console.log(response)
    } catch (e) {
    } finally {
    }
})
</script>
<style scoped>
.planet-window {
    width: 90%;
    max-width: 800px;
    min-width: 360px;
    height: 100%;
    max-height: calc(100% - 100px);
    background: #222222 !important;
    position: relative;
    overflow: hidden;
    @media screen and (max-width: 600px) {
        width: 360px !important;
    }
}

:deep(.dragmodal__inner-header) {
    background: #242424 !important;
}
</style>