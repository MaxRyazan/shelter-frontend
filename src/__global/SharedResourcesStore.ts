import {ref} from "vue";

export interface Resources {
    Clay: number;
    Iron: number;
    Limestone: number;
    Coal: number;
    Molybdenum: number;
    Nickel: number;
    Boron: number;
    Copper: number;
    Vanadium: number;
    Oil: number;
    Titanium: number;
    Magnesium: number;
}
export interface Materials {
    Concrete: number;
    Steel: number;
    Polymers: number;
    Titan: number;
    Aluminum: number;
}
export interface MetaMaterials {
    ArmoredSteel: number;
    ElectronicComponents: number;
    AramidFiber: number;
    ReinforcedTitanium: number;
    AmorphousMetal: number;
    AluminumMagnesiumAlloy: number;
}

export interface Components {
    Computers: number
}

export interface SharedResources {
    UserId: number | undefined
    CurrentStorage: number,
    IsOverflow: boolean,
    MaxStorage: number,
    StorageUsagePercent: number,
    Resources: Resources,
    Materials: Materials,
    MetaMaterials: MetaMaterials,
    Components: Components
}

export const SharedResourcesStore = ref<SharedResources>({
    UserId: undefined,
    CurrentStorage: 0,
    IsOverflow: false,
    MaxStorage: 0,
    StorageUsagePercent: 0,
    Resources: {
        Clay: 0,
        Iron: 0,
        Limestone: 0,
        Coal: 0,
        Molybdenum: 0,
        Nickel: 0,
        Boron: 0,
        Copper: 0,
        Vanadium: 0,
        Oil: 0,
        Titanium: 0,
        Magnesium: 0,
    },
    Materials: {
        Concrete: 0,
        Steel: 0,
        Polymers: 0,
        Titan: 0,
        Aluminum: 0,
    },
    MetaMaterials: {
        ArmoredSteel: 0,
        ElectronicComponents: 0,
        AramidFiber: 0,
        ReinforcedTitanium: 0,
        AmorphousMetal: 0,
        AluminumMagnesiumAlloy: 0,
    },
    Components: {
        Computers: 0
    }
})

export const isSharedResourcesWindowOpen = ref(false);