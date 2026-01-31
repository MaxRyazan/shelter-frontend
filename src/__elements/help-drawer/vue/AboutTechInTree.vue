<template>
    <div class="tech">
        <div v-if="showHelpAbout?.subject"
             class="tech-info">
            <current-level>
                {{ isTechAlreadyBeenLearned ? [tech.currentLearnedLevel] : "[ не изучено ]" }}
            </current-level>
            <max-level v-if="tech.maxAvailableLevelToLearn >=0">[ {{ tech.maxAvailableLevelToLearn }} ]</max-level>
            <tech-description>{{ tech.description }}</tech-description>
            <tech-bonuses v-if="tech.bonuses?.length" :tech="tech"/>
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
import CurrentLevel from "@/__elements/help-drawer/vue/__parts/CurrentLevel.vue";
import MaxLevel from "@/__elements/help-drawer/vue/__parts/MaxLevel.vue";
import TechDescription from "@/__elements/help-drawer/vue/__parts/TechDescription.vue";
import TechBonuses from "@/__elements/help-drawer/vue/__parts/TechBonuses.vue";


const {execute: addTechToQueueForResearch, error} = useApiLazy<UserTechnologyQueueResponseDto[]>();
const isTechAlreadyInQueue = computed(() => userTechQueue.value.some(ut => ut.techInnerId === tech.value.innerId));
const isTechAvailableToLearn = computed(() => tech.value.maxAvailableLevelToLearn !== -100);
const isTechAlreadyBeenLearned = computed(() => tech.value.currentLearnedLevel !== -1);
const tech = ref(showHelpAbout.value?.subject as GetTechInfoForUserDto)
const targetLevel = ref(tech.value.currentLearnedLevel + 1)


async function pushTechToQueueForResearch() {
    if (!targetLevel.value ||
        targetLevel.value <= 0 ||
        targetLevel.value <= tech.value.currentLearnedLevel
    ) {
        Toast.error('Введите желаемый уровень для исследования');
        return
    }
    const response = await addTechToQueueForResearch(postApiUserTechAddToQueue, {
        userId: user.value?.id,
        techInnerId: tech.value.innerId,
        status: 'active',
        currentTechLevel: tech.value.currentLearnedLevel,
        targetLevel: targetLevel.value,
    })
    if (response) {
        userTechQueue.value = response
    }
    if(error.value) {
        Toast.error(error.value?.detail);
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