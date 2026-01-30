<template>
    <drag-modal class="science"
                @close="isScienceWindowOpen = false">
        <VueFlow v-model="nodesPlusEdges"
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
import {useApiLazy} from "@/composables/useApi";
import type {Technology, TechTreeDto} from "@/_openapi/models";
import {getApiTechGetTechTree, getApiTechTechInnerId} from "@/_openapi/api/tech/tech";
import {nodeStyles} from "@/__elements/technology/nodes";
import {showHelpAbout, treeTechForObserve} from "@/__elements/help-drawer/ts";

const {setViewport} = useVueFlow()
const timer = ref()

const {execute} = useApiLazy<TechTreeDto>()
const {execute: getTechByInnerId} = useApiLazy<Technology>()

async function onNodeClick(event: { event: MouseTouchEvent, node: GraphNode }) {
    const data = event.node.data;
    if (data && data.innerId) {
        treeTechForObserve.value = await getTechByInnerId(getApiTechTechInnerId, data.innerId);
        if (treeTechForObserve.value) {
            showHelpAbout.value = {
                type: 'tech-in-tree',
                title: treeTechForObserve.value.name ?? '',
                subject: treeTechForObserve.value,
            }
        }
    }
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

const nodes = ref<any>([])
const edges = ref<any>([])
const nodesPlusEdges = ref<any>()

function createNodes(dto: TechTreeDto) {
    nodes.value = dto.nodes?.map(node => {
        return {
            id: node.name,
            position: node.position,
            data: {
                label: node.name,
                ...node
            },
            sourcePosition: 'right',
            targetPosition: 'left',
            style: nodeStyles
        }
    })
}

function createEdges(dto: TechTreeDto) {
    edges.value = dto.edges?.map(edge => {
        return {
            id: edge.id,
            source: edge.source,
            target: edge.target,
            type: 'smoothstep',
            style: {
                stroke: '#4CAF50',
                strokeWidth: 2
            }
        }
    })
}

onMounted(async () => {
    const response = await execute(getApiTechGetTechTree)
    if (response) {
        createNodes(response)
        createEdges(response)
        nodesPlusEdges.value = [...nodes.value, ...edges.value]
    }
})
</script>
<style>
.science {
    width: 90%;
    height: 90%;
}
</style>