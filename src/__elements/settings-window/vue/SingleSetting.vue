<template>
    <div class="setting__wrapper">
        <s-input
            class="setting__checkbox"
            type="checkbox"
            v-model="input"/>
        <s-text bold>{{ description }}</s-text>
    </div>
</template>
<script setup lang="ts">
import SInput from "@/components/inputs/SInput.vue";
import SText from "@/components/common/SText.vue";
import {computed, onMounted, ref, watch} from "vue";
import {_userSettings} from "@/__elements/settings-window/ts";

const emits = defineEmits<{
    (e: 'handle-change-setting', p: boolean): void
}>()

const props = defineProps<{
    description: string
    name: string
}>()

//@ts-ignore
const currentValue = computed(() => _userSettings.value[props.name])

const input = ref(currentValue.value || false)

watch(input, () => {
    emits('handle-change-setting', input.value);
})

onMounted(() => {
    input.value = currentValue.value || false;
})
</script>
<style scoped>
.setting__wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.setting__checkbox {
    width: 24px;
    height: 24px;
    margin: 0;
}
</style>