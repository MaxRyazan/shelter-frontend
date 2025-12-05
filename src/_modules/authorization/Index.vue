<template>
    <div class="auth">
        <div class="auth-form">
            <s-text class="hello">{{ hello }}</s-text>
            <accent-input v-model="auth.email">
                <template #prefix>
                    <mail-outlined class="input-icon"/>
                </template>
            </accent-input>
            <accent-input v-model="auth.password"
                          type="password">
                <template #prefix>
                    <key-outlined class="input-icon"/>
                </template>
            </accent-input>
            <div class="button-block">
                <div class="agree-wrapper">
                    <accent-input class="checkbox"
                                  v-model="auth.saveMe"
                                  type="checkbox">
                    </accent-input>
                    <s-text color="var(--prime-light)">Запомнить меня?</s-text>
                </div>
                <accent-button @click="authentication"
                               class="auth-button">Войти
                </accent-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import AccentInput from "@/components/inputs/AccentInput.vue";
import AccentButton from "@/components/buttons/AccentButton.vue";
import {MailOutlined, KeyOutlined} from "@ant-design/icons-vue";
import {computed, onMounted, ref} from "vue";
import dayjs from "dayjs";
import SText from "@/components/common/SText.vue";
import {postApiAuthLogin} from "@/_openapi/api/auth/auth";
import {useCookies} from '@vueuse/integrations/useCookies'
import {user} from "@/__global/UserStore";
import {useRouter} from "vue-router";

const router = useRouter()
const cookies = useCookies(['shelter-email'])
const auth = ref({
    email: "",
    password: "",
    saveMe: false,
})

const hello = computed(() => {
    const now = dayjs().hour()
    if (now >= 5 && now < 11) {
        return 'Доброе утро :)'
    }
    if (now >= 11 && now < 17) {
        return 'Добрый день :)'
    }
    if (now >= 17 && now < 22) {
        return 'Добрый вечер :)'
    }
    if (now >= 22 || now < 5) {
        return 'Доброй ночи :)'
    }
})

async function authentication() {
    if (auth.value.email && auth.value.password) {
        try {
            const response = await postApiAuthLogin({
                email: auth.value.email,
                password: auth.value.password
            })
            if (auth.value.saveMe) {
                cookies.set("shelter-email", auth.value.email)
            }
            user.value = response.user
            await router.push('/')
        } catch (e) {
        } finally {
        }
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
.auth {
    width: 100%;
    height: 100vh;
    background-color: var(--prime-back);
    display: flex;
    align-items: center;
    justify-content: center;
}

.auth-form {
    border-radius: 12px;
    max-width: 500px;
    width: 96%;
    padding: 54px 36px 36px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 16px;
    align-items: end;
    background-color: var(--green-dark);
}

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

.hello {
    align-self: center;
    color: var(--prime-light);
    font-size: 16px;
    font-weight: 600;
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
</style>