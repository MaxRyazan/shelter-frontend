<template>
    <Transition name="toast">
        <div
            v-if="Toast.toast.value.message"
            :class="['toast', `toast--${Toast.toast.value.type}`]"
            @click="Toast.hide()">
            <div class="toast__icon">
                <CheckCircleOutlined v-if="Toast.toast.value.type === 'success'"/>
                <CloseCircleOutlined v-if="Toast.toast.value.type === 'error'"/>
                <ExclamationCircleOutlined v-if="Toast.toast.value.type === 'warning'"/>
                <InfoCircleOutlined v-if="Toast.toast.value.type === 'info'"/>
            </div>

            <div class="toast__message">
                {{ Toast.toast.value.message }}
            </div>

            <button
                class="toast__close"
                @click.stop="Toast.hide()"
                aria-label="Закрыть">
                <CloseOutlined/>
            </button>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    InfoCircleOutlined,
    CloseOutlined
} from '@ant-design/icons-vue'
import {Toast} from "@/__elements/toast/SToast";
</script>
<style scoped>
.toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;

    max-height: 120px;
    overflow-y: auto;
    min-width: 300px;
    max-width: 480px;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.3),
    0 3px 6px -4px rgba(0, 0, 0, 0.25),
    0 9px 28px 8px rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: start;
    gap: 12px;

    cursor: pointer;
    user-select: none;

    background: #191919;
    border: 1px solid var(--prime-light);
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
    font-weight: 500;
    color: var(--prime-light);
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
    transform: translateX(-50%) translateY(-20px);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
}

@media (max-width: 640px) {
    .toast {
        left: 16px;
        right: 16px;
        min-width: auto;
        max-width: none;
        transform: none;
    }

    .toast-enter-from,
    .toast-leave-to {
        transform: translateY(-20px);
    }
}

@media (max-width: 480px) {
    .toast {
        padding: 12px 16px;
        gap: 8px;
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