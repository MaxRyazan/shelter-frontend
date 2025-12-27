<template>
    <div :class="{'dropdown__open': isOpen}"
         class="dropdown">
        <div @click="isOpen = !isOpen"
             class="dropdown__value">
            <slot/>
            <transition name="arrows" mode="out-in">
                <down-outlined v-if="!isOpen"/>
                <up-outlined v-else/>
            </transition>
        </div>
        <transition name="dropdown">
            <div v-if="isOpen"
                 class="dropdown__list">
                <div v-for="el in variants"
                     :key="el"
                     @click="handleClick(el)"
                     class="dropdown__item">
                    {{ el }}
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {DownOutlined, UpOutlined} from "@ant-design/icons-vue";

const emits = defineEmits<{
    (e: 'click', p: string | number): void
}>()

withDefaults(defineProps<{
    variants?: number[] | string[];
}>(), {
    variants: ['100%', '80%', '60%', '40%', '20%', '0%'] as any
})

const isOpen = ref(false);

function handleClick(arg: string | number) {
    isOpen.value = false;
    emits('click', arg);
}
</script>
<style scoped>
.dropdown {
    position: relative;
    border: 1px solid var(--prime-light);
    border-radius: 4px;
    overflow: hidden;
}

.dropdown__open {
    border-radius: 4px 4px 0 0 !important;
    overflow: visible !important;
}

.dropdown__list {
    position: absolute;
    top: calc(100% - 1px);
    left: -1px;
    z-index: 100;
    background: var(--prime-back);
    width: calc(100% + 2px);
    border-radius: 0 0 4px 4px;
    border-bottom: 1px solid var(--prime-light);
    border-left: 1px solid var(--prime-light);
    border-right: 1px solid var(--prime-light);
}

.dropdown__item {
    display: flex;
    justify-content: center;
    padding: 4px;
    opacity: .3;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }
}

.dropdown-enter-from, .dropdown-leave-to {
    opacity: 0;
}

.dropdown-enter-active, .dropdown-leave-active {
    transition: .2s;
}

.arrows-enter-from, .arrows-leave-to {
    transform: rotateX(90deg);
}

.arrows-enter-active, .arrows-leave-active {
    transition: .2s;
}

.dropdown__value {
    width: 100%;
    display: flex;
    gap: 8px;
    justify-content: space-between;
    padding: 4px;
    cursor: pointer;
}
</style>