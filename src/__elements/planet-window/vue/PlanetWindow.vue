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
        <component :is="activeTab"></component>
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
    min-width: 360px;
    background: #222222 !important;
    @media screen and (max-width: 600px) {
        width: 360px !important;
    }
}

:deep(.dragmodal__inner) {
    padding-top: 0;
}

:deep(.dragmodal__inner-header) {
    display: flex;
    padding-bottom: 0;
    background: #242424 !important;
}
</style>