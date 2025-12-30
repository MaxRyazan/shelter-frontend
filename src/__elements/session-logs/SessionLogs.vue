<template>
    <div v-if="lastLog"
         @click="handleClick"
         :class="{'logs-shadow': !isOpen, 'no-border-bottom': isOpen}"
         class="session-logs">
        <div class="session-logs__last">
            <session-log-single :shadow="!isOpen"
                                :log="lastLog"/>
        </div>
        <div v-if="isOpen"
             class="session-logs__dropdown">
            <s-input @click.prevent.stop
                     white
                     v-model="searchString"/>
            <session-log-single
                :shadow="!isOpen"
                v-for="[key, value] in _SessionLogs"
                :key="key"
                :log="value"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import {_SessionLogs} from "@/__elements/session-logs/session-logs";
import {computed, ref} from "vue";
import SessionLogSingle from "@/__elements/session-logs/SessionLogSingle.vue";
import SInput from "@/components/inputs/SInput.vue";

const isOpen = ref(false);
const searchString = ref('')
const lastLog = computed(() =>
    Array.from(_SessionLogs.value.values()).at(-1)
);

function handleClick() {
    searchString.value = ''
    isOpen.value = !isOpen.value
}
</script>
<style scoped>
.session-logs {
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-radius: 4px;
    height: 30px;
    justify-content: center;
    margin-right: 20px;
    position: relative;
    border: 1px solid var(--prime-light);
}

.session-logs__last {
    user-select: none;
    width: 100%;
    height: 100%;
    font-family: IBM_Plex_Mono, monospace;
    font-size: 12px;
    color: white;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;
}

.session-logs__dropdown {
    width: calc(100% + 2px);
    position: absolute;
    top: 100%;
    border-left: 1px solid var(--prime-light);
    border-right: 1px solid var(--prime-light);
    border-bottom: 1px solid var(--prime-light);
    left: -1px;
}

.logs-shadow {
    border: 1px solid var(--prime-light03)
}

.no-border-bottom {
    border-bottom: 1px solid transparent !important;
    border-radius: 4px 4px 0 0 !important;
}
</style>