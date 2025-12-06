<template>
    <div class="reg-form">
        <close-outlined @click="emits('close')" class="close-icon"/>
        <accent-input v-model="reg.email">
            <template #prefix>
                <mail-outlined class="input-icon"/>
            </template>
        </accent-input>
        <accent-input v-model="reg.login">
            <template #prefix>
                <user-outlined class="input-icon"/>
            </template>
        </accent-input>
        <accent-input v-model="reg.password"
                      type="password">
            <template #prefix>
                <key-outlined class="input-icon"/>
            </template>
        </accent-input>
        <accent-input v-model="reg.confirmPassword"
                      type="password">
            <template #prefix>
                <key-outlined class="input-icon"/>
            </template>
        </accent-input>
        <accent-button @click="registration"
                       class="reg-button">
            Регистрация
        </accent-button>
    </div>
</template>
<script setup lang="ts">
import {CloseOutlined, KeyOutlined, MailOutlined, UserOutlined} from "@ant-design/icons-vue";
import AccentInput from "@/components/inputs/AccentInput.vue";
import AccentButton from "@/components/buttons/AccentButton.vue";
import {ref} from "vue";

const emits = defineEmits<{
    (e: 'close'): void
}>()

const reg = ref({
    email: "",
    login: "",
    password: "",
    confirmPassword: "",
})

function registration() {
}
</script>
<style scoped>
.reg-form {
    padding: 24px 24px 12px 24px;
    position: absolute;
    top: 0;
    inset: 0 0 0 0;
    border-radius: 12px;
    background-color: #091313;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: end;
}

.close-icon {
    color: var(--accent-light);
    cursor: pointer;
    position: absolute;
    right: 12px;
    top: 12px;
}

.input-icon {
    position: absolute;
    left: 12px;
    font-size: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--prime-light);
}

.reg-button {
    width: 120px;
    height: 36px;
    color: var(--prime-light);
    margin-top: 14px;
}
</style>