<template>
    <div class="tech">
        <div v-if="showHelpAbout?.subject"
             class="tech-info">
            <!--        {{ tech }}-->
            <div class="tech-info__required">
                <s-text shadow>Требует исследования</s-text>
                <div v-for="required in tech.requiredTeches" :key="tech.innerId">
                    <div>{{ required.technology.name }}</div>
                </div>
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
            <div class="tech-info__actions">
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
        </div>
    </div>
</template>
<script setup lang="ts">
import {showHelpAbout} from "@/__elements/help-drawer/ts";
import {ref} from "vue";
import {Technology, type UserTechnologyQueueResponseDto} from "@/_openapi/models";
import SText from "@/components/common/SText.vue";
import SButton from "@/components/buttons/SButton.vue";
import SInput from "@/components/inputs/SInput.vue";
import {Toast} from "@/__elements/toast/SToast";
import {useApiLazy} from "@/composables/useApi";
import {postApiUserTechAddToQueue} from "@/_openapi/api/user-tech/user-tech";
import {user, userTechQueue} from "@/__stores/user-store";


const {execute: addTechToQueueForResearch} = useApiLazy<UserTechnologyQueueResponseDto[]>();
const tech = ref(showHelpAbout.value?.subject as Technology)
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