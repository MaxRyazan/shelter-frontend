<template>
    <div class="session-log">
        <s-text :negative="log.eventType === 'remove_operation' || log.eventType === 'decay_operation'">
            [ {{ dayjs().format('HH:mm') }} ]
        </s-text>
        <s-text>{{ prefix }}</s-text>
        <s-text v-if="!planetName?.includes(',')"
                @click="viewPlanet(log.planetName)"
                class="log-planet-title">
            {{ planetName }}
        </s-text>
        <s-text class="log-planet-title" v-else>
            <span style="padding: 0 5px"
                  class="log-planet-title"
                  @click="viewPlanet(name)"
                  v-for="name in planetName.split(',')">
                {{ name }}
            </span>
        </s-text>
        <s-text class="text-ellipsis">{{ postfix }}</s-text>
    </div>
</template>
<script setup lang="ts">
import SText from "@/components/common/SText.vue";
import {SessionLog} from "@/__elements/session-logs/session-logs";
import dayjs from "dayjs";
import {computed, ref} from "vue";
import {useApiLazy} from "@/composables/useApi";
import type {GetPlanetResponseDto} from "@/_openapi/models";
import {getApiPlanetByNameUserIdPlanetName} from "@/_openapi/api/planet/planet";
import {user} from "@/__stores/user-store";
import {currentPlanet} from "@/__elements/planet-window/ts";
import {switchPlanetWindow} from "@/__elements/planet-window/ts/functions";

const props = defineProps<{
    log: SessionLog,
    shadow?: boolean
}>()

const {execute, error} = useApiLazy<GetPlanetResponseDto>()

const prefix = ref('')
const postfix = ref('')

const planetName = computed(() => {
    const arr = props.log.text.split('|')
    if (arr.length === 3) {
        prefix.value = arr[0]
        postfix.value = arr[2]
        return arr[1]
    }
})

async function viewPlanet(planetName: string) {
    const response = await execute(getApiPlanetByNameUserIdPlanetName, user.value?.id, planetName);
    if (response) {
        currentPlanet.value = response;
        switchPlanetWindow()
    } else if (error.value) {

    }
}
</script>
<style scoped>
.session-log {
    display: flex;
    gap: 6px;
    color: white;
    flex-wrap: nowrap;
    padding: 6px 12px;
    width: 100%;

    & * {
        font-family: IBM_Plex_Mono, monospace;
        font-size: 12px;
        white-space: nowrap;
    }
}

.log-planet-title {
    color: var(--accent-light) !important;
    cursor: pointer !important;
}
</style>