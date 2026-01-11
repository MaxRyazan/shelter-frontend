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
import {CSSProperties, onMounted, onUnmounted, reactive, ref} from 'vue'
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

const distanceY = 320;
const lines = {
    line1: 20,
    line2: 200,
    line3: 380,
    line4: 560,
    line5: 740,
}
const startY = 20;

const fundamental = ref([
    {
        id: 'physics',
        position: {y: startY, x: lines.line1},
        data: {label: 'Физика'},
        style: nodeStyles
    },
    {
        id: 'chemistry',
        position: {y: startY + distanceY, x: lines.line1},
        data: {label: 'Химия'},
        style: nodeStyles
    },
    {
        id: 'math',
        position: {y: startY + distanceY * 2, x: lines.line1},
        data: {label: 'Математика'},
        style: nodeStyles
    },
    {
        id: 'materials',
        position: {y: startY + distanceY * 3, x: lines.line1},
        data: {label: 'Материаловедение'},
        style: nodeStyles
    },
    {
        id: 'biology',
        position: {y: startY + distanceY * 4, x: lines.line1},
        data: {label: 'Биология'},
        style: nodeStyles
    },
    {
        id: 'geology',
        position: {y: startY + distanceY * 5, x: lines.line1},
        data: {label: 'Геология'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'energy',
        position: {y: startY + distanceY * 6, x: lines.line1},
        data: {label: 'Энергетика'},
        style: nodeStyles
    },
    {
        id: 'cyber',
        position: {y: startY + distanceY * 7, x: lines.line1},
        data: {label: 'Кибернетика'},
        style: nodeStyles
    },
])


const agronomyNodes = reactive([
    {
        id: 'hydroponics',
        position: { y: startY + distanceY * 5, x: lines.line3 },
        data: { label: 'Гидропоника' },
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'closed_environments',
        position: { y: startY + distanceY * 5, x: lines.line4 },
        data: { label: 'Замкнутые среды' },
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'modified_species',
        position: { y: startY + distanceY * 5.5, x: lines.line3 },
        data: { label: 'Модифицированные виды' },
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'fertilizers',
        position: { y: startY + distanceY * 6.0, x: lines.line3 },
        data: { label: 'Удобрения' },
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
])

const miningNodes = reactive([
    {
        id: 'geoscanners',
        position: { y: startY + distanceY * 4.25, x: lines.line3 },
        data: { label: 'Геосканеры' },
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'matter_splitter',
        position: { y: startY + distanceY * 4.25, x: lines.line4 },
        data: { label: 'Расщепитель материи' },
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'matter_transformer',
        position: { y: startY + distanceY * 4.4, x: lines.line5 },
        data: { label: 'Преобразователь материи' },
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },

    {
        id: 'drilling_rigs',
        position: { y: startY + distanceY * 4.75, x: lines.line3 },
        data: { label: 'Бурильные установки' },
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'al_rigs',
        position: { y: startY + distanceY * 4.75, x: lines.line4 },
        data: { label: 'Установки с ИИ' },
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'extractors',
        position: { y: startY + distanceY * 4.6, x: lines.line5 },
        data: { label: 'Извлекатели материи' },
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
])

const geologyLine = ref([
    {
        id: 'mining',
        position: {y: startY + distanceY * 4.5, x: lines.line2},
        data: {label: 'Недра'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    ...miningNodes,
    {
        id: 'agronomy',
        position: {y: startY + distanceY * 5.5, x: lines.line2},
        data: {label: 'Агрономия'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    ...agronomyNodes,
])

const links = ref([
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
    },
    {
        id: 'mining-geoscanners',
        source: 'mining',
        target: 'geoscanners',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
    {
        id: 'mining-drilling',
        source: 'mining',
        target: 'drilling_rigs',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
    {
        id: 'agro-hydroponics',
        source: 'agronomy',
        target: 'hydroponics',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
    {
        id: 'hydroponics-closed_environments',
        source: 'hydroponics',
        target: 'closed_environments',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
    {
        id: 'modified_species-closed_environments',
        source: 'modified_species',
        target: 'closed_environments',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
    {
        id: 'agro-modified',
        source: 'agronomy',
        target: 'modified_species',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
    {
        id: 'agro-fertilizers',
        source: 'agronomy',
        target: 'fertilizers',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
    {
        id: 'geoscanners-matter_splitter',
        source: 'geoscanners',
        target: 'matter_splitter',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
    {
        id: 'matter_splitter-matter_transformer',
        source: 'matter_splitter',
        target: 'matter_transformer',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
    {
        id: 'al_rigs-matter_transformer',
        source: 'al_rigs',
        target: 'matter_transformer',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },

    {
        id: 'drilling_rigs-al_rigs',
        source: 'drilling_rigs',
        target: 'al_rigs',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
    {
        id: 'al_rigs-extractors',
        source: 'al_rigs',
        target: 'extractors',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
    {
        id: 'matter_splitter-extractors',
        source: 'matter_splitter',
        target: 'extractors',
        type: 'smoothstep',
        style: {
            stroke: '#4CAF50',
            strokeWidth: 2
        }
    },
])

const allNodes = ref([
    ...fundamental.value,
    ...geologyLine.value,
    ...links.value,
])
</script>
<style>
.science {
    width: 90%;
    height: 90%;
}
</style>