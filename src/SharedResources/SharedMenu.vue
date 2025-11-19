<template>
    <div class="shared__top-menu">
            <span :class="{active: currentTab==='resources'}"
                  @click="emits('click', 'resources')">
                Ресурсы
            </span>
        <span :class="{active: currentTab==='materials'}"
              @click="emits('click', 'materials')">
                Материалы
            </span>
        <span :class="{active: currentTab==='metamaterials'}"
              @click="emits('click', 'metamaterials')">
                Метаматериалы
            </span>
        <span :class="{active: currentTab==='components' }"
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
</style>