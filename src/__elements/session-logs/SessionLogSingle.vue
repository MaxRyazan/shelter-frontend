<template>
    <div class="session-log">
        <s-text :shadow="shadow">{{ log?.createdAt.format('DD.MM HH:mm:ss') }}</s-text>
        <s-text :shadow="shadow">{{ log?.planetName }}</s-text>
        <s-text ellipsis
                :shadow="shadow">
            {{ log?.text }}
        </s-text>
    </div>
</template>
<script setup lang="ts">
import SText from "@/components/common/SText.vue";
import {SessionLog} from "@/__elements/session-logs/session-logs";

defineProps<{
    log: SessionLog,
    shadow?: boolean
}>()
</script>
<style scoped>
.session-log {
    display: flex;
    gap: 6px;
    color: white;
    flex-wrap: nowrap;
    padding: 6px 12px;
    cursor: pointer !important;
    & * {
        font-family: IBM_Plex_Mono, monospace;
        font-size: 12px;
        white-space: nowrap;
    }
}
</style>