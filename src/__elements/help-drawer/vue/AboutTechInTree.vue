<template>
    <div class="tech">
        <div v-if="showHelpAbout?.subject"
             class="tech-info">
            <div class="flexbox">
                <s-text shadow>Текущий уровень</s-text>
                <div class="tech-info__description">
                    {{ isTechAlreadyBeenLearned ? [tech.currentLearnedLevel] : "[ не изучено ]" }}
                </div>
            </div>
            <div v-if="tech.maxAvailableLevelToLearn >=0"
                 class="flexbox">
                <s-text shadow>Доступный уровень</s-text>
                <div class="tech-info__description">[ {{ tech.maxAvailableLevelToLearn }} ]</div>
            </div>
            <div>
                <s-text shadow>Описание технологии</s-text>
                <div class="tech-info__description">{{ tech.description }}</div>
            </div>
            <div v-if="tech.bonuses?.length">
                <s-text shadow>Бонусы за каждый уровень</s-text>
                <s-text class="flexbox" v-for="bonus in tech.bonuses">
                    <div class="text-ellipsis">{{ bonus.description }}</div>
                    <div>{{ bonus.valuePerLevel }}%</div>
                </s-text>
            </div>
            <div v-if="!isTechAlreadyInQueue && isTechAvailableToLearn"
                 class="tech-info__actions">
                <s-input white
                         class="tech-info__input"
                         type="number"
                         text-align="center"
                         v-model="targetLevel"/>
                <s-button class="tech-info__button"
                          @click="pushTechToQueueForResearch"
                          white>
                    Исследовать
                </s-button>
            </div>
            <div style="margin-top: 20px;" v-else-if="isTechAlreadyInQueue">
                <s-text shadow>Сейчас исследуется</s-text>
                <user-tech-queue-component style="width: 100%; margin-top: 4px;"
                                           :watched-tech-inner-id="tech.innerId"/>
            </div>
            <div v-else-if="!isTechAvailableToLearn">
                <s-text shadow>Требуются исследования</s-text>
                <div style="text-align: end"
                     v-for="required in tech.requiredTeches"
                     :key="tech.innerId">
                    <s-text>{{ required.technology.name }} [ {{ required.techLevel }} ]</s-text>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {showHelpAbout} from "@/__elements/help-drawer/ts";
import {computed, ref} from "vue";
import {type GetTechInfoForUserDto, type UserTechnologyQueueResponseDto} from "@/_openapi/models";
import SText from "@/components/common/SText.vue";
import SButton from "@/components/buttons/SButton.vue";
import SInput from "@/components/inputs/SInput.vue";
import {Toast} from "@/__elements/toast/SToast";
import {useApiLazy} from "@/composables/useApi";
import {postApiUserTechAddToQueue} from "@/_openapi/api/user-tech/user-tech";
import {user, userTechQueue} from "@/__stores/user-store";
import UserTechQueueComponent from "@/components/UserTechQueueComponent.vue";


const {execute: addTechToQueueForResearch} = useApiLazy<UserTechnologyQueueResponseDto[]>();
const isTechAlreadyInQueue = computed(() => userTechQueue.value.some(ut => ut.techInnerId === tech.value.innerId));
const isTechAvailableToLearn = computed(() => tech.value.maxAvailableLevelToLearn !== -100);
const isTechAlreadyBeenLearned = computed(() => tech.value.currentLearnedLevel !== -1);
const tech = ref(showHelpAbout.value?.subject as GetTechInfoForUserDto)
const targetLevel = ref()


async function pushTechToQueueForResearch() {
    if (!targetLevel.value) {
        Toast.error('Введите желаемый уровень для исследования');
        return
    }
    const response = await addTechToQueueForResearch(postApiUserTechAddToQueue, {
        userId: user.value?.id,
        techInnerId: tech.value.innerId,
        status: 'active',
        currentTechLevel: 0,
        targetLevel: targetLevel.value,
    })
    if (response) {
        userTechQueue.value = response
    }
}
</script>
<style scoped>
.tech {
    padding: 4px;
}

.tech-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border: 1px solid var(--prime-light03);
}

.tech-info__description {
    max-height: 240px;
    overflow-y: auto;
}

.tech-info__actions {
    width: 100%;
    margin-top: 20px;
    display: flex;
    gap: 20px;
}

.tech-info__button {
    height: 30px;
    width: 80%;
}

.tech-info__input {
    height: 30px;
    margin-top: 0;
    width: 80px;
}
</style>