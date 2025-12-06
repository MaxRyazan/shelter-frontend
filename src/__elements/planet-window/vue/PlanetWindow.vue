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
        <s-divider space="6"/>
        <top-menu/>
    </drag-modal>
</template>
<script setup lang="ts">
import DragModal from "@/components/modals/DragModal.vue";
import {currentPlanet, isPlanetWindowOpen} from "@/__elements/planet-window/ts";
import SText from "@/components/common/SText.vue";
import TopMenu from "@/__elements/planet-window/vue/TopMenu.vue";
import SDivider from "@/components/common/SDivider.vue";
</script>
<style scoped>
.planet-window {
    width: 100%;
    min-width: 360px;
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
}
</style>