import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Тип за продукта
interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    subcategory?: string;
}

// Глобален state за аутентикация
export const isAuthenticatedAtom = atom<boolean>(false);

// Глобален state за списъка с продукти (съхранява се в localStorage)
export const productsAtom = atomWithStorage<Product[]>("products", []);

// Глобален state за тема (съхранява се в localStorage)
export const darkModeAtom = atomWithStorage<boolean>("theme", false);
