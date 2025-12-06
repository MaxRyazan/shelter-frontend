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