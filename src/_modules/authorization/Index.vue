<template>
    <div class="auth">
        <div class="auth-form">
            <s-text class="hello">{{ hello }}</s-text>
            <auth-form/>
            <registration-button
                @click="showRegForm = true"/>
            <transition name="reg">
                <registration-form
                    @close="showRegForm = false"
                    v-if="showRegForm"/>
            </transition>
        </div>
    </div>
</template>
<script setup lang="ts">
import {computed, ref} from "vue";
import dayjs from "dayjs";
import SText from "@/components/common/SText.vue";
import AuthForm from "@/_modules/authorization/AuthForm.vue";
import RegistrationButton from "@/_modules/authorization/RegistrationButton.vue";
import RegistrationForm from "@/_modules/authorization/RegistrationForm.vue";

const showRegForm = ref(false);

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


</script>
<style scoped>
.auth {
    width: 100%;
    height: 100vh;
    background-color: var(--prime-back);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
}

.auth-form {
    overflow: hidden;
    position: relative;
    border-radius: 12px;
    max-width: 500px;
    width: 100%;
    padding: 54px 48px 36px 36px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 16px;
    align-items: end;
    background-color: var(--green-dark);
}


.hello {
    align-self: center;
    color: var(--prime-light);
    font-size: 16px;
    font-weight: 600;
}

.reg-enter-from, .reg-leave-to {
    transform: translateX(120%);
}

.reg-enter-active, .reg-leave-active {
    transition: transform .3s;
}
</style>