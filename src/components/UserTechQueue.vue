<template>
    <div v-if="fasterTech"
         @click="showHelp()"
         class="tech-queue">
        <div :style="{width: fasterTech.readyPercent +'%'}"
             class="tech-queue__progress">
        </div>
        <div class="tech-queue__faster-tech-name text-ellipsis">
            {{ fasterTech.techName }} [{{ fasterTech.targetLevel }}]
        </div>
        <div class="tech-queue__faster-tech-percent">{{ fasterTech.readyPercent }}%</div>
    </div>
</template>
<script setup lang="ts">
import {userTechQueue} from "@/__stores/user-store";
import dayjs from "dayjs";
import {ref, watch} from "vue";
import type {UserTechnologyQueueResponseDto} from "@/_openapi/models";
import {showHelpAbout} from "@/__elements/help-drawer/ts";

const fasterTech = ref<UserTechnologyQueueResponseDto | undefined>()

function showHelp() {
    showHelpAbout.value = {
        title: "Очередь исследований",
        type: 'tech-in-queue',
        subject: userTechQueue.value
    }
}

watch(userTechQueue, () => {
    if (userTechQueue.value.length > 0) {
        let earlier = userTechQueue.value[0];
        for (let tech of userTechQueue.value) {
            if (dayjs(tech.readyAt).isBefore(dayjs(earlier.readyAt))) {
                earlier = tech
            }
        }
        fasterTech.value = earlier;
    }
}, {immediate: true, deep: true})

</script>
<style scoped>
.tech-queue {
    border: 1px solid var(--accent-light);
    height: 30px;
    display: flex;
    align-items: center;
    width: 200px;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    user-select: none;
    justify-content: space-between;
    font-family: IBM_Plex_Mono, monospace;
}

.tech-queue__progress {
    background-color: var(--accent-light03);
    position: absolute;
    height: 100%;
}

.tech-queue__faster-tech-percent {
    color: var(--accent-light);
    padding: 4px 10px;
    width: 50px;
    height: 100%;
    font-family: "PT Mono", sans-serif;
    font-size: 14px;
    display: flex;
    align-items: center;
}

.tech-queue__faster-tech-name {
    color: var(--accent-light);
    padding: 4px 10px;
    height: 100%;
    max-width: calc(100% - 52px);
    font-size: 14px;
    display: flex;
    align-items: center;
}
</style>