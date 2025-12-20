<template>
    <div class="auth-form-wrapper">
        <s-input white v-model="auth.email">
            <template #prefix>
                <mail-outlined class="input-icon"/>
            </template>
        </s-input>
        <s-input white v-model="auth.password"
                      type="password">
            <template #prefix>
                <key-outlined class="input-icon"/>
            </template>
        </s-input>
        <div class="button-block">
            <div class="agree-wrapper">
                <s-input class="checkbox"
                              v-model="auth.saveMe"
                              type="checkbox">
                </s-input>
                <s-text color="var(--prime-light)">Запомнить меня?</s-text>
            </div>
            <s-button white @click="authenticate"
                           class="auth-button">Войти
            </s-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import SInput from "@/components/inputs/SInput.vue";
import {KeyOutlined, MailOutlined} from "@ant-design/icons-vue";
import SButton from "@/components/buttons/SButton.vue";
import SText from "@/components/common/SText.vue";
import {onMounted, ref} from "vue";
import {user} from "@/__stores/user-store";
import {useRouter} from "vue-router";
import {useCookies} from "@vueuse/integrations/useCookies";
import {authentication} from "@/__elements/authorization/ts";

const router = useRouter()
const cookies = useCookies()


const auth = ref({
    email: "",
    password: "",
    saveMe: false,
})

async function authenticate() {
    await authentication({email: auth.value.email, password: auth.value.password, saveMe: auth.value.saveMe})
    if (user.value?.id) {
        await router.push('/')
    }
}

onMounted(() => {
    const result = cookies.get("shelter-email");
    if (result) {
        auth.value.email = result
    }
})
</script>
<style scoped>
.auth-button {
    width: 120px;
    height: 36px;
    color: var(--prime-light);
}

.button-block {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.input-icon {
    position: absolute;
    left: 12px;
    font-size: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--prime-light);
}

.checkbox {
    margin: 0;
    width: 20px;
    height: 20px;
    outline: none;
    border-radius: 4px;
}

.agree-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.auth-form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
}
</style>