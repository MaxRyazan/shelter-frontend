<template>
    <div v-on-click-outside="() => showHelpAbout = undefined"
         v-if="showHelpAbout && showHelpAbout.subject"
         class="help-drawer">
        <div class="help-drawer__header">
            <s-text class="text-ellipsis">
                {{ Dictionary.get(showHelpAbout.subject.buildingType) }}
            </s-text>
            <div @click="close"
                 class="help-drawer__close">
                <close-outlined style="font-size: 18px;"/>
            </div>
        </div>
        <s-divider/>
        <div class="help-drawer__content">
            <about-building :building="showHelpAbout.subject"
                            v-if="showHelpAbout.subject && showHelpAbout.type === 'building'"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import {showHelpAbout} from "../ts";
import {CloseOutlined} from "@ant-design/icons-vue";
import AboutBuilding from "@/__elements/help-drawer/vue/AboutBuilding.vue";
import {Dictionary} from "@/dictionaries";
import {vOnClickOutside} from '@vueuse/components'
import SDivider from "@/components/common/SDivider.vue";
import SText from "@/components/common/SText.vue";
import {onMounted, onUnmounted} from "vue";

function close() {
    showHelpAbout.value = undefined
}

function keyHandle(e: KeyboardEvent) {
    if (e.key === "Escape") {
        showHelpAbout.value = undefined
    }
}

onMounted(() => {
    window.addEventListener("keydown", keyHandle);
})
onUnmounted(() => {
    window.removeEventListener("keydown", keyHandle);
})
</script>
<style scoped>
.help-drawer {
    z-index: 9999999;
    background-color: #191919;
    position: absolute;
    right: 0;
    top: 50px;
    width: 360px;
    border: 1px solid var(--prime-light);
    font-family: IBM_Plex_Mono, monospace;
    color: var(--prime-light);
    border-radius: 4px;
    max-height: 80%;
    display: flex;
    flex-direction: column;
}

.help-drawer__header {
    width: 100%;
    position: relative;
    font-weight: bolder;
    text-align: center;
    padding: 6px 40px 6px 6px;
}

.help-drawer__close {
    position: absolute;
    top: 0;
    right: 0;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.help-drawer__content {
    overflow-y: auto;
    flex-grow: 1;
    padding-right: 10px;
}
</style>