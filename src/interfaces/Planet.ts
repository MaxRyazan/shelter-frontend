export interface Planet {
    id: number,
    name: string,
    radius: number,
    hasAtmosphere: boolean,
    hasMagneticField: boolean,
    isHomePlanet: boolean,
    averageTemperature: number,
    square: number,
    freeSquare: number,
    gravityPower: number,
    distanceFromStar: number,
    planetOwnerId: number,
    planetOwnerName: string,
    buildings: [],
    buildingQueue: [],
    citizens: {
        "maxCitizens": number,
        "currentCitizens": number,
        "consuming": number,
        "balance": number,
        "notEnoughCitizensPercent": number,
        "birthRate": number
    },
    "taxes": {
        "incoming": number,
        "consuming": number,
        "balance": number
    },
    "electricity": {
        "incoming": number,
        "consuming": number,
        "balance": number,
        "notEnoughEnergyPercent": number
    },
    "food": {
        "incoming": number,
        "consuming": number,
        "balance": number
    },
    "parameters": {
        "manpower": number,
        "resourceEconomy": number
    },
    "planetResources": {
        "clay": number,
        "limestone": number,
        "iron": number,
        "coal": number,
        "boron": number,
        "nickel": number,
        "copper": number,
        "molybdenum": number,
        "vanadium": number,
        "oil": number,
        "titanium": number,
        "magnesium": number
    },
    "storage": {
        "capacity": {
            "maxCapacity": number,
            "currentFill": number,
            "storageUsagePercent": number
        },
        "resources": [],
        "materials": [],
        "metaMaterials": [],
        "components": []
    },
    "isStorageOverflow": boolean
}