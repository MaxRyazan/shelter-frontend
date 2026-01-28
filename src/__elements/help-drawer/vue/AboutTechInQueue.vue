<template>
<div class="tech-queue-help">
    <div class="tech-queue-help__item"
         v-for="tech in userTechQueue"
         :key="tech.techInnerId">
        <div class="flexbox">
            <s-text shadow>Название</s-text>
            <s-text>{{tech.techName}}</s-text>
        </div>
        <div class="flexbox">
            <s-text shadow>Уровень технологии</s-text>
            <s-text>{{tech.currentLevel}} -> {{tech.targetLevel}}</s-text>
        </div>
        <div class="flexbox">
            <s-text shadow>Исследовано</s-text>
            <s-text>{{tech.readyPercent}}%</s-text>
        </div>
        <div class="flexbox">
            <s-text shadow>Прогресс</s-text>
            <s-text class="text-ellipsis">
                {{tech.scienceInvested?.toFixed(3)}} / {{tech.needScience?.toFixed(3)}}
            </s-text>
        </div>
        <div class="flexbox">
            <s-text shadow>Начато</s-text>
            <s-text>{{dayjs(tech.startedAt).format('DD.MM.YY HH:mm')}}</s-text>
        </div>
        <div class="flexbox">
            <s-text shadow>Будет готово</s-text>
            <s-text>{{dayjs(tech.readyAt).format('DD.MM.YY HH:mm')}}</s-text>
        </div>
        <div class="flexbox" style="flex-direction: column; margin-top: 20px; gap: 0">
            <s-text shadow>Текущие бонусы</s-text>
            <s-text class="flexbox" v-for="bonus in tech.bonuses">
                <div class="text-ellipsis">{{bonus.description}}</div>
                <div>{{bonus.valuePerLevel * (tech.currentLevel ?? 0)}}%</div>
            </s-text>
        </div>
        <div v-if="tech.bonuses?.length"
             class="flexbox" style="flex-direction: column; margin-top: 20px; gap: 0">
            <s-text shadow>Бонусы за каждый уровень</s-text>
            <s-text class="flexbox" v-for="bonus in tech.bonuses">
                <div class="text-ellipsis">{{bonus.description}}</div>
                <div>{{bonus.valuePerLevel}}%</div>
            </s-text>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import {userTechQueue} from "@/__stores/user-store";
import dayjs from "dayjs";
import SText from "@/components/common/SText.vue";
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
</style>