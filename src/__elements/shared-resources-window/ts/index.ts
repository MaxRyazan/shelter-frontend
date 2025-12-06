import {ref} from "vue";
import {SharedResources} from "@/__elements/shared-resources-window/ts/types";

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