<template>
    <div class="registration">
        <span v-for="(symbol, idx) in 'Регистрация'"
              :key="idx" class="registration-title">
        {{ symbol }}
        </span>
    </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
.registration {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    right: 0;
    background-color: var(--accent-light);
    height: 100%;
    padding: 10px;
    top: 0;
    width: 30px;
    border-radius: 0 12px 12px 0;
    cursor: pointer;
    animation: pulse 2s infinite;
}

.registration-title {
    color: #191919;
    user-select: none;
    font-weight: 600;
    font-family: IBM_Plex_Mono, sans-serif;
}

@keyframes pulse {
    0% {
       opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
}
</style>