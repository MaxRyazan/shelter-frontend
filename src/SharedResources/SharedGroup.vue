<template>
    <div class="group">
        <div :style="{color: `var(--${type}`}"
             class="group__line-container">
            <shared-single-line v-for="[key, value] of sortedMap"
                                :map="map"
                                :name="key"
                                :value="value"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import type {Components, Materials, MetaMaterials, Resources} from "@/__global/SharedResourcesStore.ts";
import SharedSingleLine from "@/SharedResources/SharedSingleLine.vue";
import {ref, watch} from "vue";

const props = defineProps<{
    map: Map<string, string>
    type: 'resources' | 'materials' | 'metamaterials' | 'components'
    entity: Resources | Materials | MetaMaterials | Components
}>()

const sortedMap = ref(new Map<string, { Amount: number, TotalVolume: number }>([]));


function sortResources(entity: Resources) {
    const keys = Object.keys(props.entity);
    if (keys.includes('Clay')) {
        sortedMap.value.set('Clay', entity['Clay'])
    }
    if (keys.includes('Limestone')) {
        sortedMap.value.set('Limestone', entity['Limestone'])
    }
    if (keys.includes('Iron')) {
        sortedMap.value.set('Iron', entity['Iron'])
    }
    if (keys.includes('Coal')) {
        sortedMap.value.set('Coal', entity['Coal'])
    }
    if (keys.includes('Copper')) {
        sortedMap.value.set('Copper', entity['Copper'])
    }
    if (keys.includes('Titanium')) {
        sortedMap.value.set('Titanium', entity['Titanium'])
    }
    if (keys.includes('Oil')) {
        sortedMap.value.set('Oil', entity['Oil'])
    }
    if (keys.includes('Boron')) {
        sortedMap.value.set('Boron', entity['Boron'])
    }
    if (keys.includes('Nickel')) {
        sortedMap.value.set('Nickel', entity['Nickel'])
    }
    if (keys.includes('Vanadium')) {
        sortedMap.value.set('Vanadium', entity['Vanadium'])
    }
    if (keys.includes('Magnesium')) {
        sortedMap.value.set('Magnesium', entity['Magnesium'])
    }
    if (keys.includes('Molybdenum')) {
        sortedMap.value.set('Molybdenum', entity['Molybdenum'])
    }
}

function sortMaterials() {
    const sortedEntries = Object.entries(props.entity)
        .sort(([keyA], [keyB]) => {
            const rusKeyA = props.map.get(keyA);
            const rusKeyB = props.map.get(keyB);
            if (rusKeyA && rusKeyB) {
                return rusKeyA.charAt(0).localeCompare(rusKeyB.charAt(0))
            } else return keyA.charAt(0).localeCompare(keyB.charAt(0))
        });

    sortedMap.value = new Map(sortedEntries);
}

function sortMetaMaterials() {
    const sortedEntries = Object.entries(props.entity)
        .sort(([keyA], [keyB]) => {
            const rusKeyA = props.map.get(keyA);
            const rusKeyB = props.map.get(keyB);
            if (rusKeyA && rusKeyB) {
                return rusKeyA.charAt(0).localeCompare(rusKeyB.charAt(0))
            } else return keyA.charAt(0).localeCompare(keyB.charAt(0))
        });

    sortedMap.value = new Map(sortedEntries);
}

function sortComponents() {
    const sortedEntries = Object.entries(props.entity)
        .sort(([keyA], [keyB]) => {
            const rusKeyA = props.map.get(keyA);
            const rusKeyB = props.map.get(keyB);
            if (rusKeyA && rusKeyB) {
                return rusKeyA.charAt(0).localeCompare(rusKeyB.charAt(0))
            } else return keyA.charAt(0).localeCompare(keyB.charAt(0))
        });

    sortedMap.value = new Map(sortedEntries);
}


watch(() => props.entity, () => {
    switch (props.type) {
        case "resources": {
            sortResources(props.entity as Resources)
        }
            break;
        case "materials": {
            sortMaterials()
        }
            break;
        case "metamaterials": {
            sortMetaMaterials()
        }
            break;
        case "components": {
            sortComponents()
        }
            break;
    }
}, {immediate: true})


// const iconMap = new Map([
//     ['resources', '💰'],
//     ['materials', '🧱'],
//     ['metamaterials', '💎'],
//     ['components', '⚙️'],
// ])
</script>
<style scoped>
.group {
    margin-bottom: 10px;
}

.group__line-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
}
</style>