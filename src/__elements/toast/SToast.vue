<template>
    <div class="toast-container">
        <TransitionGroup name="toast">
            <div
                v-for="toast in Toast.toasts.value"
                :key="toast.id"
                :class="['toast', `toast--${toast.type}`]"
                @click="Toast.hide(toast.id)">
                <div class="toast-content">
                    <div class="toast__icon">
                        <CheckCircleOutlined v-if="toast.type === 'success'"/>
                        <CloseCircleOutlined v-if="toast.type === 'error'"/>
                        <ExclamationCircleOutlined v-if="toast.type === 'warning'"/>
                        <InfoCircleOutlined v-if="toast.type === 'info'"/>
                    </div>

                    <div class="toast__message">
                        {{ toast.message }}
                    </div>
                </div>

                <button
                    class="toast__close"
                    @click.stop="Toast.hide(toast.id)"
                    aria-label="Закрыть">
                    <CloseOutlined/>
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    InfoCircleOutlined,
    CloseOutlined
} from '@ant-design/icons-vue'
import { Toast } from "@/__elements/toast/SToast";
</script>

<style scoped>
/* Контейнер для всех тостов */
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;
}

.toast {
    position: relative;
    max-height: 120px;
    overflow-y: auto;
    min-width: 200px;
    max-width: 480px;
    padding: 4px 8px;
    border-radius: 8px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.3),
    0 3px 6px -4px rgba(0, 0, 0, 0.25),
    0 9px 28px 8px rgba(0, 0, 0, 0.2);
    justify-content: space-between;
    display: flex;
    align-items: start;
    gap: 12px;
    cursor: pointer;
    user-select: none;
    pointer-events: auto;
    background: #191919;
    border: 1px solid var(--prime-light);
}
.toast-content {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
}

.toast__icon {
    flex-shrink: 0;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
}

.toast--success .toast__icon {
    color: #52c41a;
}

.toast--error .toast__icon {
    color: #ff4d4f;
}

.toast--warning .toast__icon {
    color: #faad14;
}

.toast--info .toast__icon {
    color: #1890ff;
}

.toast__message {
    flex-grow: 1;
    font-size: 14px;
    line-height: 1.5715;
    color: var(--prime-light);
    font-family: IBM_Plex_Mono, monospace;
    max-width: fit-content;
}

.toast__close {
    flex-shrink: 0;
    background: none;
    border: none;
    width: 24px;
    height: 24px;
    padding: 0;
    margin: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s;
    color: #a0a0a0;
}

.toast__close:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--prime-light);
}

.toast__close:active {
    background-color: rgba(255, 255, 255, 0.15);
}

.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
.toast-move,
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.toast-leave-active {
    position: absolute;
    right: 0;
    left: 0;
}

@media (max-width: 640px) {
    .toast-container {
        right: 10px;
        top: 16px;
        max-width: 320px;
        min-width: fit-content;
    }

    .toast-enter-from,
    .toast-leave-to {
        transform: translateX(30px);
    }
}

@media (max-width: 480px) {
    .toast {
        gap: 8px;
        max-width: 280px;
        min-width: fit-content;
    }

    .toast__icon {
        font-size: 18px;
        width: 20px;
        height: 20px;
    }

    .toast__message {
        font-size: 13px;
    }

    .toast__close {
        width: 20px;
        height: 20px;
    }
}
</style>