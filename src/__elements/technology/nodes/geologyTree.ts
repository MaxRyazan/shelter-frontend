import {reactive, ref} from "vue";
import {columns, nodeStyles} from "@/__elements/technology/nodes/index";
import {fundamentalPositions} from "@/__elements/technology/nodes/fundamental";


const agronomyNodes = reactive([
    {
        id: 'hydroponics',
        position: {y: fundamentalPositions["geology"].y + 20, x: columns.col3},
        data: {label: 'Гидропоника'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'closed_environments',
        position: {y: fundamentalPositions["geology"].y + 60, x: columns.col4},
        data: {label: 'Замкнутые среды'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'modified_species',
        position: {y: fundamentalPositions["geology"].y + 100, x: columns.col3},
        data: {label: 'Модифицированные виды'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'fertilizers',
        position: {y: fundamentalPositions["geology"].y + 170, x: columns.col3},
        data: {label: 'Удобрения'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
])

const miningNodes = reactive([
    {
        id: 'geoscanners',
        position: {y: fundamentalPositions["geology"].y - 140, x: columns.col3},
        data: {label: 'Геосканеры'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'matter_splitter',
        position: {y: fundamentalPositions["geology"].y - 140, x: columns.col4},
        data: {label: 'Расщепитель материи'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'matter_transformer',
        position: {y: fundamentalPositions["geology"].y - 130, x: columns.col5},
        data: {label: 'Преобразователь материи'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },

    {
        id: 'drilling_rigs',
        position: {y: fundamentalPositions["geology"].y - 60, x: columns.col3},
        data: {label: 'Бурильные установки'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'al_rigs',
        position: {y: fundamentalPositions["geology"].y - 60, x: columns.col4},
        data: {label: 'Установки с ИИ'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'extractors',
        position: {y: fundamentalPositions["geology"].y - 70, x: columns.col5},
        data: {label: 'Извлекатели материи'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
])

const geologyLine = ref([
    {
        id: 'mining',
        position: {y: fundamentalPositions["geology"].y - 100, x: columns.col2},
        data: {label: 'Недра'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    ...miningNodes,
    {
        id: 'agronomy',
        position: {y: fundamentalPositions["geology"].y + 100, x: columns.col2},
        data: {label: 'Агрономия'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    ...agronomyNodes,
])

const geologyLinks = ref([
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

export const geologyTree = ref([
    ...geologyLine.value,
    ...geologyLinks.value,
]);