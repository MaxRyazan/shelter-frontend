import {ref} from "vue";
import type {Planet} from "@/interfaces/Planet.ts";

export const isPlanetWindowOpen = ref(false);

export const currentPlanet = ref<Planet | undefined>();

export const planetsList = ref<Planet[]>([]);