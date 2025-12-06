<template>
    <svg @click="switchSharedResources"
         class="shared-storage-icon"
         width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15.5" cy="14.5" r="6.5" fill="currentColor"/>
        <path d="M13.2024 25.0204C30.3396 26.3999 26.2881 10 26.2881 10" stroke="currentColor" stroke-linecap="round"/>
        <line x1="0.5" y1="-0.5" x2="2.82419" y2="-0.5"
              transform="matrix(-0.588352 -0.808605 0.812612 -0.582805 15.2749 27.1012)" stroke="currentColor"
              stroke-linecap="round"/>
        <line x1="0.5" y1="-0.5" x2="2.83017" y2="-0.5"
              transform="matrix(0.771547 -0.636172 0.641623 0.76702 13.1906 25.6303)" stroke="currentColor"
              stroke-linecap="round"/>
        <path d="M18.2242 3.77018C0.676247 2.46327 4.82487 18 4.82487 18" stroke="currentColor" stroke-linecap="round"/>
        <line x1="0.5" y1="-0.5" x2="2.73965" y2="-0.5"
              transform="matrix(0.618178 0.786038 -0.833248 0.552899 16.102 1.79882)" stroke="currentColor"
              stroke-linecap="round"/>
        <line x1="0.5" y1="-0.5" x2="2.80912" y2="-0.5"
              transform="matrix(-0.795066 0.606522 -0.670665 -0.74176 18.2363 3.19233)" stroke="currentColor"
              stroke-linecap="round"/>
    </svg>
</template>
<script setup lang="ts">
import {isSharedResourcesWindowOpen} from "@/__stores/shared-resources-store";

function switchSharedResources() {
    isSharedResourcesWindowOpen.value = !isSharedResourcesWindowOpen.value
}
</script>
<style scoped>
.shared-storage-icon {
    width: 30px;
    height: 30px;
    border: 1px solid var(--accent);
    border-radius: 4px;
    cursor: pointer !important;
    color: var(--accent);

    &:hover {
        color: var(--accent-light);
        box-shadow: var(--shadow);
        border: 1px solid var(--accent-light);
        transition: .2s;
    }

    &:active {
        box-shadow: 0 0 0 1px var(--accent);
    }
}
</style>