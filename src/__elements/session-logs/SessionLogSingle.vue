<template>
    <div class="session-log">
        <s-text @click="viewPlanet(log.planetName)"
                :shadow="shadow">[ {{ dayjs().format('HH:mm') }} ] : {{ log.text }}
        </s-text>
    </div>
</template>
<script setup lang="ts">
import SText from "@/components/common/SText.vue";
import {SessionLog} from "@/__elements/session-logs/session-logs";
import dayjs from "dayjs";

defineProps<{
    log: SessionLog,
    shadow?: boolean
}>()

function viewPlanet(planetName: string) {
    console.log(planetName);
}
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