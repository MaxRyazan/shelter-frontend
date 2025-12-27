<template>
    <div :class="{'input-shadow': shadow}"
         class="input-wrapper">
        <div class="title" v-if="title">
            <span class="title-text">{{ title }}</span>
        </div>
        <slot name="prefix"></slot>
        <input
            v-model="model"
            :style="{
                width: props.w,
                paddingRight: rewritedType || props.type === 'password' ? '30px' : '8px',
                paddingLeft: slots.prefix ? '36px' : '8px'
            }"
            :class="{
                'input-accent' : accent,
                'input-white' : white,
            }"
            class="accent-input"
            :type="rewritedType ?? props.type"
        />
        <eye-outlined
            @click="rewriteType"
            v-if="props.type === 'password' && !rewritedType"
            class="input-eye"/>
        <eye-invisible-outlined
            @click="rewriteType"
            class="input-eye"
            v-if="props.type === 'password' && rewritedType"/>
    </div>
</template>
<script setup lang="ts">
import {computed, ref, useSlots} from "vue";
import {EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons-vue";

const rewritedType = ref()
const slots = useSlots()

type ModelValue = string | number | boolean | undefined

const emits = defineEmits<{
    (e: 'update:modelValue', p: ModelValue): void
}>()

const props = withDefaults(defineProps<{
    modelValue: ModelValue
    type?: 'text' | 'number' | 'password' | 'checkbox',
    w?: string,
    title?: string,
    accent?: boolean,
    white?: boolean,
    shadow?: boolean,
}>(), {
    type: 'text',
    w: '100%',
    accent: true,
    shadow: false
})

const model = computed({
    get: () => props.modelValue,
    set: (value: ModelValue) => emits('update:modelValue', value)
})

function rewriteType() {
    if (!rewritedType.value) {
        rewritedType.value = 'text';
    } else {
        rewritedType.value = undefined;
    }
}
</script>
<style scoped>
.input-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 36px;
    margin-top: 12px;
}

.title {
    position: absolute;
    top: -12px;
    background-color: var(--prime-back);
    color: var(--accent-light);
    font-size: 12px;
    line-height: 1;
    font-weight: 600;
    font-family: IBM_Plex_Mono sans-serif;
    letter-spacing: 1px;
    cursor: default;
    user-select: none;
}

.accent-input {
    outline: none;
    border-radius: 4px;
    height: 100%;
    font-size: 16px;
    background-color: transparent;
    padding-right: 8px;
    padding-left: 8px;
    position: relative;

    &:focus {
        box-shadow: var(--shadow);
    }
}

.input-eye {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--prime-light);
    cursor: pointer;
}

input[type="checkbox"] {
    border: 1px solid var(--accent-light);
    appearance: none;
    -webkit-appearance: none;
    box-shadow: none !important;
    cursor: pointer;
    background-color: transparent !important;
    position: relative;

    &:checked {
        /* accent-color здесь не работает с appearance: none */
        background-color: rgb(19, 19, 19) !important;
    }


    &:checked::after {
        content: '✓';
        position: absolute;
        color: var(--accent-light);
        font-size: 16px;
        font-weight: bold;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.input-accent {
    border: 1px solid var(--accent-light);
    caret-color: var(--accent-light);
    color: var(--prime-light);

}

.input-white {
    border: 1px solid var(--prime-light);
    caret-color: var(--prime-light);
    color: var(--prime-light);
}

.input-shadow {
    opacity: .3;
}
</style>