<template>
    <div class="tech-queue-help">
        <div class="tech-queue-help__item"
             v-for="tech in sortedQueue"
             :key="tech.techInnerId">
            <div class="flexbox">
                <s-text shadow>Название</s-text>
                <s-text>{{ tech.techName }}</s-text>
            </div>
            <div class="flexbox">
                <s-text shadow>Текущий исследованный уровень</s-text>
                <s-text>{{ tech.currentLevel }}</s-text>
            </div>
            <div class="flexbox">
                <s-text shadow>Исследуемый уровень</s-text>
                <s-text> {{ tech.targetLevel }}</s-text>
            </div>
            <div class="flexbox">
                <s-text shadow>Исследовано</s-text>
                <s-text>{{ tech.readyPercent }}%</s-text>
            </div>
            <div class="flexbox">
                <s-text shadow>Прогресс</s-text>
                <s-text class="text-ellipsis">
                    {{ tech.scienceInvested?.toFixed(3) }} / {{ tech.needScience?.toFixed(3) }}
                </s-text>
            </div>
            <div class="flexbox">
                <s-text shadow>Начато</s-text>
                <s-text>{{ dayjs(tech.startedAt).format('DD.MM.YY HH:mm') }}</s-text>
            </div>
            <div class="flexbox">
                <s-text shadow>Будет готово</s-text>
                <s-text>{{ dayjs(tech.readyAt).format('DD.MM.YY HH:mm') }}</s-text>
            </div>
            <div v-if="tech.currentLevel && tech.currentLevel > 0 && tech.bonuses?.length"
                 class="flexbox"
                 style="flex-direction: column; margin-top: 20px; gap: 0">
                <s-text shadow>Текущие бонусы</s-text>
                <s-text class="flexbox" v-for="bonus in tech.bonuses">
                    <div class="text-ellipsis">{{ bonus.description }}</div>
                    <div>{{ bonus.valuePerLevel * (tech.currentLevel ?? 0) }}%</div>
                </s-text>
            </div>
            <div v-if="tech.bonuses?.length"
                 class="flexbox" style="flex-direction: column; margin-top: 20px; gap: 0">
                <s-text shadow>Бонусы за каждый уровень</s-text>
                <s-text class="flexbox" v-for="bonus in tech.bonuses">
                    <div class="text-ellipsis">{{ bonus.description }}</div>
                    <div>{{ bonus.valuePerLevel }}%</div>
                </s-text>
            </div>
            <div v-if="typeof tech.efficiency === 'number'"
                 class="flexbox">
                <s-text shadow>Эффективность</s-text>
                <s-dropdown @click="(p: string | number) => changeEfficiency(p, tech)"
                            style="width: 80px; height: 30px; border: 1px solid var(--accent-light)">
                    {{ tech.efficiency * 100 }}%
                </s-dropdown>
            </div>
            <user-tech-queue-component v-if="tech.status === 'active'"
                                       style="width: 100%; margin-top: 20px;"
                                       :watched-tech-inner-id="tech.techInnerId"/>
            <div v-if="tech.status === 'paused'" class="tech-queue-help__paused">ИССЛЕДОВАНИЕ ОСТАНОВЛЕНО</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {user, userTechQueue} from "@/__stores/user-store";
import dayjs from "dayjs";
import SText from "@/components/common/SText.vue";
import {computed} from "vue";
import UserTechQueueComponent from "@/components/UserTechQueueComponent.vue";
import SDropdown from "@/components/inputs/SDropdown.vue";
import {UserTechnologyQueueResponseDto} from "@/_openapi/models";
import {useApiLazy} from "@/composables/useApi";
import {putApiUserTechChangeTechSpeedPercentInQueue} from "@/_openapi/api/user-tech/user-tech";
import {toNum} from "@/helpers";

const {execute} = useApiLazy<UserTechnologyQueueResponseDto[]>()

const sortedQueue = computed(() =>
    userTechQueue.value.toSorted((a, b) =>
        dayjs(a.readyAt).isBefore(dayjs(b.readyAt)) ? -1 : 1
    )
)

async function changeEfficiency(p: string | number, tech: UserTechnologyQueueResponseDto) {
    console.log(p)
    const response = await execute(putApiUserTechChangeTechSpeedPercentInQueue, {
        userId: user.value?.id,
        techInnerId: tech.techInnerId,
        newEfficiency: toNum(p.toString().replace('%', '')),
    })
    if (response) {
        userTechQueue.value = response
    }
}
</script>
<style scoped>
.tech-queue-help {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px;
}

.tech-queue-help__item {
    border: 1px solid var(--prime-light03);
    border-radius: 4px;
    padding: 6px;
}

.tech-queue-help__paused {
    border: 1px solid var(--accent-light);
    border-radius: 4px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
:deep(.dropdown__list) {
    border-left: 1px solid var(--accent-light);
    border-right: 1px solid var(--accent-light);
    border-bottom: 1px solid var(--accent-light);
}
</style>