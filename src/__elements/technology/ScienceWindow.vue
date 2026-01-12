<template>
    <drag-modal class="science"
                @close="isScienceWindowOpen = false">
        <VueFlow v-model="allNodes as any"
                 :pan-on-drag="true"
                 :nodes-draggable="false"
                 @node-click="onNodeClick"
                 style="width: 100%; height: 100%"/>
    </drag-modal>

</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import {useVueFlow, VueFlow} from '@vue-flow/core'
import DragModal from "@/components/modals/DragModal.vue";
import {isScienceWindowOpen} from "@/__elements/settings-window/ts/index.js";
import type {GraphNode, MouseTouchEvent} from "@vue-flow/core";
import {geologyTree} from "@/__elements/technology/nodes/geologyTree";
import {fundamental} from "@/__elements/technology/nodes/fundamental";

const {setViewport} = useVueFlow()
const timer = ref()

function onNodeClick(event: { event: MouseTouchEvent, node: GraphNode }) {
    console.log(event)
}

onMounted(() => {
    timer.value = setTimeout(() => {
        setViewport({x: 0, y: 0, zoom: 0.7})
    },)
})
onUnmounted(() => {
    clearInterval(timer.value)
    timer.value = null
})

const allNodes = ref([
    ...fundamental.value,
    ...geologyTree.value
])
</script>
<style>
.science {
    width: 90%;
    height: 90%;
}
</style>