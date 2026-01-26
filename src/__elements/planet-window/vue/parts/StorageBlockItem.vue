<template>
    <div class="storage-item">
        <div :class="{
                'resource-color' : type === StorageTypes.resources,
                'material-color' : type === StorageTypes.materials,
                'metamaterial-color' : type === StorageTypes.metamaterials,
                'component-color' : type === StorageTypes.components,
             }"
             class="storage-item__name">{{ Dictionary.get(item.type!) }}
        </div>
        <div class="storage-item__info">
            <div class="storage-item__amount">{{ $rs(item.amount, 3) }}</div>
            <div class="storage-item__volume">{{ $rs(item.volume, 3) }}</div>
            <s-input class="storage-item__input"
                     white
                     font="12px"
                     no-margin
                     text-align="center"
                     v-model="count"/>
            <red-cross
                @click="removeItem"
                class="storage-item__remove-icon"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import type {GetPlanetResponseDto, PlanetStorageDto, StorageItemDto} from "@/_openapi/models";
import {StorageTypes} from "@/__elements/planet-window/ts/enums";
import RedCross from "@/components/icons/RedCross.vue";
import {Dictionary} from "@/dictionaries";
import {$rs} from "@/helpers";
import {useApiLazy} from "@/composables/useApi";
import {postApiPlanetRemoveFromStorage} from "@/_openapi/api/planet/planet";
import {currentPlanet} from "@/__elements/planet-window/ts";
import SInput from "@/components/inputs/SInput.vue";
import {ref} from "vue";
import {Toast} from "@/__elements/toast/SToast";
import {user} from "@/__stores/user-store";
import {postApiUserRemoveSharedItem} from "@/_openapi/api/users/users";
import {sharedItems} from "@/__elements/shared-resources-window/ts";

const props = defineProps<{
    item: StorageItemDto
    type: StorageTypes
    idx: number
    shared?: boolean
}>()

const count = ref()
const {execute, error} = useApiLazy<GetPlanetResponseDto>()
const {execute: shared} = useApiLazy<PlanetStorageDto>()

async function removeItem() {
    if (!count.value) {
        Toast.info(`Сколько удалять ${Dictionary.get(props.item.type!)} ?`)
        return
    }
    if(props.shared) {
        const response = await shared(postApiUserRemoveSharedItem, {
            userId: user.value?.id,
            planetId: currentPlanet.value?.id,
            gameItemType: props.item.type,
            amount: count.value
        })
        if (response) {
            sharedItems.value = response
        } else if (error.value) {
            Toast.error(error.value.detail)
        }
    }
    if(!props.shared) {
        const response = await execute(postApiPlanetRemoveFromStorage, {
            userId: user.value?.id,
            planetId: currentPlanet.value?.id,
            gameItemType: props.item.type,
            amount: count.value
        })
        if (response) {
            currentPlanet.value = response
        } else if (error.value) {
            Toast.error(error.value.detail)
        }
    }
}
</script>
<style scoped>
.storage-item {
    display: flex;
    justify-content: space-between;
    font-family: IBM_Plex_Mono, monospace;
    font-weight: 400;
}

.storage-item__name {
    flex-grow: 1;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-family: IBM_Plex_Mono, monospace;

}

.storage-item__info {
    flex-grow: 0;
    display: flex;
    gap: 10px;
    align-items: center;
}

.storage-item__input {
    width: 60px;
    height: 18px;
}

.storage-item__remove-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.storage-item__amount {
    font-weight: 600;
    width: 70px;
    text-align: end;
}

.storage-item__volume {
    width: 70px;
    text-align: end;
}
</style>