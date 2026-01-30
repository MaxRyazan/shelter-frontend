<template>
    <drag-modal class="science"
                @close="isScienceWindowOpen = false">
        <template #header>
            <s-text :size="16" style="font-family: 'PT Mono', sans-serif;">Древо технологий</s-text>
        </template>
        <s-divider/>
        <VueFlow v-model="nodesPlusEdges"
                 :pan-on-drag="true"
                 :nodes-draggable="false"
                 @node-click="onNodeClick"
                 style="width: 100%; height: 100%">
        </VueFlow>
    </drag-modal>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import {useVueFlow, VueFlow} from '@vue-flow/core'
import DragModal from "@/components/modals/DragModal.vue";
import {isScienceWindowOpen} from "@/__elements/settings-window/ts/index.js";
import type {GraphNode, MouseTouchEvent} from "@vue-flow/core";
import {useApiLazy} from "@/composables/useApi";
import type {GetTechInfoForUserDto, TechTreeDto} from "@/_openapi/models";
import {getApiTechGetTechTree, getApiTechTechInnerId} from "@/_openapi/api/tech/tech";
import {nodeStyles} from "@/__elements/technology/nodes";
import {showHelpAbout, treeTechForObserve} from "@/__elements/help-drawer/ts";
import {allUserTechnologies} from "@/__stores/user-store";
import SText from "@/components/common/SText.vue";
import SDivider from "@/components/common/SDivider.vue";

const {setViewport} = useVueFlow()
const timer = ref()

const {execute} = useApiLazy<TechTreeDto>()
const {execute: getTechByInnerId} = useApiLazy<GetTechInfoForUserDto>()

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
            style: {
                ...nodeStyles.value,
                background: allUserTechnologies.value.some(tech => tech.technology.innerId === node.innerId) ?
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'darkgray',

            }
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
                stroke: allUserTechnologies.value.some(tech => tech.technology.name === edge.source) ? '#4CAF50' : 'darkgray',
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