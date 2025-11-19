import {ref} from "vue";

export interface Resources {
    Clay: { Amount: number, TotalVolume: number };
    Iron: { Amount: number, TotalVolume: number };
    Limestone: { Amount: number, TotalVolume: number };
    Coal: { Amount: number, TotalVolume: number };
    Molybdenum: { Amount: number, TotalVolume: number };
    Nickel: { Amount: number, TotalVolume: number };
    Boron: { Amount: number, TotalVolume: number };
    Copper: { Amount: number, TotalVolume: number };
    Vanadium: { Amount: number, TotalVolume: number };
    Oil: { Amount: number, TotalVolume: number };
    Titanium: { Amount: number, TotalVolume: number };
    Magnesium: { Amount: number, TotalVolume: number };
}

export interface Materials {
    Concrete: { Amount: number, TotalVolume: number };
    Steel: { Amount: number, TotalVolume: number };
    Polymers: { Amount: number, TotalVolume: number };
    Titan: { Amount: number, TotalVolume: number };
    Aluminum: { Amount: number, TotalVolume: number };
}

export interface MetaMaterials {
    ArmoredSteel: { Amount: number, TotalVolume: number };
    ElectronicComponents: { Amount: number, TotalVolume: number };
    AramidFiber: { Amount: number, TotalVolume: number };
    ReinforcedTitanium: { Amount: number, TotalVolume: number };
    AmorphousMetal: { Amount: number, TotalVolume: number };
    AluminumMagnesiumAlloy: { Amount: number, TotalVolume: number };
}

export interface Components {
    Computers: { Amount: number, TotalVolume: number }
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
        Clay: {Amount: 0, TotalVolume: 0},
        Iron: {Amount: 0, TotalVolume: 0},
        Limestone: {Amount: 0, TotalVolume: 0},
        Coal: {Amount: 0, TotalVolume: 0},
        Molybdenum: {Amount: 0, TotalVolume: 0},
        Nickel: {Amount: 0, TotalVolume: 0},
        Boron: {Amount: 0, TotalVolume: 0},
        Copper: {Amount: 0, TotalVolume: 0},
        Vanadium: {Amount: 0, TotalVolume: 0},
        Oil: {Amount: 0, TotalVolume: 0},
        Titanium: {Amount: 0, TotalVolume: 0},
        Magnesium: {Amount: 0, TotalVolume: 0},
    },
    Materials: {
        Concrete: {Amount: 0, TotalVolume: 0},
        Steel: {Amount: 0, TotalVolume: 0},
        Polymers: {Amount: 0, TotalVolume: 0},
        Titan: {Amount: 0, TotalVolume: 0},
        Aluminum: {Amount: 0, TotalVolume: 0},
    },
    MetaMaterials: {
        ArmoredSteel: {Amount: 0, TotalVolume: 0},
        ElectronicComponents: {Amount: 0, TotalVolume: 0},
        AramidFiber: {Amount: 0, TotalVolume: 0},
        ReinforcedTitanium: {Amount: 0, TotalVolume: 0},
        AmorphousMetal: {Amount: 0, TotalVolume: 0},
        AluminumMagnesiumAlloy: {Amount: 0, TotalVolume: 0},
    },
    Components: {
        Computers: {Amount: 0, TotalVolume: 0}
    }
})

export const isSharedResourcesWindowOpen = ref(false);