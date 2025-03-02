import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Product } from "../types/product";

// Глобален state за аутентикация
export const isAuthenticatedAtom = atom<boolean>(false);

// Глобален state за списъка с продукти (съхранява се в localStorage)
export const productsAtom = atomWithStorage<Product[]>("products", []);

// Глобален state за тема (съхранява се в localStorage)
export const darkModeAtom = atomWithStorage<boolean>("theme", false);
