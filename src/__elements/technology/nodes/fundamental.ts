import {ref} from "vue";
import {distanceY, columns, nodeStyles, startY} from "@/__elements/technology/nodes/index";

export const fundamentalPositions = {
    'physics': {
        x: columns.col1,
        y: startY
    },
    'chemistry': {
        x: columns.col1,
        y: startY + distanceY
    },
    'math': {
        x: columns.col1,
        y: startY + distanceY * 2
    },
    'materials': {
        x: columns.col1,
        y: startY + distanceY * 3
    },
    'biology': {
        x: columns.col1,
        y: startY + distanceY * 4
    },
    'geology': {
        x: columns.col1,
        y: startY + distanceY * 5
    },
    'energy': {
        x: columns.col1,
        y: startY + distanceY * 6
    },
    'cyber': {
        x: columns.col1,
        y: startY + distanceY * 7
    },
}

export const fundamental = ref([
    {
        id: 'physics',
        position: fundamentalPositions['physics'],
        data: {label: 'Физика'},
        style: nodeStyles
    },
    {
        id: 'chemistry',
        position: fundamentalPositions['chemistry'],
        data: {label: 'Химия'},
        style: nodeStyles
    },
    {
        id: 'math',
        position: fundamentalPositions['math'],
        data: {label: 'Математика'},
        style: nodeStyles
    },
    {
        id: 'materials',
        position: fundamentalPositions['materials'],
        data: {label: 'Материаловедение'},
        style: nodeStyles
    },
    {
        id: 'biology',
        position: fundamentalPositions['biology'],
        data: {label: 'Биология'},
        style: nodeStyles
    },
    {
        id: 'geology',
        position: fundamentalPositions['geology'],
        data: {label: 'Геология'},
        style: nodeStyles,
        sourcePosition: 'right',
        targetPosition: 'left'
    },
    {
        id: 'energy',
        position: fundamentalPositions['energy'],
        data: {label: 'Энергетика'},
        style: nodeStyles,
        sourcePosition: 'left',
        targetPosition: 'right'
    },
    {
        id: 'cyber',
        position: fundamentalPositions['cyber'],
        data: {label: 'Кибернетика'},
        style: nodeStyles
    },
])