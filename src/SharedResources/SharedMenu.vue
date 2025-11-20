<template>
    <div class="shared__top-menu">
            <span class="shared__top-menu-item"
                  :class="{active: currentTab==='resources'}"
                  @click="emits('click', 'resources')">
                Ресурсы
            </span>
        <span class="shared__top-menu-item"
              :class="{active: currentTab==='materials'}"
              @click="emits('click', 'materials')">
                Материалы
            </span>
        <span class="shared__top-menu-item"
              :class="{active: currentTab==='metamaterials'}"
              @click="emits('click', 'metamaterials')">
                Метаматериалы
            </span>
        <span class="shared__top-menu-item"
              :class="{active: currentTab==='components' }"
              @click="emits('click', 'components')">
                Компоненты
            </span>
    </div>
</template>
<script setup lang="ts">

const emits = defineEmits<{
    (e: 'click', p: string): void
}>()
defineProps<{
    currentTab: string
}>()
</script>
<style scoped>
.shared__top-menu {
    display: flex;
    justify-content: space-evenly;
    gap: 10px;
    flex-wrap: nowrap;
    padding: 10px 0 14px 0;

    & span {
        cursor: pointer;
    }
}

.active {
    color: var(--accent)
}

.shared__top-menu-item {
    font-family: IBM_Plex_Mono monospace !important;
    font-weight: 700;
}
</style>