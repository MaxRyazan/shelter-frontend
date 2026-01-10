<template>
    <drag-modal class="science"
                @close="isScienceWindowOpen = false">
        <VueFlow v-model="allNodes as any"
                 :pan-on-drag="true"
                 :nodes-draggable="false"
                 style="width: 100%; height: 100%"/>
    </drag-modal>

</template>
<script setup lang="ts">
import {CSSProperties, onMounted, onUnmounted, ref} from 'vue'
import {useVueFlow, VueFlow} from '@vue-flow/core'
import DragModal from "@/components/modals/DragModal.vue";
import {isScienceWindowOpen} from "@/__elements/settings-window/ts/index.js";

const {setViewport} = useVueFlow()

const timer = ref()
onMounted(() => {
    timer.value = setTimeout(() => {
        setViewport({x: 0, y: 0, zoom: 0.7})
    },)
})
onUnmounted(() => {
    clearInterval(timer.value)
    timer.value = null
})
const nodeStyles = {
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    width: '90px',
    height: '50px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '5px 5px 15px rgba(0,0,0,0.3), inset 0 -3px 8px rgba(0,0,0,0.2), inset 0 3px 8px rgba(255,255,255,0.2)',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    fontSize: '11px',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    padding: '4px',
    textAlign: 'center',
    hyphens: 'auto'
} as CSSProperties

const distanceX = 120;
const startY = 20;

const fundamental = ref([
    {
        id: 'physics',
        position: {y: startY, x: 20},
        data: {label: 'Физика'},
        style: nodeStyles
    },
    {
        id: 'chemistry',
        position: {y: startY + distanceX, x: 20},
        data: {label: 'Химия'},
        style: nodeStyles
    },
    {
        id: 'math',
        position: {y: startY + distanceX * 2, x: 20},
        data: {label: 'Математика'},
        style: nodeStyles
    },
    {
        id: 'materials',
        position: {y: startY + distanceX * 3, x: 20},
        data: {label: 'Материаловедение'},
        style: nodeStyles
    },
    {
        id: 'biology',
        position: {y: startY + distanceX * 4, x: 20},
        data: {label: 'Биология'},
        style: nodeStyles
    },
    {
        id: 'geology',
        position: {y: startY + distanceX * 5, x: 20},
        data: {label: 'Геология'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'energy',
        position: {y: startY + distanceX * 6, x: 20},
        data: {label: 'Энергетика'},
        style: nodeStyles
    },
    {
        id: 'cyber',
        position: {y: startY + distanceX * 7, x: 20},
        data: {label: 'Кибернетика'},
        style: nodeStyles
    },

    // Две связи
    // {
    //     id: 'link1',
    //     source: 'physics',
    //     target: 'lasers',
    //     style: {
    //         stroke: '#667eea',
    //         strokeWidth: 2
    //     },
    //     type: 'straight'
    // },
    // {
    //     id: 'link2',
    //     source: 'chemistry',
    //     target: 'lasers',
    //     style: {
    //         stroke: '#667eea',
    //         strokeWidth: 2
    //     },
    //     type: 'straight'
    // },
    // {
    //     id: 'link3',
    //     source: 'physics',
    //     target: 'lasers2',
    //     style: {
    //         stroke: '#667eea',
    //         strokeWidth: 2
    //     },
    //     type: 'straight'
    // }
])

const fundamentalGeologyLine = ref([
    {
        id: 'mining',
        position: {y: startY + distanceX * 4.75, x: 200},
        data: {label: 'Недра'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },

    {
        id: 'agronomy',
        position: {y: startY + distanceX * 5.25, x: 200},
        data: {label: 'Агрономия'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },


    {
        id: 'geology-mining',
        source: 'geology',
        target: 'mining',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
    {
        id: 'geology-agronomy',
        source: 'geology',
        target: 'agronomy',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    }
])


const allNodes = ref([
    ...fundamental.value,
    ...fundamentalGeologyLine.value,
])
</script>
<style>
.science {
    width: 90%;
    height: 90%;
}
</style>