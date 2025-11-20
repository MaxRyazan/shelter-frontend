<template>
    <space-between style="align-items: center">
        <span>{{ map.get(name) }}</span>
        <div class="shared__single-line-wrapper">
            <div class="shared__single-line-item">
                {{ $rs(value.Amount, 3) }}
            </div>
            <div class="shared__single-line-item">
                {{ $rs(value.TotalVolume, 3) }}
            </div>
            <input
                @keydown.esc="blurInput"
                @keydown.enter="remove"
                @keydown.stop
                v-model="inputValue"
                class="shared__remove-input"
                type="number">
            <transition name="fade" mode="out-in">
                <div v-if="success && !apiError"
                     style="cursor:pointer;">
                    ✅
                </div>
                <div v-else @click="remove()"
                     style="cursor:pointer;">
                    ❌
                </div>
            </transition>
        </div>
    </space-between>
</template>
<script setup lang="ts">
import {$rs} from "@/helpers.ts";
import SpaceBetween from "@/components/containers/SpaceBetween.vue";
import {ref} from "vue";
import {user} from "@/__global/UserStore.ts";
import {useTimeoutFn} from '@vueuse/core';
import {useFetch} from '@vueuse/core';

const props = defineProps<{
    name: string,
    value: { Amount: number, TotalVolume: number },
    map: Map<string, string>,
}>()

const apiError = ref()
const success = ref(false);
const inputValue = ref();

function blurInput(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement
    if (target) target.blur();
}

async function remove() {
    if (!inputValue.value || inputValue.value > props.value.Amount) return
    try {
        const body = {userId: user.value.id, resourceName: props.name, countToRemove: inputValue.value};
        const {error} = await useFetch('http://localhost:5083/api/user/remove-shared-item', {
            method: 'POST', body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        apiError.value = error.value;
        inputValue.value = undefined
    } catch (e) {
    } finally {
        success.value = true
        useTimeoutFn(() => {
            success.value = false
        }, 1000)
    }
}
</script>
<style scoped>
.shared__remove-input {
    width: 60px;
    background-color: transparent;
    color: var(--prime-light);
    padding: 2px 6px;
    font-size: 12px;
    border: 1px solid var(--prime-light);;
    outline: none;
    border-radius: 4px;
    text-align: center;
}

input[type="number"] {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    appearance: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.shared__single-line-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
}

.shared__single-line-item {
    color: var(--prime-light);
    width: 80px;
    display: flex;
    justify-content: end;
}

.fade-enter-active, .fade-leave-active {
    transition: 0.2s;
}

.fade-leave-to, .fade-enter-from {
    opacity: 0;
    transform: rotateY(180deg);
}
</style>